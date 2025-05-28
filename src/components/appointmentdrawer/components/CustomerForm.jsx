import React, { useState } from "react";

const CustomerForm = () => {
  // State variables for form fields
  const [formData, setFormData] = useState({
    number: "",
    name: "",
    lastname: "",
    email: "",
    gender: "",
  });

  // State variables for error messages
  const [errors, setErrors] = useState({
    number: "",
    name: "",
    lastname: "",
    email: "",
  });

  // State variables for auto-suggestions
  const [filteredNames, setFilteredNames] = useState([]);
  const [namesList] = useState([
    "John", "Jane", "Alicia", "Tom", "Harry", "Emily", "Sophia", "Michael", "Chris", "Sarah"
  ]);

  // Auto-suggestion for First Name
  const handleNameChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      name: value,
    }));

    // Filter names based on input
    if (value) {
      setFilteredNames(
        namesList.filter((name) => name.toLowerCase().includes(value.toLowerCase()))
      );
    } else {
      setFilteredNames([]);
    }
  };

  // Auto-suggestion for Mobile (if required)
  const handleMobileChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      number: value,
    }));
  };

  // Validation function
  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!formData.number || formData.number.length !== 10) {
      formErrors.number = "Mobile number must be 10 digits.";
      isValid = false;
    }

    if (!formData.name) {
      formErrors.name = "First name is required.";
      isValid = false;
    }

    if (!formData.lastname) {
      formErrors.lastname = "Last name is required.";
      isValid = false;
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  // Handle input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully", formData);
    }
  };

  return (
    <div className="bscdetwrp">
      <div className="frmlgnd">Customer Details</div>

      <form onSubmit={handleSubmit}>
        {/* Mobile Number */}
        <div className="form-group">
          <input
            type="number"
            id="number"
            placeholder=" "
            value={formData.number}
            onChange={handleMobileChange}
          />
          <label htmlFor="number" className="frmlbl">
            Mobile Number
          </label>
          {errors.number && <div className="error">{errors.number}</div>}
        </div>

        {/* First Name */}
        <div className="form-group">
          <input
            type="text"
            id="name"
            placeholder=" "
            value={formData.name}
            onChange={handleNameChange}
          />
          <label htmlFor="name" className="frmlbl">
            First Name
          </label>
          {errors.name && <div className="error">{errors.name}</div>}

          {/* Auto-suggestions for First Name */}
          {filteredNames.length > 0 && (
            <ul className="suggestions">
              {filteredNames.map((name, index) => (
                <li key={index} onClick={() => setFormData({ ...formData, name })}>
                  {name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Last Name */}
        <div className="form-group">
          <input
            type="text"
            id="lastname"
            placeholder=" "
            value={formData.lastname}
            onChange={handleChange}
          />
          <label htmlFor="lastname" className="frmlbl">
            Last Name
          </label>
          {errors.lastname && <div className="error">{errors.lastname}</div>}
        </div>

        {/* Email Address */}
        <div className="form-group">
          <input
            type="email"
            id="email"
            placeholder=" "
            value={formData.email}
            onChange={handleChange}
          />
          <label htmlFor="email" className="frmlbl">
            Email Address
          </label>
          {errors.email && <div className="error">{errors.email}</div>}
        </div>

        {/* Gender */}
        <div className="form-group radgrp">
          <label>Gender</label>
          <div className="rdbox">
            <input
              type="radio"
              id="male2"
              name="gender1"
              value="male"
              checked={formData.gender === "male"}
              onChange={handleChange}
            />
            <label htmlFor="male2">Male</label>
          </div>
          <div className="rdbox">
            <input
              type="radio"
              id="female2"
              name="gender1"
              value="female"
              checked={formData.gender === "female"}
              onChange={handleChange}
            />
            <label htmlFor="female2">Female</label>
          </div>
        </div>

        <div className="form-group">
          <button type="submit" className="submitbtn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
