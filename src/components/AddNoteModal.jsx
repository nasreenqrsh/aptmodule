import React from "react";

const AddNoteModal = ({ onClose, onSubmit }) => {
  return (
    <div className="popouter" id="addnote">
      <div className="popovrly"></div>
      <div className="popin">
        <div className="popuphdr">
          Add Note
          <span className="clsbtn" onClick={onClose}>
            <img src="/images/clsic.svg" alt="Close" />
          </span>
        </div>

        <div className="popfrm">
          <div className="frmdiv">
            <label htmlFor="note">
              Add Note: <span className="rd">*</span>
            </label>
            <textarea id="note" rows="4" cols="30" />
          </div>

          <div className="btnbar">
            <input
              type="submit"
              className="prilnk"
              value="Add Note"
              onClick={onSubmit}
            />
            <input
              type="button"
              className="seclnk"
              value="Cancel"
              onClick={onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNoteModal;
