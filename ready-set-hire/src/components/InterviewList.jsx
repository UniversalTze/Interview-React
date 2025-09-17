
import { Link, useLoaderData } from "react-router-dom";
import { getAllInterviews } from "../apis/interviewapi";

export async function loader({ request }) {
  const posts = await getAllInterviews({ signal: request.signal });
  return { posts };
}

export default function InterviewList() {
  const { posts } = useLoaderData();

  return (
    <div className="container mt-4">
    <h2>ReadySetHire</h2>
      <p>You're at the home page of an AI-powered Interview application built with React and Bootstrap.</p>
      <div className="row">
      </div>
    </div>
  );
}