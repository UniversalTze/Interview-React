import { Link, useLoaderData, redirect, useNavigate } from "react-router-dom";
import React, { use, useMemo, useState } from "react";
import { getSpecificApplicants } from "../apis/applicantapi";
import { getSpecificInterview } from "../apis/interviewapi";
import { getAllQuestions, getFirstQuestion } from "../apis/questionsapi";
import { createApplicantAnswer } from "../apis/applicantansapi";

export async function loader({ params, request }) {
  let applicantarr = null;
  if (!params.applicantid || !params.interviewid || !params.questionid) {
    throw new Response("Malformed Path", { status: 400 });
  }
  applicantarr = await getSpecificApplicants(params.interviewid, params.applicantid, { signal: request.signal });
  const questionsarr = await getAllQuestions(params.interviewid, { signal: request.signal });
  const firstquestion = await getFirstQuestion(params.interviewid, { signal: request.signal });

  if (!applicantarr || !questionsarr) { 
     throw new Response("Not Found", { status: 404 });
  }
  return { applicantarr, questionsarr, firstquestion };
}

export default function TakeInterviewQuestions() {
  const data = useLoaderData();
  const navigate = useNavigate();
  const firstquestion = data.firstquestion;
  const questionCount = 0;
  const numberofQuestions = data.questionsarr.length
  // Use memo react feature to cache / memoize values that are calcuted and re-renders if numbers are changed. 
  const percent = useMemo(() => { if (numberofQuestions === 0) return 0;
    return Math.round(((questionCount + 1) / numberofQuestions) * 100);
  }, [questionCount, numberofQuestions]);
  
  const [isRecording, setIsRecording] = useState(false);  // for recording button
  const toggleRecording = () => 
     setIsRecording((record) => {
        const toggleRec = !record; 
        if (!toggleRec) {
            setRecorded(true);
        }
        return toggleRec;
    });


  // handle cliking buttons for moving to next question and recording again. 
  const [recorded, setRecorded] = useState(false);



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
                {`Question ${questionCount + 1} of ${numberofQuestions}`}
                </div>
                
                <h4 className="fw-bold mb-2 text-start">Question {questionCount + 1}</h4>

                  <div className="bg-light border rounded p-3 mb-4 text-start">
                    <p className="m-0 fs-5">{firstquestion.question}</p>
                  </div>
  
  
                 <div className="mb-4">
                <div className="fw-semibold mb-2 text-start">Audio Recording:</div>

                <div className="bg-light border rounded p-3">
                  <div className="text-start gap-3">
                    <button
                      type="button"
                      className={`btn btn-${isRecording ? "danger" : "primary"} btn-lg mb-2`}
                      onClick={toggleRecording}
                      disabled={recorded}
                    >
                      <i className={`bi ${isRecording ? "bi-stop-fill" : "bi-play-fill"} me-2`} />
                      {isRecording ? "Stop Recording" : "Start Recording"}
                    </button>

                    <div className="d-flex align-items-center gap-2 text-muted">
                      <span
                        className={`d-inline-block rounded-circle ${isRecording ? "bg-danger flash" : "bg-secondary"}`}
                        style={{ width: 10, height: 10 }}
                        aria-hidden="true"
                      />
                      <small>
                        {isRecording ? "Recording…" : "Click Start Recording to begin"}
                      </small>
                    </div>
                    <div className="d-flex align-items-center gap-2 fw-bold">
                      <small>
                       * Note: You only have one attempt to record your answer. 
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
               {/* path here needs to be changed @TODO*/}
              <button
              className="btn btn-primary btn-lg mt-4"
              onClick={() => navigate("/interview/start")}
              disabled={!recorded}
              >
              Next Question
              </button>
            
        </div>
        </div>
        </div>
      </div>
    </div>
  </div> 
  );
}