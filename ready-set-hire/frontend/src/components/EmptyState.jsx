// For the empty state of a web component.
import QuestionIcon from "../assets/undraw_questions.svg"
import ApplicantIcon from "../assets/undraw_applicants.svg"
import InterviewIcon from "../assets/undraw_interview.svg"

/**
 * Determines which SVG icon to use based on a given type.
 *
 * @param {string} type - The type of page ('question', 'applicants', or any other for 'interview').
 * @returns {string} The path to the corresponding SVG asset.
 */
function determineSVG(type) {
    if (type == "question") { 
        return QuestionIcon
    } else if (type == "applicants") {
        return ApplicantIcon
    }
    return InterviewIcon
}

/**
 * EmptyState component to display a placeholder when a list or section has no content.
 *
 * Renders an icon based on the type, a title, optional description, and optional action.
 * Icons are chosen from predefined SVG assets for questions, applicants, or interviews.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.title - The main title text to display.
 * @param {string} [props.description] - Optional descriptive text below the title.
 * @param {React.ReactNode} [props.action] - Optional action element (e.g., button) to render.
 * @param {('question'|'applicants'|'interview')} props.type - Determines which icon to display.
 * @returns {JSX.Element} A styled empty state UI with icon, title, description, and optional action.
 */
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