import { Link, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { getSpecificApplicants } from "../apis/applicantapi";
import { getSpecificInterview } from "../apis/interviewapi";
import thanksIcon from "../assets/undraw_team-collaboration.svg";

export default function TakeInterview() {
  const data = useLoaderData();
  const navigate = useNavigate();
  const interview = data.interviewarr[0];
  const applicant = data.applicantarr[0];

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
       <div className="col-lg-10">
        <div className="card shadow-sm border-2">
          <div className="card-body p-5 col-12">
             {/* Right side SVG */}
          <div className="text-center">
            <img src={thanksIcon} alt="thanksIcon" className="mb-3" width={128} height={128} />
          </div>
            <div className="row align-items-center text-center">
              <h2 className="fw-bold mb-4">Thank You for Completing Your Interview</h2>
                <h5 className="fw-bold">Applicant Details:</h5>
                <p className="mb-1">{applicant.title} {applicant.firstname} {applicant.surname}</p>
                <p className="mb-1">{applicant.phone_number}</p>
                <p className="mb-0">{applicant.email_address}</p>

            <button
            className="btn btn-primary btn-lg mt-4"
            onClick={() => navigate("/interview/start")}
            >
            Start Interview
            </button>
      </div>
      </div>
      </div>
    </div>
  </div>
</div> 
);
}