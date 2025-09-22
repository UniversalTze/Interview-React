import { Link, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { createApplicant, getSpecificApplicants, updateApplicant } from "../apis/applicantapi";
import { getSpecificInterview } from "../apis/interviewapi"
import { BaseAddEditForm } from "../components/BaseAddEditForm";

export async function loader({ params, request }) {
  let applicantarr = null;
  if (params.applicantid) {
    applicantarr = await getSpecificApplicants(params.interviewid, params.applicantid, { signal: request.signal });
    if (!applicantarr) throw new Response("Not Found", { status: 404 });

  }
  const interview = await getSpecificInterview(params.interviewid, { signal: request.signal });
  return { applicantarr, interview };
}

// One action for both /new and /edit/:id
export async function action({ request, params }) {
  const form = await request.formData(); // submitted form data
  const payload = {
    interview_id: params.interviewid,
    title: form.get("title"),
    firstname: form.get("firstname"),
    surname: form.get("surname"),
    phone_number: form.get("phone_number"),
    email_address: form.get("email_address"),
    interview_status: "Not Started",
    username: "s4703754"

  };

  if (params.applicantid) {
    payload.id = params.applicantid;
    await updateApplicant(params.applicantid, payload, { signal: request.signal });
    return redirect(`/interviews/${params.interviewid}/applicants`);
  } else {
    const created = await createApplicant(payload, { signal: request.signal });
    return redirect(`/interviews/${params.interviewid}/applicants`);
  }
}

export default function ApplicantAddEditForm() {
  const data = useLoaderData(); // { interview }
  const navigate = useNavigate();
  const isEdit = Boolean(data?.applicantarr);
  let applicantdata = {};
  if (isEdit) { 
    applicantdata = data?.applicantarr[0];
  }
  const interviewdata = data?.interview[0];

  return (
    <div className="container mt-4">
      <div className="row justify-content-center mb-3">
      <div className="col-lg-8">  {/* To align them, neded to ensure that they are working in the same column spacing*/}
        <Link
          to={`/interviews/${interviewdata.id}/applicants`}
          className="btn btn-outline-secondary btn-sm d-flex align-items-center justify-content-center"
          style={{ width: "11rem", height: "3rem" }}
        >
          <i className="bi bi-arrow-left-square-fill me-2"></i>
          Back To Applicants
        </Link>
      </div>
      </div>
      <div className="d-flex justify-content-center">
        <div className="col-lg-8">
          <BaseAddEditForm  //everything bewteen this and closing tag is children
            title={isEdit ? "Edit Applicant" : "Add New Applicant"}
            submitLabel={isEdit ? "Update" : "Add Applicant"}
            cancel={() => navigate(-1)}
          >
             <div className="mt-3 mb-1 text-start">
              For Interview:<br />
              <h5 className="fw-bold"> {interviewdata.title}</h5>
          </div>
           <div className="mb-4 text-start">
              <label htmlFor="title" className="form-label">
                Title *
              </label>
              <input
                id="title"
                name="title"
                type="title"
                required
                className="form-control"
                placeholder="One of Mr Ms Mrs Dr ...."
                defaultValue={applicantdata?.title ?? ""}
              />
            </div>
             <div className="mb-1 text-start">
              <h5 className="mt-2 fw-bold">
                Applicant Name
              </h5>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3 text-start">
                <label htmlFor="firstname" className="form-label">
                  Firstname *
                </label>
                <input
                  id="firstname"
                  name="firstname"
                  type="text"
                  required
                  className="form-control"
                  placeholder="Firstname"
                  defaultValue={applicantdata?.firstname ?? ""}
                />
              </div>
              <div className="col-md-6 mb-3 text-start">
                <label htmlFor="surname" className="form-label">
                  Surname *
                </label>
                <input
                  id="surname"
                  name="surname"
                  type="text"
                  required
                  className="form-control"
                  placeholder="Surname"
                  defaultValue={applicantdata?.surname ?? ""}
                />
              </div>
            </div>

            <div className="mt-2 text-start">
              <h5 className="fw-bold">
                Additional Information
              </h5>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3 text-start">
                <label htmlFor="phone_number" className="form-label">
                  Phone number *
                </label>
                <input
                  id="phone_number"
                  name="phone_number"
                  type="tel"
                  required
                  className="form-control"
                  placeholder="Phone number"
                  defaultValue={applicantdata?.phone_number ?? ""}
                />
              </div>
              <div className="col-md-6 mb-3 text-start">
                <label htmlFor="email_address" className="form-label">
                  Email Address *
                </label>
                <input
                  id="email_address"
                  name="email_address"
                  type="email"
                  required
                  className="form-control"
                  placeholder="Email Address"
                  defaultValue={applicantdata?.email_address ?? ""}
                />
              </div>
            </div>
          </BaseAddEditForm>
          </div>
      </div>
    </div>
  );
}
