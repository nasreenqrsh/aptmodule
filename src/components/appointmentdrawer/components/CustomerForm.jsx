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

  // Handle input change for other fields
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Validation function for form fields
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

  // Handle blur for field validation
  const handleBlur = (e) => {
    const { id } = e.target;
    validateField(id);
  };

  // Validate individual fields
  const validateField = (field) => {
    let formErrors = { ...errors };
    let isValid = true;

    switch (field) {
      case "number":
        if (!formData.number || formData.number.length !== 10) {
          formErrors.number = "Mobile number must be 10 digits.";
          isValid = false;
        } else {
          formErrors.number = "";
        }
        break;

      case "name":
        if (!formData.name) {
          formErrors.name = "First name is required.";
          isValid = false;
        } else {
          formErrors.name = "";
        }
        break;

      case "lastname":
        if (!formData.lastname) {
          formErrors.lastname = "Last name is required.";
          isValid = false;
        } else {
          formErrors.lastname = "";
        }
        break;

      case "email":
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
          formErrors.email = "Please enter a valid email address.";
          isValid = false;
        } else {
          formErrors.email = "";
        }
        break;

      default:
        break;
    }

    setErrors(formErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully", formData);
    }
  };

  // Handle click on auto-suggested name
  const handleNameSelect = (name) => {
    setFormData((prevData) => ({
      ...prevData,
      name,
    }));
    setFilteredNames([]); // Hide suggestions once a name is selected
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
            onChange={handleChange}
            onBlur={handleBlur}
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
            onBlur={handleBlur}
          />
          <label htmlFor="name" className="frmlbl">
            First Name
          </label>
          {errors.name && <div className="error">{errors.name}</div>}

          {/* Auto-suggestions for First Name */}
          {filteredNames.length > 0 && (
            <ul className="suggestions">
              {filteredNames.map((name, index) => (
                <li
                  key={index}
                  onClick={() => handleNameSelect(name)}
                  className="suggestion-item"
                >
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
            onBlur={handleBlur}
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
            onBlur={handleBlur}
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
      id="gender_male"
      name="gender"
      value="male"
      checked={formData.gender === "male"}
      onChange={(e) =>
        setFormData((prevData) => ({
          ...prevData,
          gender: e.target.value,
        }))
      }
    />
    <label htmlFor="gender_male">Male</label>
  </div>
  <div className="rdbox">
    <input
      type="radio"
      id="gender_female"
      name="gender"
      value="female"
      checked={formData.gender === "female"}
      onChange={(e) =>
        setFormData((prevData) => ({
          ...prevData,
          gender: e.target.value,
        }))
      }
    />
    <label htmlFor="gender_female">Female</label>
  </div>
        </div>

        
      </form>
    </div>
  );
};

export default CustomerForm;
