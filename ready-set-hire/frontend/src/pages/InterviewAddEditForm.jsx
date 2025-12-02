import { Link, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { getSpecificInterview,  updateInterview, createInterview } from "../apis/interviewapi";
import { BaseAddEditForm } from "../components/BaseAddEditForm";

/**
 * Loader function to fetch data for the InterviewAddEditForm.
 *
 * Fetches the specific interview data if an ID is provided in the route parameters.
 * Throws a 404 response if the interview is not found.
 *
 * @async
 * @param {Object} params - The route parameters, including `id`.
 * @param {Request} request - The request object from React Router.
 * @returns {Promise<Object|null>} Returns an object containing the interview data or null if no ID is provided.
 * @throws {Response} Throws a 404 Response if the interview is not found.
 */
export async function loader({ params, request }) {
  if (!params.id) throw new Response("Malformed request", { status: 400 });
  // interview id present
  const interviewarr = await getSpecificInterview(params.id,  { signal: request.signal });
  if (!interviewarr) throw new Response("Not Found", { status: 404 });
  // Information about interview
  const interview = interviewarr[0]; //index into object array
  return { interview };
}

/**
 * Action function to handle form submission for both creating and updating an interview.
 *
 * Extracts form data, constructs a payload, and calls the appropriate API function.
 * Redirects the user back to the interviews list after creation or update.
 *
 * @async
 * @param {Object} params - Route parameters, including `id` if editing.
 * @param {Request} request - The request object containing form data.
 * @returns {Promise<Response>} Redirect response to the `/interviews` route.
 */
export async function action({ request, params }) {
  const form = await request.formData(); // submitted form data
  const payload = {
    title: form.get("title"),
    job_role: form.get("jobRole"),
    description: form.get("description"),
    status: form.get("status"),
    username: "s4703754"
  };

  if (params.id) {
    payload.id = params.id; // add id for update
    await updateInterview(params.id, payload, { signal: request.signal });
    return redirect(`/interviews`);
  } else {
    const created = await createInterview(payload, { signal: request.signal });
    return redirect(`/interviews`);
  }
}

/**
 * InterviewAddEditForm Component
 *
 * Renders a form to create a new interview or edit an existing one. Uses `BaseAddEditForm`
 * as a wrapper for consistent styling and layout. The form includes fields for title, job role,
 * description, and status.
 *
 * @component
 * @returns {JSX.Element} A form layout for adding or editing interview details.
 */
export default function InterviewAddEditForm() {
  const data = useLoaderData(); // { interview } | null
  const navigate = useNavigate();
  const isEdit = Boolean(data?.interview);
  const interviewmetada = data?.interview ?? {};

  return (
    <div className="container mt-4">
      <div className="row justify-content-center mb-3">
      <div className="col-lg-8">  {/* To align them, neded to ensure that they are working in the same column spacing*/}
        <Link
          to="/interviews"
          className="btn btn-outline-secondary btn-sm d-flex align-items-center justify-content-center"
          style={{ width: "11rem", height: "3rem" }}
        >
          <i className="bi bi-arrow-left-square-fill me-2"></i>
          Back To Interviews
        </Link>
      </div>
      </div>

      <div className="d-flex justify-content-center">
        <div className="col-lg-8">
          <BaseAddEditForm  //everything bewteen this and closing tag is children
            title={isEdit ? "Edit Interview" : "Add New Interview"}
            submitLabel={isEdit ? "Update" : "Add Interview"}
            cancel={() => navigate(-1)}
          >
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                className="form-control"
                placeholder="Interview Title"
                defaultValue={interviewmetada.title ?? ""}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="jobRole" className="form-label">
                Job Role *
              </label>
              <input
                id="jobRole"
                name="jobRole"
                type="text"
                required
                className="form-control"
                placeholder="Job Role"
                defaultValue={interviewmetada.job_role ?? ""}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={5}
                className="form-control"
                placeholder="Interview Description"
                defaultValue={interviewmetada.description ?? ""}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="status" className="form-label">
                Status *
              </label>
              <select
                id="status"
                name="status"
                required
                className="form-select"
                defaultValue={interviewmetada.status ?? "DRAFT"}
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
                 <option value="Archived">Archived</option>
              </select>
            </div>
          </BaseAddEditForm>
        </div>
      </div>
    </div>
  );
}

