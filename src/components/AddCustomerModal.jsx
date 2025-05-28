import React from "react";

const AddCustomerModal = ({ onClose }) => {
  return (
    <div className="popouter" id="addcust">
      <div className="popovrly"></div>
      <div className="popin">
        <div className="popuphdr">
          Add Customer
          <span className="clsbtn" onClick={onClose}>
            <img src="/images/clsic.svg" alt="Close" />
          </span>
        </div>

        <div className="popfrm">
          <div className="frmdiv">
            <label htmlFor="mob">
              Mobile No: <span className="rd">*</span>
            </label>
            <input type="text" id="mob" />
          </div>

          <div className="frmdiv">
            <label htmlFor="mob1">
              First Name: <span className="rd">*</span>
            </label>
            <input type="text" id="mob1" />
          </div>

          <div className="frmdiv">
            <label htmlFor="mob2">
              Last Name: <span className="rd">*</span>
            </label>
            <input type="text" id="mob2" />
          </div>

          <div className="frmdiv">
            <label htmlFor="mob3">
              Email: <span className="rd">*</span>
            </label>
            <input type="text" id="mob3" />
          </div>

          <div className="frmdiv">
            <label htmlFor="gndr">
              Gender: <span className="rd">*</span>
            </label>
            <select id="gndr">
              <option value="">Select Gender</option>
              <option value="1">Male</option>
              <option value="2">Female</option>
            </select>
          </div>

          <div className="btnbar">
            <input type="submit" className="prilnk" value="Add Customer" />
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

export default AddCustomerModal;
