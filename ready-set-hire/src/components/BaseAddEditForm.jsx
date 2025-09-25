// components/BaseForm.jsx
import React from "react";
import { Form } from "react-router-dom";

/**
 * BaseAddEditForm is a reusable form wrapper for add/edit operations.
 *
 * Renders a styled form with a title, children form fields, and submit/cancel buttons.
 * Uses React Router's `<Form>` component to handle submission via actions.
 * Displays a note about mandatory fields.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.title - The form's title displayed at the top.
 * @param {Function} props.onSubmit - Callback triggered on form submission (handled by React Router action).
 * @param {React.ReactNode} props.children - The form fields or additional content to render inside the form.
 * @param {string} [props.submitLabel="Save"] - Label for the submit button.
 * @param {Function} [props.cancel] - Optional callback to handle cancellation.
 * @returns {JSX.Element} A styled add/edit form with submit and optional cancel buttons.
 */
export function BaseAddEditForm({ title, onSubmit, children, submitLabel = "Save", cancel }) {
  return ( // change method="post" in form for non-get method so that action is run instead of loader.
    <Form method="post" className="p-3 border rounded"> 
      <h3 className="mb-3 fw-bold">{title}</h3>
      {children}
      <div className="mt-3 mb-3">
        <span className="text-start">
        <p className="fw-bold"> (*) indicates mandatory fields</p>
        </span>
     </div>
      <div className="d-flex gap-2 mt-3 justify-content-center">
        <button type="submit" className="btn btn-primary">
          {submitLabel}
        </button>
        {cancel && (
          <button type="button" className="btn btn-secondary" onClick={cancel}>
            Cancel
          </button>
        )}
      </div>
    </Form>
  );
}