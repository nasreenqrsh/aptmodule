import React, { useState, useEffect } from "react";
import AddNoteModal from "../../AddNoteModal";

const createDataHandler = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch data");
  return await res.json();
};

const ServiceRequestForm = ({ onAddService, resetKey, initialData, lastEndTime }) => {
  const [formData, setFormData] = useState({
    servicename: "",
    servicecode: "",
    preference: "any",
    practitioner: "",
    startTime: "10:00 AM",
    duration: "5",
    endTime: "10:05 AM",
    room: "",
    note: ""
  });

  const [errors, setErrors] = useState({});
  const [showAddNote, setShowAddNote] = useState(false);
  const [filteredServices, setFilteredServices] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [practitioners, setPractitioners] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchServicesAndRooms = async () => {
      try {
        const [services, roomData] = await Promise.all([
          createDataHandler("/GetServiceHandler.ashx"),
          createDataHandler("/GetRoomHandler.ashx")

          /* createDataHandler("https://mocki.io/v1/2ad352d1-db23-4a86-824e-4cb5904f4478"),
          createDataHandler("https://mocki.io/v1/aa41a3f4-c489-43d5-81d1-d8daf1bc4ebd"),
          createDataHandler("https://mocki.io/v1/cdd90edf-6eb8-4061-8dfe-c5217cee9ffa") */
        ]);
        setServicesList(services);
        setRooms(roomData);
      } catch (error) {
        console.error("Failed to load services or rooms:", error);
      }
    };
    fetchServicesAndRooms();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      const defaultStart = lastEndTime || "10:00 AM";
      const defaultDuration = "5";
      const defaultEnd = calculateEndTime(defaultStart, defaultDuration);

      setFormData({
        servicename: "",
        servicecode: "",
        preference: "any",
        practitioner: "",
        startTime: defaultStart,
        duration: defaultDuration,
        endTime: defaultEnd,
        room: "",
        note: ""
      });
    }
    setErrors({});
  }, [resetKey, initialData, lastEndTime]);

  const handleServiceChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({ ...prevData, servicename: value }));
    setFilteredServices(value
      ? servicesList.filter((item) =>
          item.servicename.toLowerCase().includes(value.toLowerCase())
        )
      : []
    );
  };

  const handleServiceSelect = async (servicename) => {
    const selectedService = servicesList.find((s) => s.servicename === servicename);
    const servicecode = selectedService?.servicecode || "";

    setFormData((prevData) => ({
      ...prevData,
      servicename,
      servicecode,
      practitioner: ""
    }));

    setFilteredServices([]);

    if (!servicecode) return;

    try {
      const doctors = await createDataHandler(`/GetPractitionerHandler.ashx?servicecode=${encodeURIComponent(servicecode)}`);
      setPractitioners(doctors);
    } catch (error) {
      console.error("Failed to fetch practitioners for selected service code:", error);
      setPractitioners([]);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "room") {
      const selectedRoom = rooms.find((room) => room.RoomNo === value);
      setFormData((prevData) => ({
        ...prevData,
        room: value,
        equipment: selectedRoom?.Equipment || "N/A"
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [id]: value }));
    }
  };

  const handleRadioChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({ ...prevData, preference: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.keys(formData).every((field) => validateField(field));
    if (isValid) {
      const newService = {
        servicename: formData.servicename,
        servicecode: formData.servicecode,
        preference: formData.preference.charAt(0).toUpperCase() + formData.preference.slice(1),
        practitioner: formData.practitioner,
        amount: 100,
        start: formData.startTime,
        end: formData.endTime,
        duration: `${formData.duration} mins`,
        note: formData.note,
        equipment: formData.equipment
      };
      onAddService?.(newService);
    }
  };

  const validateField = (field) => {
    let formErrors = { ...errors };
    let isValid = true;

    switch (field) {
      case "servicename":
        if (!formData.servicename) {
          formErrors.servicename = "Service is required.";
          isValid = false;
        } else formErrors.servicename = "";
        break;
      case "practitioner":
        if (!formData.practitioner) {
          formErrors.practitioner = "Please select a practitioner.";
          isValid = false;
        } else formErrors.practitioner = "";
        break;
      case "startTime":
        if (!formData.startTime) {
          formErrors.startTime = "Start time is required.";
          isValid = false;
        } else formErrors.startTime = "";
        break;
      case "duration":
        if (!formData.duration) {
          formErrors.duration = "Duration is required.";
          isValid = false;
        } else formErrors.duration = "";
        break;
      case "room":
        if (!formData.room) {
          formErrors.room = "Please select a room.";
          isValid = false;
        } else formErrors.room = "";
        break;
      default:
        break;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleBlur = (e) => validateField(e.target.id);

  const calculateEndTime = (startTime, duration) => {
    const startTimeInMinutes = convertToMinutes(startTime);
    const endTimeInMinutes = startTimeInMinutes + parseInt(duration, 10);
    return convertToTime(endTimeInMinutes);
  };

  const convertToMinutes = (time) => {
    const [hours, minutesPeriod] = time.split(":");
    const [minutes, period] = minutesPeriod.split(" ");
    let totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
    if (period === "PM" && hours !== "12") totalMinutes += 12 * 60;
    if (period === "AM" && hours === "12") totalMinutes -= 12 * 60;
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

  return (
    <>
      <div className="srvwrp">
        <div className="frmlgnd">Requesting Services</div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="servicename"
              placeholder=" "
              value={formData.servicename}
              onChange={handleServiceChange}
              onBlur={handleBlur}
            />
            <label htmlFor="servicename" className="frmlbl">Service</label>
            {errors.servicename && <div className="error">{errors.servicename}</div>}
            {filteredServices.length > 0 && (
              <ul className="suggestions">
                {filteredServices.map((item, index) => (
                  <li key={index} onClick={() => handleServiceSelect(item.servicename)}>
                    {item.servicename}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {formData.servicecode && (
            <div className="form-group">
              <input
                type="hidden"
                id="servicecode"
                placeholder=" "
                value={formData.servicecode}
                readOnly
              />
            </div>
          )}

          <div className="form-group radgrp">
            <label>Preference</label>
            <div className="rdbox">
              <input type="radio" id="pref_any" name="preference" value="any" checked={formData.preference === "any"} onChange={handleRadioChange} />
              <label htmlFor="pref_any">Any</label>
            </div>
            <div className="rdbox">
              <input type="radio" id="pref_male" name="preference" value="male" checked={formData.preference === "male"} onChange={handleRadioChange} />
              <label htmlFor="pref_male">Male</label>
            </div>
            <div className="rdbox">
              <input type="radio" id="pref_female" name="preference" value="female" checked={formData.preference === "female"} onChange={handleRadioChange} />
              <label htmlFor="pref_female">Female</label>
            </div>
          </div>

          <div className="form-group slctgrp">
            <label>Practitioner:</label><br></br>
            <select id="practitioner" value={formData.practitioner} className="pract" onChange={handleChange} onBlur={handleBlur}>
              <option value="">Select Practitioner</option>
              {practitioners.map((doc, index) => (
                <option key={index} value={doc.Name}>{doc.Name} ({doc.Type})</option>
              ))}
            </select>
            {errors.practitioner && <div className="error">{errors.practitioner}</div>}
          </div>

          <div className="form-group slctgrp">
            <label htmlFor="startTime">Start Time:</label>
            <select id="startTime" value={formData.startTime} onChange={handleStartTimeChange} onBlur={handleBlur}>
              {[...Array(144)].map((_, i) => {
                const minutes = 600 + i * 5;
                const hours = Math.floor(minutes / 60);
                const mins = minutes % 60;
                const period = hours >= 12 ? "PM" : "AM";
                const displayHours = hours % 12 === 0 ? 12 : hours % 12;
                const displayMins = mins.toString().padStart(2, "0");
                const timeString = `${displayHours}:${displayMins} ${period}`;
                return <option key={i} value={timeString}>{timeString}</option>;
              })}
            </select>
            {errors.startTime && <div className="error">{errors.startTime}</div>}
          </div>

          <div className="form-group slctgrp">
            <label htmlFor="duration">Duration:</label>
            <select id="duration" value={formData.duration} onChange={handleDurationChange} onBlur={handleBlur}>
              {[...Array(144)].map((_, i) => (
                <option key={i} value={i * 5 + 5}>{i * 5 + 5} mins</option>
              ))}
            </select>
            {errors.duration && <div className="error">{errors.duration}</div>}
          </div>

          <div className="form-group">
            <input type="text" id="endtm" placeholder=" " value={formData.endTime} readOnly />
            <label htmlFor="endtm" className="frmlbl">End Time</label>
          </div>

          <div className="lstfrmsect">
            <div className="form-group slctgrp">
              <label>Room:</label>
              <select id="room" value={formData.room} onChange={handleChange} onBlur={handleBlur}>
                <option value="">Select Room</option>
                {rooms.map((room, index) => (
                  <option key={index} value={room.RoomNo}>{room.RoomNo}</option>
                ))}
              </select>
              {errors.room && <div className="error">{errors.room}</div>}
            </div>

            <span className="notebtn tooltip" data-tooltip="Add Note" data-tooltip-pos="down" onClick={() => setShowAddNote(true)}>
<img src={`${import.meta.env.BASE_URL}images/notes.svg`} alt="Add Note" />
            </span>

            <button className="lnkbtn" type="submit">
<img src={`${import.meta.env.BASE_URL}images/addservice.svg`} alt="Add Service" /> Add Service
            </button>
          </div>
        </form>
      </div>

      {showAddNote && (
        <AddNoteModal
          onClose={() => setShowAddNote(false)}
          onSubmit={(noteContent) => {
            setFormData((prev) => ({ ...prev, note: noteContent }));
            setShowAddNote(false);
          }}
        />
      )}
    </>
  );
};

export default ServiceRequestForm;
