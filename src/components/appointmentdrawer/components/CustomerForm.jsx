import React, { useState, useEffect } from "react";

const CreateDataHandler = async (query) => {
  const res = await fetch(`/GetCustomerHandler.ashx?firstname=${encodeURIComponent(query)}`); //https://mocki.io/v1/fe1da8d7-3afa-4866-bb24-553db358f743
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

const CustomerForm = ({ prefillData, setCustomerData, setLoading, customerFormData, setCustomerFormData }) => {
  const [formData, setFormData] = useState({
    custid:"",
    number: "",
    firstname: "",
    lastname: "",
    email: "",
    gender: "",
  });

  const [errors, setErrors] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [isPrefilled, setIsPrefilled] = useState(false);
  const [prefillActive, setPrefillActive] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

 useEffect(() => {
  if (
    prefillData &&
    typeof prefillData === "object" &&
    !prefillActive &&
    (prefillData.firstname || prefillData.mobile || prefillData.number)
  ) {
    const data = {
      number: prefillData.number || prefillData.mobile || "",
      firstname: prefillData.firstname || "",
      lastname: prefillData.lastname || "",
      email: prefillData.email || "",
      gender: prefillData.gender || "",
      custid: prefillData.custid || ""
    };
    syncCustomerData(data); // ✅ Use sync here to reflect gender properly
    setIsPrefilled(true);
    setPrefillActive(true);
  }
}, [prefillData, prefillActive]);


  const syncCustomerData = (updated) => {
    setFormData(updated);
    setCustomerData?.(updated);
    setCustomerFormData?.(updated);
  };

  const handleChange = async (e) => {
    const { id, value } = e.target;
    const updated = { ...formData, [id]: value };
    syncCustomerData(updated);

    if ((id === "number" && value.length >= 3) || (id === "firstname" && value.length >= 2)) {
      try {
        setIsFetching(true);
        setLoading?.(true);
        const data = await CreateDataHandler(value);
        const matches = data.filter((item) =>
          id === "number"
            ? item.mobile.startsWith(value)
            : item.firstname.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(matches);
      } catch (err) {
        console.error("Suggestion fetch failed:", err);
        setSuggestions([]);
      } finally {
        setIsFetching(false);
        setLoading?.(false);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionSelect = (item) => {
    const selected = {
      number: item.mobile || "",
      firstname: item.firstname || "",
      lastname: item.lastname || "",
      email: item.email || "",
      gender: item.gender || "",
      custid: item.custid || item.id || ""
    };
    setFormData(selected);
    setCustomerData?.(selected);
    setCustomerFormData?.(selected);
    setIsPrefilled(true);
    setPrefillActive(true);
    setSuggestions([]);
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
      case "firstname":
        if (!formData.firstname) {
          newErrors.firstname = "First name is required.";
          isValid = false;
        } else delete newErrors.firstname;
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
      <div className="bscdetwrp">
        <div className="frmlgnd">Customer Details</div>
        <form autoComplete="off">
          {/* Mobile Number */}
          <input type="hidden" id="custid" value={formData.custid} />
          <div className="form-group" style={{ position: "relative" }}>
            <input
              type="text"
              id="number"
              placeholder=" "
              value={formData.number}
              onChange={handleChange}
              onBlur={handleBlur}
              readOnly={isPrefilled && prefillActive}
            />
            <label htmlFor="number" className="frmlbl">Mobile Number</label>
            {errors.number && <div className="error">{errors.number}</div>}

            {isFetching && (
              <img
                src={`${import.meta.env.BASE_URL}images/loader.svg`}
                alt="Loading"
                style={{ position: "absolute", right: 10, top: 10, width: 20 }}
              />
            )}

            {suggestions.length > 0 && (
              <ul className="suggestions">
                {suggestions.map((item, index) => (
                  <li key={index} onClick={() => handleSuggestionSelect(item)} style={{ cursor: "pointer" }}>
                    {item.firstname} – {item.mobile}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* First Name */}
          <div className="form-group" style={{ position: "relative" }}>
            <input
              type="text"
              id="firstname"
              placeholder=" "
              value={formData.firstname}
              onChange={handleChange}
              onBlur={handleBlur}
              readOnly={isPrefilled && prefillActive}
            />
            <label htmlFor="firstname" className="frmlbl">First Name</label>
            {errors.firstname && <div className="error">{errors.firstname}</div>}
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
              readOnly={isPrefilled && prefillActive}
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
              readOnly={isPrefilled && prefillActive}
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
      checked={formData.gender?.toLowerCase() === "male"}
      onChange={(e) => syncCustomerData({ ...formData, gender: e.target.value })}
      disabled={isPrefilled && prefillActive}
    />
    <label htmlFor="gender_male">Male</label>
  </div>
  <div className="rdbox">
    <input
      type="radio"
      id="gender_female"
      name="gender"
      value="female"
      checked={formData.gender?.toLowerCase() === "female"}
      onChange={(e) => syncCustomerData({ ...formData, gender: e.target.value })}
      disabled={isPrefilled && prefillActive}
    />
    <label htmlFor="gender_female">Female</label>
  </div>
  {errors.gender && <div className="error">{errors.gender}</div>}
</div>



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

      {/* Toast */}
      {isPrefilled && (
        <Toast message="Customer loaded successfully" onClose={() => setIsPrefilled(false)} />
      )}
    </>
  );
};

export default CustomerForm;
