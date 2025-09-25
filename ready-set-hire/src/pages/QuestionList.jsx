// QuestionList used to represent questions associated with a interview.

import { Link, useLoaderData } from "react-router-dom";
import { getAllQuestions, deleteQuestion } from "../apis/questionsapi";
import EmptyState from "../components/EmptyState";
import React,{ useState } from "react";

/**
 * Loader function for QuestionList.
 *
 * Fetches all questions associated with a specific interview.
 *
 * @async
 * @param {Object} params - URL params containing interview id
 * @param {Object} request - React Router request object
 * @returns {Promise<Object>} Object containing:
 *  - questionsdata: Array of questions
 *  - interviewtitle: Title from query string
 *  - interviewid: Interview ID from params
 * @throws {Response} 404 if no questions are found
 */
export async function loader({ params, request }) {
  const questionsdata = await getAllQuestions(params.id, { signal: request.signal });
  const url = new URL(request.url);
  const interviewtitle = url.searchParams.get("title");
  const interviewid = params.id;
  if (!questionsdata) throw new Response("Not Found", { status: 404 });
  return { questionsdata, interviewtitle, interviewid };
}

/**
 * getQuestionDifficulty
 *
 * Maps a question's difficulty level to a Bootstrap badge class for styling.
 *
 * @param {string} status - "Easy", "Intermediate", or "Advanced"
 * @returns {string} Bootstrap badge class
 */
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


/**
 * QuestionList Component
 *
 * Displays a list of questions for a specific interview.
 * - Uses a table to display question text, difficulty, and action buttons.
 * - Provides buttons for editing and deleting each question.
 * - Handles empty state when no questions exist.
 *
 * @component
 * @returns {JSX.Element} The question list table or empty state
 */

export default function QuestionList() {
  const { questionsdata, interviewtitle, interviewid } = useLoaderData();

  const [questions, setQuestions] = useState(questionsdata);
  const handleDeleteQuestion = async(questionID) => {
      await deleteQuestion(questionID); // API call
      setQuestions(prev => prev.filter(i => i.id !== questionID)); // remove from state
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="container mt-4">
        <Link 
              to="/interviews"
              className="btn btn-outline-secondary btn-sm d-flex align-items-center justify-content-center mb-3"
              style={{ width: "11rem", height: "3rem"}}
              >
              <span>
              <i className="bi bi-arrow-left-square-fill me-2"></i> 
              Back To Interviews
              </span>
              </Link>
        <EmptyState
          title="No Questions Found"
          description="You don’t have any questions yet. Start by adding one to this interview." 
          action={
            <Link to={`/interviews/${interviewid}/questions/new`} className="btn btn-primary">
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
        to={`/interviews/${interviewid}/questions/new`}
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
          {questions.map((quest, index) => (
            <tr className="text-start" key={index}>
              <td>{quest.question}</td>
              <td>
                <span className={`badge ${getQuestionDifficulty(quest.difficulty)}`}>
                  {quest.difficulty}
                  </span>
                  </td>
              <td className="align-items-center justify-content-center text-center">
                 <Link 
                  to={`/interviews/${interviewid}/questions/${quest.id}/edit`}
                  className="btn btn-outline-dark btn-sm me-2"
                  >
                  <i className="bi bi-chat-left-text-fill"></i>
                </Link>
                 <button
                  type="button"
                  className="btn btn-outline-danger btn-sm me-2"
                  onClick={() => handleDeleteQuestion(quest.id)}
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