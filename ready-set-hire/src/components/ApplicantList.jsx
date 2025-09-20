// ApplicantList used to represent applicants associated with a interview.

import { Link, useLoaderData } from "react-router-dom";
import { getAllApplicants } from "../apis/applicantapi"
import EmptyState from "./EmptyState";


export async function loader({ params, request }) {
  const applicants = await getAllApplicants(params.id, { signal: request.signal });
  if (!applicants) throw new Response("Not Found", { status: 404 });
  return { applicants };
}

export default function ApplicantList() {
  const { applicants } = useLoaderData();
    if (!applicants || applicants.length === 0) {
    return (
      <div className="container mt-4">
        <EmptyState
          title="No Applicants Found"
          description="You don’t have any applicants  yet. Start by adding one to this interview."
          action={
            <Link to="/new" className="btn btn-primary">   {/* change link here*/}
              Add Applicant
            </Link>
          }
          type="applicants"
        />
      </div>
    );
  }
}