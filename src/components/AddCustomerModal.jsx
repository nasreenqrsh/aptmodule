import React, { useState, useEffect } from "react";

const AddCustomerModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    mobile: "",
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    nationality: "",
    nationalityLabel: "",
    nationalityStatus: "",
  });

  const [errors, setErrors] = useState({});
  const [countryOptions, setCountryOptions] = useState([]);

  // Assuming the clinic is located in Saudi Arabia
  const clinicCountryCode = "SA";

  const allCountries = {
    IN: "India",
    AE: "United Arab Emirates",
    SA: "Saudi Arabia",
    QA: "Qatar",
    KW: "Kuwait",
    OM: "Oman",
    BH: "Bahrain",
    US: "United States",
    GB: "United Kingdom",
    PK: "Pakistan",
    BD: "Bangladesh",
    NP: "Nepal",
    PH: "Philippines",
    EG: "Egypt",
    JO: "Jordan",
    IQ: "Iraq",
    IR: "Iran",
    TR: "Turkey",
  };

  useEffect(() => {
    const sortedCountries = Object.entries(allCountries).sort(([, aName], [, bName]) =>
      aName.localeCompare(bName)
    );
    setCountryOptions(sortedCountries);
    setFormData((prev) => ({
      ...prev,
      nationality: "SA",
      nationalityLabel: allCountries["SA"],
    }));
  }, []);

  useEffect(() => {
    if (clinicCountryCode === "SA") {
      const status = formData.nationality === "SA" ? "Citizen" : "Expat";
      setFormData((prev) => ({ ...prev, nationalityStatus: status }));
    } else {
      setFormData((prev) => ({ ...prev, nationalityStatus: "" }));
    }
  }, [formData.nationality]);

  const validateField = (fieldId, value) => {
    let error = "";

    switch (fieldId) {
      case "mobile":
        if (!value || !/^\d{10}$/.test(value)) {
          error = "Mobile number must be 10 digits.";
        }
        break;
      case "firstName":
        if (!value) {
          error = "First name is required.";
        }
        break;
      case "lastName":
        if (!value) {
          error = "Last name is required.";
        }
        break;
      case "email":
        if (!value || !/\S+@\S+\.\S+/.test(value)) {
          error = "Please enter a valid email address.";
        }
        break;
      case "gender":
        if (!value) {
          error = "Please select gender.";
        }
        break;
      case "nationality":
        if (!value) {
          error = "Please select nationality.";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldId]: error,
    }));
  };

  const validateForm = () => {
    const formErrors = {};
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

    if (!formData.nationality) {
      formErrors.nationality = "Please select nationality.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "nationality") {
      setFormData((prevData) => ({
        ...prevData,
        nationality: value,
        nationalityLabel: allCountries[value],
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [id]: value }));
    }
  };

  const handleBlur = (e) => {
    const { id, value } = e.target;
    validateField(id, value);
  };

  const createDataHandler = async (formData) => {
    try {
      const response = await fetch("/CustomerHandler.ashx", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Customer added:", data);
        onClose();
      } else {
        alert(`Failed to create customer: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      alert("An error occurred. Please try again later.");
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      createDataHandler(formData);
    }
  };

  return (
    <div className="popouter" id="addcust">
      <div className="popovrly"></div>
      <div className="popin">
        <div className="popuphdr">
          Add Customer
          <span className="clsbtn" onClick={onClose}>
            <img src={`${import.meta.env.BASE_URL}images/clsic.svg`} alt="Close" />
          </span>
        </div>

        <div className="popfrm">
          <form onSubmit={handleSubmit}>
            {["mobile", "firstName", "lastName", "email"].map((field) => (
              <div className="frmdiv" key={field}>
                <label htmlFor={field}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}: <span className="rd">*</span>
                </label>
                <div className="inptdiv">
                  <input
                    type="text"
                    id={field}
                    value={formData[field]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors[field] && <div className="error">{errors[field]}</div>}
                </div>
              </div>
            ))}

            <div className="frmdiv">
              <label htmlFor="gender">
                Gender: <span className="rd">*</span>
              </label>
              <div className="inptdiv">
                <select
                  id="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">Select Gender</option>
                  <option value="1">Male</option>
                  <option value="2">Female</option>
                </select>
                {errors.gender && <div className="error">{errors.gender}</div>}
              </div>
            </div>

            <div className="frmdiv">
              <label htmlFor="nationality">
                Nationality: <span className="rd">*</span>
              </label>
              <div className="inptdiv">
                <select
                  id="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">Select Nationality</option>
                  {countryOptions.map(([code, name]) => (
                    <option key={code} value={code}>
                      {name}
                    </option>
                  ))}
                </select>
                {errors.nationality && <div className="error">{errors.nationality}</div>}
              </div>
            </div>

            {clinicCountryCode === "SA" && (
              <div className="frmdiv">
                <label htmlFor="nationalityStatus">Nationality Status:</label>
                <div className="inptdiv">
                  <input
                    type="text"
                    id="nationalityStatus"
                    value={formData.nationalityStatus}
                    readOnly
                  />
                </div>
              </div>
            )}

            <div className="btnbar">
              <input type="submit" className="prilnk" value="Add Customer" />
              <input type="button" className="seclnk" value="Cancel" onClick={onClose} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCustomerModal;
