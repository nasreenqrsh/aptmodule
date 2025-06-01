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

  const [newCustomer, setNewCustomer] = useState(null); // New state to store added customer
  const [showNewCustomer, setShowNewCustomer] = useState(false); // State to toggle visibility of new customer

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!formData.mobile || !/^\d{10}$/.test(formData.mobile)) {
      formErrors.mobile = "Mobile number must be 10 digits.";
      isValid = false;
    }

    if (!formData.firstName) {
      formErrors.firstName = "First name is required.";
      isValid = false;
    }

    if (!formData.lastName) {
      formErrors.lastName = "Last name is required.";
      isValid = false;
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

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

  const handleBlur = (e) => {
    const { id } = e.target;
    validateField(id); // Trigger field-level validation on blur
  };

  const validateField = (field) => {
    let formErrors = { ...errors };
    let isValid = true;

    if (field === "mobile" && (!formData.mobile || !/^\d{10}$/.test(formData.mobile))) {
      formErrors.mobile = "Mobile number must be 10 digits.";
      isValid = false;
    }

    if (field === "firstName" && !formData.firstName) {
      formErrors.firstName = "First name is required.";
      isValid = false;
    }

    if (field === "lastName" && !formData.lastName) {
      formErrors.lastName = "Last name is required.";
      isValid = false;
    }

    if (field === "email" && (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))) {
      formErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    if (field === "gender" && !formData.gender) {
      formErrors.gender = "Please select gender.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  // Create Data Handler: Submit the form data and update the state
  const createDataHandler = async (formData) => {
  try {
    // Log data before sending to check if it's correct
    console.log("Sending customer data:", formData);
    
    const response = await fetch("/CustomerHandler.ashx", { //mock API: ttps://6839de246561b8d882b1fc2e.mockapi.io/api/customer/customers
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    // Log response status and text for debugging
    console.log("Response status:", response.status);
    const data = await response.json();
    
    if (response.ok) {
      console.log("Form submitted successfully:", data);
      setNewCustomer(formData); // Save new customer data to show in UI
      onClose(); // Close the modal on successful form submission
    } else {
      console.error("Error:", data);
      alert(`Failed to create customer: ${data.message || 'Unknown error'}`);
    }
  } catch (error) {
    console.error("Error while submitting the form:", error);
    alert("An error occurred while submitting the form. Please try again later.");
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      createDataHandler(formData); // Call the createDataHandler to submit the form data
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
                  onBlur={handleBlur} // Validation on blur
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
                  onBlur={handleBlur} // Validation on blur
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
                  onBlur={handleBlur} // Validation on blur
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
                  onBlur={handleBlur} // Validation on blur
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
                <select
                  id="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  onBlur={handleBlur} // Validation on blur
                >
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
