import React, { useState, useEffect } from "react";

// Fetch from API
const CreateDataHandler = async () => {
  const res = await fetch("https://mocki.io/v1/fe1da8d7-3afa-4866-bb24-553db358f743");
  if (!res.ok) throw new Error("Failed to fetch");
  return await res.json();
};

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return <div className="toast">{message}</div>;
};

const CustomerForm = ({ prefillData, setCustomerData }) => {
  const [formData, setFormData] = useState({
    number: "",
    name: "",
    lastname: "",
    email: "",
    gender: "",
  });

  const [errors, setErrors] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [isPrefilled, setIsPrefilled] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [prefillActive, setPrefillActive] = useState(false); // ✅ new flag

  // ✅ Load from parent when real data is passed
  useEffect(() => {
    if (
      prefillData &&
      typeof prefillData === "object" &&
      !prefillActive &&
      (prefillData.name || prefillData.mobile || prefillData.number)
    ) {
      const data = {
        number: prefillData.number || prefillData.mobile || "",
        name: prefillData.name || "",
        lastname: prefillData.lastname || "",
        email: prefillData.email || "",
        gender: prefillData.gender || "",
      };
      setFormData(data);
      setCustomerData?.(data);
      setIsPrefilled(true);
      setPrefillActive(true); // ✅ prevent re-trigger
      setShowToast(true);
    }
  }, [prefillData, prefillActive]);

  const syncCustomerData = (updated) => {
    setFormData(updated);
    setCustomerData?.(updated);
  };

  const handleChange = async (e) => {
    const { id, value } = e.target;
    const updated = { ...formData, [id]: value };
    syncCustomerData(updated);

    if ((id === "number" && value.length >= 3) || (id === "name" && value.length >= 2)) {
      try {
        const data = await CreateDataHandler();
        const matches = data.filter((item) =>
          id === "number"
            ? item.mobile.startsWith(value)
            : item.name.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(matches);
      } catch (err) {
        console.error("Suggestion fetch failed:", err);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionSelect = (item) => {
    const selected = {
      number: item.mobile || "",
      name: item.name || "",
      lastname: item.lastname || "",
      email: item.email || "",
      gender: item.gender || "",
    };
    setFormData(selected);
    setCustomerData?.(selected);
    setIsPrefilled(true);
    setPrefillActive(true);
    setSuggestions([]);
    setShowToast(true);
  };

  const handleBlur = (e) => validateField(e.target.id);

  const validateField = (field) => {
    let newErrors = { ...errors };
    let isValid = true;

    switch (field) {
      case "number":
        if (!formData.number || formData.number.length !== 10) {
          newErrors.number = "Mobile number must be 10 digits.";
          isValid = false;
        } else delete newErrors.number;
        break;
      case "name":
        if (!formData.name) {
          newErrors.name = "First name is required.";
          isValid = false;
        } else delete newErrors.name;
        break;
      case "lastname":
        if (!formData.lastname) {
          newErrors.lastname = "Last name is required.";
          isValid = false;
        } else delete newErrors.lastname;
        break;
      case "email":
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = "Valid email required.";
          isValid = false;
        } else delete newErrors.email;
        break;
      case "gender":
        if (!formData.gender) {
          newErrors.gender = "Please select gender.";
          isValid = false;
        } else delete newErrors.gender;
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <>
      {showToast && <Toast message="Customer loaded successfully" onClose={() => setShowToast(false)} />}

      <div className="bscdetwrp">
        <div className="frmlgnd">Customer Details</div>
        <form autoComplete="off">
          {/* Mobile Number */}
          <div className="form-group" style={{ position: "relative" }}>
            <input
              type="text"
              id="number"
              placeholder=" "
              value={formData.number}
              onChange={handleChange}
              onBlur={handleBlur}
              readOnly={isPrefilled}
            />
            <label htmlFor="number" className="frmlbl">Mobile Number</label>
            {errors.number && <div className="error">{errors.number}</div>}
          </div>

          {/* First Name */}
          <div className="form-group" style={{ position: "relative" }}>
            <input
              type="text"
              id="name"
              placeholder=" "
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              readOnly={isPrefilled}
            />
            <label htmlFor="name" className="frmlbl">First Name</label>
            {errors.name && <div className="error">{errors.name}</div>}
            {suggestions.length > 0 && (
              <ul className="suggestions">
                {suggestions.map((item, index) => (
                  <li key={index} onClick={() => handleSuggestionSelect(item)} style={{ cursor: "pointer" }}>
                    {item.name} – {item.mobile}
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
              readOnly={isPrefilled}
            />
            <label htmlFor="lastname" className="frmlbl">Last Name</label>
            {errors.lastname && <div className="error">{errors.lastname}</div>}
          </div>

          {/* Email */}
          <div className="form-group">
            <input
              type="email"
              id="email"
              placeholder=" "
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              readOnly={isPrefilled}
            />
            <label htmlFor="email" className="frmlbl">Email Address</label>
            {errors.email && <div className="error">{errors.email}</div>}
          </div>

          {/* Gender */}
          <div className="form-group radgrp">
            <label className="frmlbl">Gender</label>
            <div className="rdbox">
              <input
                type="radio"
                id="gender_male"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={(e) =>
                  syncCustomerData({ ...formData, gender: e.target.value })
                }
                disabled={isPrefilled}
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
                  syncCustomerData({ ...formData, gender: e.target.value })
                }
                disabled={isPrefilled}
              />
              <label htmlFor="gender_female">Female</label>
            </div>
            {errors.gender && <div className="error">{errors.gender}</div>}
          </div>

          {/* Optional "Edit" button */}
          {isPrefilled && (
            <button
              type="button"
              onClick={() => {
                setIsPrefilled(false);
                setPrefillActive(false);
              }}
              className="edit-btn editbtn"
            >
              Edit Customer
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default CustomerForm;
