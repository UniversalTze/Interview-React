import { Link, useLoaderData, redirect, useNavigate } from "react-router-dom";
import React, { useMemo, useState, useRef, useEffect } from "react";
import { getSpecificApplicants } from "../apis/applicantapi";
import { getSpecificInterview } from "../apis/interviewapi";
import { getAllQuestions } from "../apis/questionsapi";
import { updateApplicant } from "../apis/applicantapi";
import { createApplicantAnswer } from "../apis/applicantansapi";
import { getTranscriber } from '../ai';
import { read_audio } from '@huggingface/transformers'; // Utility to decode audio Blob → Float32Array

export async function loader({ params, request }) {
  let applicantarr = null;
  if (!params.applicantid || !params.interviewid || !params.questionid) {
    throw new Response("Malformed Path", { status: 400 });
  }
  applicantarr = await getSpecificApplicants(params.interviewid, params.applicantid, { signal: request.signal });
  const questionsarr = await getAllQuestions(params.interviewid, { signal: request.signal });
  const interviewarr = await getSpecificInterview(params.interviewid,  { signal: request.signal });

  if (!applicantarr || !questionsarr || !interviewarr) { 
     throw new Response("Not Found", { status: 404 });
  }
  return { applicantarr, questionsarr, interviewarr };
}



