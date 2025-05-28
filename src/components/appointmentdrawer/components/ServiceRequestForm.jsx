import React, { useState, useEffect } from "react";
import AddNoteModal from "../../AddNoteModal";

const ServiceRequestForm = () => {
  const [formData, setFormData] = useState({
    service: "",
    preference: "any",
    practitioner: "",
    startTime: "10:00 AM", // Default value for start time
    duration: "5", // Default duration (5 mins)
    endTime: "10:05 AM", // Default value for end time (5 mins after 10:00 AM)
    room: "",
  });

  const [errors, setErrors] = useState({
    service: "",
    preference: "",
    practitioner: "",
    startTime: "",
    duration: "",
    room: "",
  });

  const [showAddNote, setShowAddNote] = useState(false);

  // For auto-suggestion
  const [filteredServices, setFilteredServices] = useState([]);
  const [servicesList] = useState([
    "PRP",
    "Laser treatment",
    "Hair Fall Consultation",
    "Skin Treatment",
    "Facial",
    "Botox",
    "Acne Treatment",
    "Teeth Whitening",
  ]);

  // Filter services based on input
  const handleServiceChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      service: value,
    }));

    // Filter services based on the input
    if (value) {
      setFilteredServices(
        servicesList.filter((service) =>
          service.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredServices([]);
    }
  };

  const handleServiceSelect = (service) => {
    setFormData((prevData) => ({
      ...prevData,
      service,
    }));
    setFilteredServices([]); // Clear suggestions after selection
  };

  // Validation function for form fields
  const validateField = (field) => {
    let formErrors = { ...errors };
    let isValid = true;

    switch (field) {
      case "service":
        if (!formData.service) {
          formErrors.service = "Service is required.";
          isValid = false;
        } else {
          formErrors.service = "";
        }
        break;

      case "practitioner":
        if (!formData.practitioner) {
          formErrors.practitioner = "Please select a practitioner.";
          isValid = false;
        } else {
          formErrors.practitioner = "";
        }
        break;

      case "startTime":
        if (!formData.startTime) {
          formErrors.startTime = "Start time is required.";
          isValid = false;
        } else {
          formErrors.startTime = "";
        }
        break;

      case "duration":
        if (!formData.duration) {
          formErrors.duration = "Duration is required.";
          isValid = false;
        } else {
          formErrors.duration = "";
        }
        break;

      case "room":
        if (!formData.room) {
          formErrors.room = "Please select a room.";
          isValid = false;
        } else {
          formErrors.room = "";
        }
        break;

      default:
        break;
    }

    setErrors(formErrors);
    return isValid;
  };

  // Handle change for other fields
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleRadioChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      preference: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.keys(formData).every((field) => validateField(field));
    if (isValid) {
      console.log("Form submitted successfully", formData);
    }
  };

  // Handle blur validation
  const handleBlur = (e) => {
    const { id } = e.target;
    validateField(id);
  };

  useEffect(() => {
    // Populating Start Time (from 10:00 AM to 10:00 PM with 5 mins interval)
    const timeSelect = document.getElementById("timeSelect");
    const durationSelect = document.getElementById("durationSelect");

    if (timeSelect) {
      const startTime = 10 * 60; // 10:00 AM
      const endTime = 22 * 60; // 10:00 PM
      for (let minutes = startTime; minutes <= endTime; minutes += 5) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        const period = hours >= 12 ? "PM" : "AM";
        const displayHours = hours % 12 === 0 ? 12 : hours % 12;
        const displayMins = mins.toString().padStart(2, "0");
        const timeString = `${displayHours}:${displayMins} ${period}`;
        const option = new Option(timeString, timeString);
        timeSelect.appendChild(option);
      }
    }

    // Populating Duration (from 5 mins to 12 hours with 5 mins interval)
    if (durationSelect) {
      for (let minutes = 5; minutes <= 720; minutes += 5) {
        const hrs = Math.floor(minutes / 60);
        const mins = minutes % 60;
        const label = hrs > 0 ? `${hrs} hr${mins ? ` ${mins} mins` : ""}` : `${mins} mins`;
        const option = new Option(label, minutes);
        durationSelect.appendChild(option);
      }
    }
  }, []);

  const calculateEndTime = (startTime, duration) => {
    const startTimeInMinutes = convertToMinutes(startTime);
    const endTimeInMinutes = startTimeInMinutes + parseInt(duration, 10);

    return convertToTime(endTimeInMinutes);
  };

  const convertToMinutes = (time) => {
    const [hours, minutesPeriod] = time.split(":");
    const [minutes, period] = minutesPeriod.split(" ");
    let totalMinutes = parseInt(hours) * 60 + parseInt(minutes);

    if (period === "PM" && hours !== "12") {
      totalMinutes += 12 * 60;
    }

    if (period === "AM" && hours === "12") {
      totalMinutes -= 12 * 60;
    }

    return totalMinutes;
  };

  const convertToTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const period = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 === 0 ? 12 : hours % 12;
    const displayMins = mins.toString().padStart(2, "0");
    return `${displayHours}:${displayMins} ${period}`;
  };

  const handleStartTimeChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      startTime: value,
      endTime: calculateEndTime(value, formData.duration),
    }));
  };

  const handleDurationChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      duration: value,
      endTime: calculateEndTime(formData.startTime, value),
    }));
  };

  const handleTimeSlotDoubleClick = (time) => {
    setFormData((prevData) => ({
      ...prevData,
      startTime: time,
      endTime: calculateEndTime(time, formData.duration),
    }));
  };

  return (
    <>
      <div className="srvwrp">
        <div className="frmlgnd">Requesting Services</div>

        <form onSubmit={handleSubmit}>
          {/* Service */}
          <div className="form-group">
            <input
              type="text"
              id="service"
              placeholder=" "
              value={formData.service}
              onChange={handleServiceChange}
              onBlur={handleBlur}
            />
            <label htmlFor="service" className="frmlbl">Service</label>
            {errors.service && <div className="error">{errors.service}</div>}

            {/* Auto-suggestions for Service */}
            {filteredServices.length > 0 && (
              <ul className="suggestions">
                {filteredServices.map((service, index) => (
                  <li key={index} onClick={() => handleServiceSelect(service)}>
                    {service}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Preference */}
          <div className="form-group radgrp">
            <label>Preference</label>
            <div className="rdbox">
              <input
                type="radio"
                id="any"
                name="preference"
                value="any"
                checked={formData.preference === "any"}
                onChange={handleRadioChange}
              />
              <label htmlFor="any">Any</label>
            </div>
            <div className="rdbox">
              <input
                type="radio"
                id="male2"
                name="preference"
                value="male"
                checked={formData.preference === "male"}
                onChange={handleRadioChange}
              />
              <label htmlFor="male2">Male</label>
            </div>
            <div className="rdbox">
              <input
                type="radio"
                id="female2"
                name="preference"
                value="female"
                checked={formData.preference === "female"}
                onChange={handleRadioChange}
              />
              <label htmlFor="female2">Female</label>
            </div>
          </div>

          {/* Practitioner */}
          <div className="form-group slctgrp">
            <label>Practitioner:</label>
            <select
              id="practitioner"
              value={formData.practitioner}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Select Practitioner</option>
              {[...Array(7)].map((_, i) => (
                <option key={i} value={i + 1}>Dr. Aaliya</option>
              ))}
            </select>
            {errors.practitioner && <div className="error">{errors.practitioner}</div>}
          </div>

          {/* Start Time */}
          <div className="form-group slctgrp">
            <label htmlFor="timeSelect">Start Time:</label>
            <select
              id="timeSelect"
              value={formData.startTime}
              onChange={handleStartTimeChange}
              onBlur={handleBlur}
            >
              {[...Array(13)].map((_, index) => (
                <option key={index} value={`10:${(index * 5).toString().padStart(2, "0")} AM`}>
                  10:{(index * 5).toString().padStart(2, "0")} AM
                </option>
              ))}
            </select>
            {errors.startTime && <div className="error">{errors.startTime}</div>}
          </div>

          {/* Duration */}
          <div className="form-group slctgrp">
            <label htmlFor="durationSelect">Duration:</label>
            <select
              id="durationSelect"
              value={formData.duration}
              onChange={handleDurationChange}
              onBlur={handleBlur}
            >
              {[...Array(144)].map((_, i) => (
                <option key={i} value={i * 5 + 5}>
                  {i * 5 + 5} mins
                </option>
              ))}
            </select>
            {errors.duration && <div className="error">{errors.duration}</div>}
          </div>

          {/* End Time */}
          <div className="form-group">
            <input
              type="text"
              id="endtm"
              placeholder=" "
              value={formData.endTime}
              readOnly
            />
            <label htmlFor="endtm" className="frmlbl">End Time</label>
          </div>

          {/* Room */}
          <div className="lstfrmsect">
            <div className="form-group slctgrp rmgrp">
              <label>Room:</label>
              <select
                value={formData.room}
                onChange={handleChange}
                id="room"
                onBlur={handleBlur}
              >
                <option value="">Select Room</option>
                {[...Array(4)].map((_, i) => (
                  <option key={i} value={i + 1}>Room {i + 1}</option>
                ))}
              </select>
              {errors.room && <div className="error">{errors.room}</div>}
            </div>

            <span
              className="notebtn tooltip"
              data-tooltip="Add Note"
              data-tooltip-pos="down"
              onClick={() => setShowAddNote(true)}
            >
              <img src="/images/notes.svg" alt="Add Note" />
            </span>

            <button className="lnkbtn" type="submit">
              <img src="/images/addservice.svg" alt="Add Service" /> Add Service
            </button>
          </div>
        </form>
      </div>

      {showAddNote && (
        <AddNoteModal
          onClose={() => setShowAddNote(false)}
          onSubmit={() => {
            console.log("Note submitted");
            setShowAddNote(false);
          }}
        />
      )}
    </>
  );
};

export default ServiceRequestForm;
