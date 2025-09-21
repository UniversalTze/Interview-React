// components/BaseForm.jsx
import React from "react";
import { Form } from "react-router-dom";

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