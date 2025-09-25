// Used to represent an error if occured for easier debugging
import { useRouteError } from "react-router-dom";

/**
 * ErrorFallback component to display route-level errors for easier debugging.
 *
 * Uses React Router's `useRouteError` hook to capture errors that occur during navigation.
 * Logs the error to the console and displays a user-friendly error message.
 * Supports generic errors, JavaScript Error objects, and HTTP Response errors.
 *
 * @component
 * @returns {JSX.Element} A styled alert showing the error message.
 */
function ErrorFallback() {
  const error = useRouteError();
  console.error("Route error:", error);

  let message = "Unknown error";
  if (error instanceof Error) {
    message = error.message;
  } else if (error instanceof Response) {
    message = `HTTP ${error.status} ${error.statusText}`;
  } else {
    message = JSON.stringify(error);
  }

  return (
    <div className="alert alert-danger">
      <h4>Something went wrong</h4>
      <pre>{message}</pre>
    </div>
  );
}

export default ErrorFallback;