export default function TakeInterviewQuestions() {
  const data = useLoaderData();
  const navigate = useNavigate();

  const interview = data.interviewarr[0] || {};  // error safety
  const applicant = data.applicantarr[0] || {};  // error safety
  const questions = data.questionsarr || [];
  const [index, setIndex] = useState(0);
  const question = questions[index];  
  const numberofQuestions = data.questionsarr.length

  // Use memo react feature to cache / memoize values that are calcuted and re-renders if numbers are changed. 
  const percent = useMemo(() => { if (numberofQuestions === 0) return 0;
    return Math.round(((index + 1) / numberofQuestions) * 100);
  }, [index, numberofQuestions]);

  useEffect(() => {
    // stop any stray recording
    if (mediaRecorderRef.current?.state === "recording" || mediaRecorderRef.current?.state === "paused") {
      try { mediaRecorderRef.current.stop(); } catch {}
    }
    // reset local state
    setIndex(0);
    setStatus("idle");
    chunksRef.current = [];
  }, [interview.id, applicant.id]); // when interviewid or applicant changes, reset these variables. 

  const [status, setStatus] = useState("idle");

   // References for MediaRecorder and audio chunks
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  function pauseRecording() {
  if (mediaRecorderRef.current?.state === "recording") {
    mediaRecorderRef.current.pause(); // triggers onpause
    }
  }

  function resumeRecording() {
    if (mediaRecorderRef.current?.state === "paused") {
      mediaRecorderRef.current.resume(); // triggers onresume
    }
  }

  function stopRecording() {
  if (mediaRecorderRef.current?.state === "recording" || mediaRecorderRef.current?.state === "paused") {
    mediaRecorderRef.current.stop(); // triggers onstop (final dataavailable then onstop)
    }
  }

    /** Handler for toggling recording state.
   * On start: request mic access, begin recording.
   * On stop: finalize recording, process audio blob.
   */
  async function toggleRecord() {

    // Ask user for mic access
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    chunksRef.current = [];

    // Collect audio data as it becomes available
    recorder.ondataavailable = (e) => {
      // event driven call (media data pushed into chunksRef list)
      if (e.data && e.data.size > 0) {
        chunksRef.current.push(e.data);
      }
    };

    recorder.onpause = () =>  setStatus("paused");
    recorder.onresume = () => setStatus("recording");

    // On stop (recorder): assemble blob, decode it, and transcribe
    recorder.onstop = async () => {
       try {
        setStatus("processing");
        // Give React time to commit, and the browser time to change animations
        // Since its asynchronous, let React update state and its relevant components.
        await new Promise(resolve => requestAnimationFrame(resolve));

        const blob = new Blob(chunksRef.current, { type: "audio/webm" });

        /** --- Audio Decoding Step ---
         * Whisper expects raw waveform data at 16kHz sample rate in Float32Array format.
         * `read_audio(...)` handles:
         * - Decoding via Web Audio APIs
         * - Resampling to 16000 Hz
         * - Converting to mono (if stereo)
         */
        const url = URL.createObjectURL(blob);
        const audioData = await read_audio(url, 16000);
        URL.revokeObjectURL(url);
        
        // setRecorded(true);
        // Lazy-load the Whisper Tiny model and run transcription
        const transcriber = await getTranscriber();
        const output = await transcriber(audioData, {
          language: "en", // english language
          task: "transcribe",
          temperature: 0,   // less random focused and deterministic based on audio on output
        });
        const payload = {
          interview_id: interview.id,
          question_id: question.id,
          applicant_id: applicant.id,
          answer: output.text,
          username: "s4703754"
        };
        await createApplicantAnswer(payload);
        setStatus("uploaded");

        } catch (err) {
            console.error("Transcription failed:", err);
            setStatus("idle");
        } finally {
          // Clean up mic stream and loading state
          stream.getTracks().forEach((t) => t.stop());
      }
    };
    // Start the recording
    recorder.start();
    mediaRecorderRef.current = recorder;
    setStatus("recording");
  }

  /*
  used to handle next question dynamically
  */
  async function handleNext(interviewid, applicant) {
    if (index < numberofQuestions - 1) {
      // advance
      setIndex((i) => i + 1);
      setStatus("idle");
      chunksRef.current = [];
    } else {
      // finished all questions
      const payload = { 
        "interview_id": interviewid,
        "title": applicant.title,
        "firstname": applicant.firstname,
        "surname": applicant.surname,
        "phone_number": applicant.phone_number,
        "email_address": applicant.email_address,
        "interview_status": "Completed",
        "username": "s4703754"
      }
      await updateApplicant(applicant.id, payload);
      navigate(`/interviews/${interviewid}/applicants/${applicant.id}/complete-thanks`);
    }
  }

  return (
      <div className="container my-5">
        <div className="row justify-content-center">
         <div className="col-lg-10">
          <div className="card shadow-sm border-2">
            <div className="card-body p-5">
              <div className="row align-items-center">
                <div className="col-12">
                <div className="progress mb-2" role="progressbar" aria-valuenow={percent} aria-valuemin="0" aria-valuemax="100">
                <div className="progress-bar" style={{ width: `${percent}%` }} />
              </div>
                <div className="mb-3 medium text-muted">
                {`Question ${index + 1} of ${numberofQuestions}`}
                </div>
                
                <h4 className="fw-bold mb-2 text-start">Question {index + 1}</h4>

                  <div className="bg-light border rounded p-3 mb-4 text-start">
                    <p className="m-0 fs-5">{question.question}</p>
                  </div>
  
  
                 <div className="mb-4">
                <div className="fw-semibold mb-2 text-start">Audio Recording:</div>

                <div className="bg-light border rounded p-3">
                  <div className="text-start">
                    <button onClick={status === "recording" || status === "paused" ? stopRecording : toggleRecord}
                      className={`btn btn-${status === "recording" || status === "paused" || status === "processing" ? "danger" 
                                          : status === "uploaded" ? "success" : "primary"}`}
                      disabled={status==="uploaded" || status==="processing"}>
                        {status === "recording" || status === "paused" || status === "processing" ? "Stop Recording"
                          : status === "uploaded" ? "Uploaded Recording"
                          : "Start Recording"}
                    </button>

                      <button onClick={status === "paused" ? resumeRecording : pauseRecording}
                              className="btn btn-secondary ms-2"
                              disabled={status !== "recording" && status !== "paused"}>
                        {status === "paused" ? "Resume" : "Pause"}
                      </button>

                      {status === "processing" && (
                        <span role="status" aria-live="polite" className="ms-3 d-inline-flex align-items-center gap-2 text-dark">
                          <span className="spinner-border spinner-border-sm" aria-hidden="true" />
                          <span>Processing audio…</span>
                        </span>
                      )}

                    <div className="d-flex align-items-center gap-2 text-muted">
                      <span
                        className={`d-inline-block rounded-circle ${status === "recording" ? "bg-danger flash" : "bg-secondary"}`}
                        style={{ width: 10, height: 10 }}
                        aria-hidden="true"
                      />
                      <small>
                        {status === "recording" ? "Recording…" : "Click Start Recording to begin"}
                      </small>
                    </div>
                    <div className="d-flex align-items-center gap-2 fw-bold">
                      <small>
                       * Note: You should only submit one recording. You can pause and resume the recording. 
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              <button
              className="btn btn-primary btn-lg mt-4"
              onClick={() => handleNext(interview.id, applicant)}
              disabled={status === "idle" || status === "processing" || status === "recording"}
              >
              {index + 1 === numberofQuestions ? "Finish Interview" : "Next Question"}
              </button>
            
        </div>
        </div>
        </div>
      </div>
    </div>
  </div> 
  );
}