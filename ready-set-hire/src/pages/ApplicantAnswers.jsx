import { Link, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { getAllQuestions } from "../apis/questionsapi";
import { getSpecificInterview } from "../apis/interviewapi"
import { getApplicantAnsSpecificInterview } from "../apis/applicantansapi";
import { getSpecificApplicants } from "../apis/applicantapi";

/**
 * Loader function for ApplicantAnswer Page.
 *
 * Fetches data required to display an applicant's answers for a specific interview.
 * Retrieves:
 * - Applicant data
 * - Interview data
 * - All questions for the interview
 * - Applicant's answers
 *
 * @async
 * @param {Object} params - Loader parameters from react-router.
 * @param {Object} params.params - Route parameters containing `applicantid` and `interviewid`.
 * @param {Request} params.request - The fetch request object (used for abort signal).
 * @returns {Promise<{ applicantarr: Object[], interviewarr: Object[], questionsarr: Object[], answerarr: Object[] }>} Data for the component.
 * @throws {Response} Throws 400 if path is malformed or 404 if any data is not found.
 */
export async function loader({ params, request }) {
  let applicantarr = null;
  if (!params.applicantid || !params.interviewid) {
    throw new Response("Malformed Path", { status: 400 });
  }
  applicantarr = await getSpecificApplicants(params.interviewid, params.applicantid, { signal: request.signal });
  const interviewarr = await getSpecificInterview(params.interviewid, { signal: request.signal });
  const questionsarr = await getAllQuestions(params.interviewid, { signal: request.signal });
  const answerarr = await getApplicantAnsSpecificInterview(params.interviewid, params.applicantid, { signal: request.signal });
  if (!applicantarr || !interviewarr || !questionsarr || !answerarr) { 
     throw new Response("Not Found", { status: 404 });
  }
  return { applicantarr, interviewarr, questionsarr, answerarr };
}

/**
 * ApplicantAnswer component that displays an applicant's answers for a specific interview.
 *
 * Shows the applicant's name, the interview title, and a list of questions with the corresponding answers.
 * Provides a back button to return to the applicants list.
 *
 * @component
 * @returns {JSX.Element} A detailed view of applicant answers with questions and responses.
 */
export default function ApplicantAnswer() {
  const { applicantarr, interviewarr, questionsarr, answerarr } = useLoaderData();
  const applicant = applicantarr[0]; // get applicant obj
  const interview = interviewarr[0]; // get interview obj
  const questions = questionsarr;
  const applicantanswer = answerarr;

  return (
    <div className="container-fluid px-5 my-4">
       <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="text-start">
          <h3 className="mb-0">{applicant.firstname} {applicant.surname} Answers </h3>
          <p className="mb-0">For Interview: <span className="fw-bold">{interview.title}</span></p>
      </div>
       <Link 
            to={`/interviews/${interview.id}/applicants`}
            className="btn btn-outline-secondary btn-sm d-flex align-items-center justify-content-center"
            style={{ width: "11rem", height: "3rem"}}
            >
            <span>
            <i className="bi bi-arrow-left-square-fill me-2"></i> 
            Back To Applicants
            </span>
        </Link>
      </div> 
      {questions.map((question, idx) => (
        <div className="border rounded p-3 mb-3" key={idx}>
          <div className="border border-black mb-2 p-2 rounded bg-light border-black text-start">
            <strong>Question {idx + 1}:</strong> {question.question}
          </div>
          <div className="p-2 rounded bg-body-secondary text-black border-start text-start">
            <strong>Applicant Answer:</strong> {applicantanswer[idx].answer  || "No answer provided"}
          </div>
        </div>
      ))}
    </div>
  );
};