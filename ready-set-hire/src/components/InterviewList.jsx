
import { Link, useLoaderData } from "react-router-dom";
import { deleteInterview, getAllInterviews } from "../apis/interviewapi";
import { getAllQuestions } from "../apis/questionsapi"
import { getAllApplicants } from "../apis/applicantapi"

export async function loader({ request }) {
  const allinterviews = await getAllInterviews({ signal: request.signal });
  // using map as every element has a call back in map.
  const interviewsMetadata = await Promise.all(    // returns an array of unresolved promises. When resolved it is interview project with 
      allinterviews.map(async (interview) => {     // question and applicant count. 
        const questions = await getAllQuestions(interview.id, { signal: request.signal });
        const applicants = await getAllApplicants(interview.id, { signal: request.signal });

        return { ...interview,   // returns value that goes into array, then goes to next callback
                numQ: questions.length,
                numApp: applicants.length,
        };
      })
  );
  return { interviewsMetadata };
}

function getStatusBadgeClass(status) {
  switch(status) {
    case "Draft":
      return "bg-warning text-dark";
    case "Published":
      return "bg-success";
    default:
      return "bg-primary";
  }
}

export default function InterviewList() {
  const { interviewsMetadata: interviews } = useLoaderData();

  return (
    <div className="container mt-4">
      <h2 className="text-start">Interviews</h2>
      <p className="text-start">
       Manage your Interview Campaigns
      </p>

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
               <button
                     type="button"
                     className="btn btn-outline-danger btn-sm ms-1 me-2"
                    onClick={() => 
                      deleteInterview(interview.id)
                    }
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
             <div className="d-flex gap-2 justify-content-center">
              <Link
                  to="/questions"
                  className="card p-2 align-items-center text-decoration-none text-dark justify-content-center"
                  style={{ width: "12rem", height: "3rem"}}
                >
                  <span className="text-gray-800 text-muted">
                    <i className="bi bi-question-square me-2"></i> 
                    Questions: ({interview.numQ})
                  </span>
                </Link>
                <Link
                  to="/applicants"
                  className="card p-2 align-items-center text-decoration-none text-dark justify-content-center"
                  style={{ width: "12rem", height: "3rem"}}
                >
                  <span className="text-gray-800 text-muted">
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