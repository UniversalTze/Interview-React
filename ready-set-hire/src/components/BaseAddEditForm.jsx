// components/BaseForm.jsx
import React from "react";
import { Form } from "react-router-dom";

export function BaseAddEditForm({ title, onSubmit, children, submitLabel = "Save", cancel }) {
  return (
    <Form className="p-3 border rounded">
      <h3 className="mb-3 fw-bold">{title}</h3>
      {children}

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