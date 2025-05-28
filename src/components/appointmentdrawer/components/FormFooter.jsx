// src/components/FormFooter.jsx
import React from "react";

const FormFooter = ({ onCancel }) => {
  return (
    <div className="apptbtnbar">
      <button className="editbtn savebn">Save</button>
      <button className="restbtn" onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default FormFooter;
