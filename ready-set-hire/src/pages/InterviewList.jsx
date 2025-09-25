// Interview List for interview screen

import { Link, useLoaderData } from "react-router-dom";
import React, { useState } from "react";
import { deleteInterview, getAllInterviews } from "../apis/interviewapi";
import { getAllQuestions } from "../apis/questionsapi"
import { getAllApplicants, getAllApplicantsCompleted } from "../apis/applicantapi"
import EmptyState from "../components/EmptyState";

/**
 * Loader function for InterviewList.
 *
 * Fetches all interviews and enriches each with additional metadata:
 * - Total number of questions in the interview
 * - Total number of applicants
 * - Number of applicants who have completed the interview
 *
 * @async
 * @param {Object} request - React Router request object, used for abort signal
 * @returns {Promise<Object>} Returns an object with `interviewsMetadata` array
 */
export async function loader({ request }) {
  const allinterviews = await getAllInterviews({ signal: request.signal });
  // using map as every element has a call back in map.
  const interviewsMetadata = await Promise.all(    // returns an array of unresolved promises. When resolved it is interview project with 
      allinterviews.map(async (interview) => {     // question and applicant count. 
        const questions = await getAllQuestions(interview.id, { signal: request.signal });
        const applicants = await getAllApplicants(interview.id, { signal: request.signal });
        const completedApps = await getAllApplicantsCompleted(interview.id,  { signal: request.signal });

        return { ...interview,   // returns value that goes into array, then goes to next callback
                numQ: questions.length,
                numApp: applicants.length,
                numComplete: completedApps.length
        };
      })
  );
  return { interviewsMetadata };
}

/**
 * Returns a Bootstrap badge class based on the interview status.
 *
 * @param {string} status - Status of the interview ("Draft", "Published", etc.)
 * @returns {string} Bootstrap badge class name
 */
function getStatusBadgeClass(status) {
  switch(status) {
    case "Draft":
      return "bg-warning";
    case "Published":
      return "bg-success";
    default:
      return "bg-primary";
  }
}

/**
 * Calculates the percentage of applicants who have completed the interview.
 *
 * @param {number} numApplicants - Total number of applicants
 * @param {number} numCompleted - Number of applicants who have completed
 * @returns {number} Completion percentage, capped at 100
 */
function calculatePercentage(numApplicants, numCompleted) { 
  if (!numApplicants || numApplicants === 0) return 0;
  const percent = Math.round((numCompleted / numApplicants) * 100);
  return Math.min(percent, 100); // cap at 100 just in case
}

/**
 * InterviewList Component
 *
 * Displays a list of interviews in an accordion. Each interview item shows:
 * - Title, status, job role, and description
 * - Applicant completion status with a progress bar
 * - Links to manage questions and applicants
 * - Edit and delete actions
 *
 * Uses an EmptyState component if there are no interviews.
 *
 * @component
 * @returns {JSX.Element} A list view of interviews
 */
export default function InterviewList() {
  const { interviewsMetadata } = useLoaderData();
  const [interviews, setInterviews] = useState(interviewsMetadata); // create a state to track component changes

  const handleDeleteInterview = async(interviewID) => {
    await deleteInterview(interviewID); // API call
    setInterviews(prev => prev.filter(i => i.id !== interviewID)); // remove from state array for re-render
  }

  // empty component
   if (!interviews || interviews.length === 0) {
    return (
      <div className="container mt-4">
        <EmptyState
          title="No Interviews Found"
          description="You don’t have any interviews yet. Start by adding one."
          action={
            <Link to="/interviews/new" className="btn btn-primary"> {/* change link here*/}
              Add Interviews
            </Link>
          }
          type="interview"
        />
      </div>
    );
  }   
  return (
      <div className="container-fluid px-5 my-4">
      <div className="d-flex justify-content-between align-items-center mb-2">
          <div className="text-start">
          <h2 className="mb-0">Interviews</h2>
          <p className="mb-0 text-muted">Manage your Interview Campaigns</p>
          </div>
          <Link 
              to="/interviews/new"
              className="btn btn-primary btn-sm d-flex align-items-center justify-content-center"
              style={{ width: "10rem", height: "3rem"}}
              >
              <span>
              <i className="bi bi-plus-square me-2"></i> 
              Create Interview
              </span>
              </Link>
      </div>
      <div className="accordion" id="interviewAccordion">
          {interviews.map((interview, index) => (
          <div className="accordion-item" key={interview.id}>
              <h2 className="accordion-header align-items-center" id={`heading${interview.id}`}>
              <div className="d-flex align-items-center justify-content-between w-100">
              <button
                  className="accordion-button collapsed flex-grow-1 text-start"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${interview.id}`}
                  aria-expanded="false"
                  aria-controls={`collapse${interview.id}`}
              >
                  <div className="align-items-center w-100 justify-content-start">
                  <span>{interview.title}</span>
                  <span className={`badge ${getStatusBadgeClass(interview.status)} ms-2`}>
                      {interview.status}
                      </span>
                  </div>
              </button>
              <Link 
                  to={`edit/${interview.id}`} // update this to add/edit path @TODO
                  className="btn btn-outline-dark btn-sm ms-2 me-2"
                  >
                  <i className="bi bi-chat-left-text-fill"></i>
              </Link>
              <button
                      type="button"
                      className="btn btn-outline-danger btn-sm ms-2 me-2"
                      onClick={() => handleDeleteInterview(interview.id)}
                  >
                      <i className="bi bi-trash-fill"></i>
                  </button>
                  </div>
              </h2>
              <div
              id={`collapse${interview.id}`}
              className="accordion-collapse collapse"
              aria-labelledby={`heading${interview.id}`}
              data-bs-parent="#interviewAccordion"
              >
              <div className="accordion-body text-start">
                  <h5 className="mb-3 text-muted">{interview.job_role || "No job role provided"}</h5>
                  <p className="mb-1 fw-semibold">What we're looking for:</p>
                  <p className="mb-3 text-muted">{interview.description || "No description available."}</p>
              <div className="col-12 mb-3 text-center">
                 <p className="mb-1 fw-semibold">
                Applicant Completion Status: {calculatePercentage(interview.numApp, interview.numComplete)}%
                </p>
                <div className="progress mb-5" role="progressbar" aria-valuenow={calculatePercentage(interview.numApp, interview.numComplete)} aria-valuemin="0" aria-valuemax="100">
                <div className="progress-bar text-dark" style={{ width: `${calculatePercentage(interview.numApp, interview.numComplete)}%`}} 
                >
                 </div>
              </div>
               </div>
              <div className="d-flex gap-2 justify-content-center">
              <Link
                  to={`/interviews/${interview.id}/questions?title=${encodeURIComponent(interview.title)}`}
                  className="btn btn-outline-secondary d-flex align-items-center justify-content-center"
                  style={{ width: "12rem", height: "3rem"}}
                  >
                  <span>
                      <i className="bi bi-question-square-fill me-2"></i> 
                      Questions: ({interview.numQ})
                  </span>
              </Link>
               <Link
                  to={`/interviews/${interview.id}/applicants?title=${encodeURIComponent(interview.title)}`}
                  className="btn btn-outline-secondary d-flex align-items-center justify-content-center"
                  style={{ width: "12rem", height: "3rem"}}
                  >
                  <span>
                      <i className="bi bi-people-fill me-2"></i> 
                      Applicants: ({interview.numApp})
                  </span>
               </Link>
              </div> 
              </div>
              </div>
          </div>
          ))}
      </div>
      </div>
  );
}