import React, { useState } from "react";

const AddCustomerModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    mobile: "",
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
  });

  const [errors, setErrors] = useState({
    mobile: "",
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
  });

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    // Mobile validation: should be exactly 10 digits
    if (!formData.mobile || !/^\d{10}$/.test(formData.mobile)) {
      formErrors.mobile = "Mobile number must be 10 digits.";
      isValid = false;
    }

    // First name validation
    if (!formData.firstName) {
      formErrors.firstName = "First name is required.";
      isValid = false;
    }

    // Last name validation
    if (!formData.lastName) {
      formErrors.lastName = "Last name is required.";
      isValid = false;
    }

    // Email validation
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    // Gender validation
    if (!formData.gender) {
      formErrors.gender = "Please select gender.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully", formData);
      onClose(); // Close the modal on successful form submission
    }
  };

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
          <form onSubmit={handleSubmit}>
            {/* Mobile */}
            <div className="frmdiv">
              <label htmlFor="mobile">
                Mobile No: <span className="rd">*</span>
              </label>
              <div className="inptdiv">
                <input
                type="text"
                id="mobile"
                value={formData.mobile}
                onChange={handleChange}
              />
              {errors.mobile && <div className="error">{errors.mobile}</div>}
              </div>
              
            </div>

            {/* First Name */}
            <div className="frmdiv">
              <label htmlFor="firstName">
                First Name: <span className="rd">*</span>
              </label>
              <div className="inptdiv">
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <div className="error">{errors.firstName}</div>}
              </div>
            </div>

            {/* Last Name */}
            <div className="frmdiv">
              <label htmlFor="lastName">
                Last Name: <span className="rd">*</span>
              </label>
              <div className="inptdiv">
              <input
                type="text"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <div className="error">{errors.lastName}</div>}
              </div>
            </div>

            {/* Email */}
            <div className="frmdiv">
              <label htmlFor="email">
                Email: <span className="rd">*</span>
              </label>
              <div className="inptdiv">
              <input
                type="text"
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="error">{errors.email}</div>}
              </div>
            </div>

            {/* Gender */}
            <div className="frmdiv">
              <label htmlFor="gender">
                Gender: <span className="rd">*</span>
              </label>
              <div className="inptdiv">
              <select id="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="1">Male</option>
                <option value="2">Female</option>
              </select>
              {errors.gender && <div className="error">{errors.gender}</div>}
              </div>
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCustomerModal;
