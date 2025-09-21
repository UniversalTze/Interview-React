// ApplicantList used to represent applicants associated with a interview.

import { Link, useLoaderData } from "react-router-dom";
import { deleteApplicant, getAllApplicants } from "../apis/applicantapi"
import { getApplicantAnswersSpecInt } from "../apis/applicantansapi"
import { getAllQuestions } from "../apis/questionsapi";
import EmptyState from "../components/EmptyState";


export async function loader({ params, request }) {
  // params.id here is the specific interview.
  const applicants = await getAllApplicants(params.id, { signal: request.signal });
  const interviewQues = await getAllQuestions(params.id,  { signal: request.signal});
    // query params
  const url = new URL(request.url);
  const interviewtitle = url.searchParams.get("title");

  if (!applicants || !interviewQues) {
    throw new Response("Not Found", { status: 404 });
  }
  const numofInterviewques = interviewQues.length
  const applicantsdata = await Promise.all(    // returns an array of unresolved promises. When resolved it is interview project with 
      applicants.map(async (applicant) => {     // question and applicant count. 
        const applicantAnsSpecInt = await getApplicantAnswersSpecInt(applicant.id, params.id, { signal: request.signal });
        const numberofApplicantsAns =  applicantAnsSpecInt.length
        const applicantstatus = determineApplicantStatus(numofInterviewques, numberofApplicantsAns);

        return { ...applicant,   // returns value that goes into array, then goes to next callback
                numQuesAnswered: numberofApplicantsAns,
                applicantStatus: applicantstatus
        };
      })
  );
  
  return { applicantsdata, interviewtitle, numofInterviewques };
}

function determineApplicantStatus(numberofQuestions, questionsAnswered) {
  if (numberofQuestions === questionsAnswered) { 
    return "Completed";
  } else if (!questionsAnswered) { 
    return "Not-Started";
  } else 
    return "In-Progress";
}

function getStatusColour(status) {
  switch(status) {
    case "Not-Started":
      return "bg-danger";
    case "Completed":
      return "bg-success";
    default:
      return "bg-warning";
  }
}

export default function ApplicantList() {
  const { applicantsdata: applicants, interviewtitle, numofInterviewques} = useLoaderData();

  if (!applicants || applicants.length === 0) {
  return (
    <div className="container mt-4">
      <EmptyState
        title="No Applicants Found"
        description="You don’t have any applicants  yet. Start by adding one to this interview."
        action={
          <Link to="/new" className="btn btn-primary">   {/* change link here*/}
            Add Applicant
          </Link>
        }
        type="applicants"
      />
    </div>
    );
  }
  return (
        <div className="container mt-4">
           <div className="mb-3">
         <Link 
        to="/interviews" // update this to add/edit path @TODO
        className="btn btn-outline-secondary btn-sm d-flex align-items-center justify-content-center"
        style={{ width: "11rem", height: "3rem"}}
        >
        <span>
        <i className="bi bi-arrow-left-square-fill me-2"></i> 
        Back To Interviews
        </span>
        </Link>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-2">
            <div className="text-start">
            <h2 className="mb-0">Applicants</h2>
            <p className="mb-0 text-muted">For Interview: {interviewtitle}</p>
            </div>
            <Link 
                to="/new-form" // update this to add/edit path @TODO
                className="btn btn-primary btn-sm d-flex align-items-center justify-content-center"
                style={{ width: "10rem", height: "3rem"}}
                >
                <span>
                <i className="bi bi-plus-square me-2"></i> 
                Add Applicant
                </span>
                </Link>
        </div>
        <div className="accordion" id="interviewAccordion">
            {applicants.map((applicant, index) => (
            <div className="accordion-item" key={applicant.id}>
                <h2 className="accordion-header align-items-center" id={`heading${applicant.id}`}>
                <div className="d-flex align-items-center justify-content-between w-100">
                <button
                    className="accordion-button collapsed flex-grow-1 text-start"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${applicant.id}`}
                    aria-expanded="false"
                    aria-controls={`collapse${applicant.id}`}
                >
                    <div className="align-items-center w-100 justify-content-start">
                    <span className="fw-bold">{applicant.firstname} {applicant.surname}</span>
                    <span className={`badge ${getStatusColour(applicant.applicantStatus)} ms-2`}>
                      {applicant.applicantStatus}
                      </span>
                    </div>
                </button>
                <Link 
                    to="/new-form" // update this to add/edit path @TODO
                    className="btn btn-outline-dark btn-sm ms-2 me-2"
                    >
                    <i className="bi bi-chat-left-text-fill"></i>
                </Link>
                <button
                        type="button"
                        className="btn btn-outline-danger btn-sm ms-2 me-2"
                        onClick={() => 
                        deleteApplicant(applicant.id)
                        }
                    >
                        <i className="bi bi-trash-fill"></i>
                    </button>
                    </div>
                </h2>
                <div
                id={`collapse${applicant.id}`}
                className="accordion-collapse collapse"
                aria-labelledby={`heading${applicant.id}`}
                data-bs-parent="#interviewAccordion"
                >
                <div className="accordion-body text-start">
                  <table className="table table-bordered table-hover">
                    <thead className="table-light text-start">
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Questions Completed</th>
                        <th>Questions Remaining</th>
                      </tr>
                    </thead>
                    <tbody>
                        <tr className="text-start" key={index}>
                          <td>{applicant.title} {applicant.firstname} {applicant.surname}</td>
                          <td>{applicant.email_address}</td>
                          <td>{applicant.phone_number}</td>
                          <td>{applicant.numQuesAnswered}</td>
                          <td>{numofInterviewques - applicant.numQuesAnswered}</td> {/*maybe instead of status have actions here and have status in the bar up there*/}
                        </tr>
                    </tbody>
                  </table>
                
                <div className="d-flex justify-content-center align-items-center gap-3">
                  <span>
                    {applicant.applicantStatus === "Completed"
                      ? "View Answers:"
                      : "Please complete your interview:"}
                  </span>
                   {/* take interview link here for Link! @TODO */}
                  <Link   
                      to={applicant.applicantStatus === "Completed" ? 
                          `/applicant_answer/${applicant.id}` 
                          : `/take-interview/${applicant.id}`}
                      className="btn btn-primary d-flex justify-content-center align-items-center"
                      style={{ width: "10rem", height: "2rem"}}
                    >
                      {applicant.applicantStatus === "Completed"  ? "View Answers" : "Take Interview"}
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