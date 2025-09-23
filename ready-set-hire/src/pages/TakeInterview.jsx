import { Link, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { getSpecificApplicants } from "../apis/applicantapi";
import { getSpecificInterview } from "../apis/interviewapi";
import { getFirstQuestion } from "../apis/questionsapi";
import interviewIcon from "../assets/undraw_remote-worker.svg";

export async function loader({ params, request }) {
  let applicantarr = null;
  if (!params.applicantid || !params.interviewid) {
    throw new Response("Malformed Path", { status: 400 });
  }
  applicantarr = await getSpecificApplicants(params.interviewid, params.applicantid, { signal: request.signal });
  const interviewarr = await getSpecificInterview(params.interviewid, { signal: request.signal });
  const startques = await getFirstQuestion(params.interviewid, { signal: request.signal });
  if (!applicantarr || !interviewarr) { 
     throw new Response("Not Found", { status: 404 });
  }
  return { applicantarr, interviewarr, startques };
}

export default function TakeInterview() {
  const data = useLoaderData();
  const navigate = useNavigate();
  const interview = data.interviewarr[0];
  const applicant = data.applicantarr[0];
  const question = data.startques;

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
       <div className="col-lg-10">
        <div className="mb-3">
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
        <div className="card shadow-sm border-2">
          <div className="card-body p-5">
            <div className="row align-items-center">
              <div className="col-md-7">
              <h2 className="fw-bold mb-4 text-start">Welcome to Your Interview</h2>


                <div className="mb-4 text-start">
                <h5 className="fw-bold">Applicant Details:</h5>
                <p className="mb-1">{applicant.title} {applicant.firstname} {applicant.surname}</p>
                <p className="mb-1">{applicant.phone_number}</p>
                <p className="mb-0">{applicant.email_address}</p>
                </div>

              <div className="mb-4 text-start">
              <h5 className="fw-bold">Interview:</h5>
              <p className="mb-1">{interview.title}</p>
              <p className="mb-0">Interview for {interview.job_role}</p>
              </div>

            <button
            className="btn btn-primary btn-lg mt-4"
            onClick={() => navigate(`/interviews/${interview.id}/applicants/${applicant.id}/take-interview/question/${question.id}`)}
            >
            Start Interview
            </button>
            </div>


          {/* Right side SVG */}
          <div className="col-md-5 text-center">
            <img src={interviewIcon} alt="interviewIcon" className="mb-3" width={128} height={128} />
        </div>
      </div>
      </div>
      </div>
    </div>
  </div>
</div> 
);
}