// For the empty state of a web component.
import QuestionIcon from "../assets/undraw_questions.svg"
import ApplicantIcon from "../assets/undraw_applicants.svg"
import InterviewIcon from "../assets/undraw_interview.svg"


function determineSVG(type) {
    if (type == "question") { 
        return QuestionIcon
    } else if (type == "applicants") {
        return ApplicantIcon
    }
    return InterviewIcon
}


export default function EmptyState({ title, description, action, type }) {
  const Iconsrc = determineSVG(type);
    
  return (
  <div className="d-flex flex-column align-items-center justify-content-center text-center p-4 border rounded bg-light">
    {/* applying conditions so its not rendered if null*/}
    {Iconsrc && (<img src={Iconsrc} alt={type} className="mb-3" width={128} height={128} />)}
    <h4 className="mb-3">{title}</h4>
    {description && <p className="text-muted">{description}</p>}
    {action && <div className="mt-3">{action}</div>}
  </div>
  );
}