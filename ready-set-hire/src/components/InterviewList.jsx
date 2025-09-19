
import { Link, useLoaderData } from "react-router-dom";
import { getAllInterviews } from "../apis/interviewapi";

export async function loader({ request }) {
  const posts = await getAllInterviews({ signal: request.signal });
  return { posts };
}

function getStatusBadgeClass(status) {
  switch(status) {
    case "Draft":
      return "bg-warning text-dark";
    case "Published":
      return "bg-success";
    default:
      return "bg-primary";
  }
}

export default function InterviewList() {
  const { posts } = useLoaderData();

  return (
    <div className="container mt-4">
      <h2 className="text-start">Interviews</h2>
      <p className="text-start">
       Manage your Interview Campaigns
      </p>

      <div className="accordion" id="interviewAccordion">
        {posts.map((post, index) => (
          <div className="accordion-item" key={post.id}>
            <h2 className="accordion-header align-items-center" id={`heading${post.id}`}>
              <button
                className="accordion-button collapsed flex-grow-1 text-start"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${post.id}`}
                aria-expanded="false"
                aria-controls={`collapse${post.id}`}
              >
                <div className="align-items-center w-100 ">
                  <span>{post.title}</span>
                  <span className={`badge ${getStatusBadgeClass(post.status)} ms-2`}>
                  {post.status}
                  </span>
                </div>
              </button>
            </h2>
            <div
              id={`collapse${post.id}`}
              className="accordion-collapse collapse"
              aria-labelledby={`heading${post.id}`}
              data-bs-parent="#interviewAccordion"
            >
              <div className="accordion-body">
                <p>{post.description || "No description available."}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}