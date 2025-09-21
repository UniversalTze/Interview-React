// QuestionList used to represent questions associated with a interview.

import { Link, useLoaderData } from "react-router-dom";
import { getAllQuestions, deleteQuestion } from "../apis/questionsapi";
import { getSpecificInterview } from "../apis/interviewapi";
import EmptyState from "../components/EmptyState";


export async function loader({ params, request }) {
  const questions = await getAllQuestions(params.id, { signal: request.signal });
  const url = new URL(request.url);
  const interviewtitle = url.searchParams.get("title");
  if (!questions) throw new Response("Not Found", { status: 404 });
  return { questions, interviewtitle };
}

function getQuestionDifficulty(status) {
  switch(status) {
    case "Easy":
      return "bg-success";
    case "Intermediate":
      return "bg-warning";
    default:
      return "bg-danger";
  }
}

export default function QuestionList() {
  const { questions, interviewtitle } = useLoaderData();
  if (!questions || questions.length === 0) {
    return (
      <div className="container mt-4">
        <EmptyState
          title="No Questions Found"
          description="You don’t have any questions yet. Start by adding one to this interview." 
          action={
            <Link to="/new" className="btn btn-primary">  {/* change link here*/}
              Add Question
            </Link>
          }
          type="question"
        />
      </div>
    );
  }
  return (
    <div className="container-fluid px-5 my-4">
       <div className="mb-3">
         <Link 
        to="/interviews"
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
          <h2 className="mb-0">Questions</h2>
          <p className="mb-0">For Interview: <span className="fw-bold">{interviewtitle}</span></p>
      </div>
       <Link 
        to="/new-form" // update this to add/edit path @TODO
        className="btn btn-primary btn-sm d-flex align-items-center justify-content-center"
        style={{ width: "11rem", height: "3rem"}}
        >
        <span>
        <i className="bi bi-plus-square me-2"></i> 
        Create Question
        </span>
        </Link>
      </div> 

      <table className="table table-bordered table-hover">
        <thead className="table-light text-start">
          <tr>
            <th>Question</th>
            <th>Difficulty</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q, index) => (
            <tr className="text-start" key={index}>
              <td>{q.question}</td>
              <td>
                <span className={`badge ${getQuestionDifficulty(q.difficulty)}`}>
                  {q.difficulty}
                  </span>
                  </td>
              <td className="align-items-center justify-content-center text-center">
                 <Link 
                  to="/new-form" // update this to add/edit path @TODO
                  className="btn btn-outline-dark btn-sm me-2"
                  >
                  <i className="bi bi-chat-left-text-fill"></i>
                </Link>
                 <button
                  type="button"
                  className="btn btn-outline-danger btn-sm me-2"
                  onClick={() => 
                  deleteQuestion(q.id)
                  }
              >
                  <i className="bi bi-trash-fill"></i>
              </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};