import { useRouteError } from "react-router-dom";

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