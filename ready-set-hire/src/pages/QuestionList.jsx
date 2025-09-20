// QuestionList used to represent questions associated with a interview.

import { Link, useLoaderData } from "react-router-dom";
import { getAllQuestions } from "../apis/questionsapi"
import EmptyState from "../components/EmptyState";


export async function loader({ params, request }) {
  const questions = await getAllQuestions(params.id, { signal: request.signal });
  if (!questions) throw new Response("Not Found", { status: 404 });
  return { questions };
}

export default function QuestionList() {
  const { questions } = useLoaderData();
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
}