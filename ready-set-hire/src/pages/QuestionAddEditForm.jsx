import { Link, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { createQuestion, getSpecificQuestion, updateQuestion } from "../apis/questionsapi";
import { getSpecificInterview } from "../apis/interviewapi"
import { BaseAddEditForm } from "../components/BaseAddEditForm";

export async function loader({ params, request }) {
  let questionarr = null;
  if (params.questionid) {
    questionarr = await getSpecificQuestion(params.interviewid, params.questionid, { signal: request.signal });
    if (!questionarr) throw new Response("Not Found", { status: 404 });

  }
  const interview = await getSpecificInterview(params.interviewid, { signal: request.signal });
  return { questionarr, interview };
}

// One action for both /new and /edit/:id
export async function action({ request, params }) {
  const form = await request.formData(); // submitted form data
  const payload = {
    interview_id: params.interviewid,
    question: form.get("question"),
    difficulty: form.get("difficulty"),
    username: "s4703754"
  };

  if (params.questionid) {
    payload.id = params.questionid;
    await updateQuestion(params.questionid, payload, { signal: request.signal });
    return redirect(`/interviews/${params.interviewid}/questions`);
  } else {
    console.log(payload);
    const created = await createQuestion(payload, { signal: request.signal });
    return redirect(`/interviews/${params.interviewid}/questions`);
  }
}

export default function QuestionAddEditForm() {
  const data = useLoaderData(); // { interview }
  const navigate = useNavigate();
  const isEdit = Boolean(data?.questionarr);
  let questiondata = {};
  if (isEdit) { 
    questiondata = data?.questionarr[0];
  }
  const interviewdata = data?.interview[0];

  return (
    <div className="container mt-4">
      <div className="row justify-content-center mb-3">
      <div className="col-lg-8">  {/* To align them, neded to ensure that they are working in the same column spacing*/}
        <Link
          to={`/interviews/${interviewdata.id}/questions`}
          className="btn btn-outline-secondary btn-sm d-flex align-items-center justify-content-center"
          style={{ width: "11rem", height: "3rem" }}
        >
          <i className="bi bi-arrow-left-square-fill me-2"></i>
          Back To Questions
        </Link>
      </div>
      </div>
      <div className="d-flex justify-content-center">
        <div className="col-lg-8">
          <BaseAddEditForm  //everything bewteen this and closing tag is children
            title={isEdit ? "Edit Question" : "Add New Question"}
            submitLabel={isEdit ? "Update" : "Add Question"}
            cancel={() => navigate(-1)}
          >
             <div className="mt-3 mb-3">
              <span className="text-start">
              <span>For Interview: <p className="fw-bold"> {interviewdata.title}</p></span>
              </span>
          </div>
            <div className="mb-3">
              <label htmlFor="question" className="form-label">
                Question *
              </label>  {/* try text area instead of input*/}
              <textarea
                id="question"
                name="question"
                type="text"
                rows={3}
                required
                className="form-control"
                placeholder="Question to be asked"
                defaultValue={questiondata?.question ?? ""}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="difficulty" className="form-label">
                Difficulty *
              </label>
              <select
                id="difficulty"
                name="difficulty"
                required
                className="form-select"
                defaultValue={questiondata?.difficulty ?? "Easy"}
              >
                <option value="Easy">Easy</option>
                <option value="Intermediate">Intermediate</option>
                 <option value="Advanced">Advanced</option>
              </select>
            </div>
          </BaseAddEditForm>
        </div>
      </div>
    </div>
  );
}
