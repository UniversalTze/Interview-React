import { Link, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { getSpecificApplicants } from "../apis/applicantapi";
import { getSpecificInterview } from "../apis/interviewapi";
import thanksIcon from "../assets/undraw_team-collaboration.svg";


export async function loader({ params, request }) {
  let applicantarr = null;
  if (!params.applicantid || !params.interviewid) {
    throw new Response("Malformed Path", { status: 400 });
  }
  applicantarr = await getSpecificApplicants(params.interviewid, params.applicantid, { signal: request.signal });
  const interviewarr = await getSpecificInterview(params.interviewid, { signal: request.signal });
  if (!applicantarr || !interviewarr) { 
     throw new Response("Not Found", { status: 404 });
  }
  return { applicantarr, interviewarr};
}

export default function TakeInterview() {
  const data = useLoaderData();
  const navigate = useNavigate();
  // const interview = data.interviewarr[0];
  const applicant = data.applicantarr[0];
  const interview = data.interviewarr[0];

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
            <div className="row align-items-center text-center justify-content-center">
              <h2 className="fw-bold mb-4">Thank you for Completing Your Interview</h2>
               <div className="row align-items-center text-center">
                    <p className="mb-1">Your responses have been successfully recorded.</p>
                    <p className="mb-1">Our team will reach out to you regarding the status of your application.</p>
                    <p className="mb-4">You may navigate back to the home page or review your answers.</p>
                </div>
                  <div className="col-lg-6 mb-2">
                     <div className="card shadow-sm border-2 bg-light">
                        <div className="card-body p-3">
                            <div className="row align-items-center">
                                <div className="col-12">
                                    <div className="rounded p-3 text-center">
                                        <p className="m-0"> <strong>Interview:</strong> {interview.title} </p>
                                        <p className="m-0"> <strong>Position:</strong> {interview.job_role} </p>
                                        <p className="m-0"><strong>Interview Completed For:</strong> {applicant.title} {applicant.firstname} {applicant.surname}</p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <div className="row align-items-center text-center justify-content-center">
                <div className="col-auto">
                    <button
                        className="btn btn-primary btn-lg mt-4"
                        onClick={() => navigate("/home")}
                        style={{ width: "200px", height: "50px" }}
                    >
                     <i className="bi bi-house-door-fill me-2"></i>
                    Home
                    </button>
                </div>
                <div className="col-auto">
                    <button
                        className="btn btn-primary btn-lg mt-4"
                        style={{ width: "200px", height: "50px" }}
                        onClick={() => navigate("/interview/start")}
                    >
                        {/* This path needs to be fixed (last screen) @TODO*/}
                    <i className="bi bi-briefcase-fill me-2"></i>
                    Answers
                    </button>
                </div>
        </div>
      </div>
      </div>
      </div>
    </div>
  </div>
</div> 
);
}