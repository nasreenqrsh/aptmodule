// src/components/ServiceRequestForm.jsx
import React, { useEffect, useState } from "react";
import AddNoteModal from "../../AddNoteModal";

const ServiceRequestForm = () => {

    const [showAddNote, setShowAddNote] = useState(false);


  useEffect(() => {
    const timeSelect = document.getElementById("timeSelect");
    const durationSelect = document.getElementById("durationSelect");

    if (timeSelect) {
      const startTime = 10 * 60;
      const endTime = 23 * 60 + 55;
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

  return (
    <>   
     <div className="srvwrp">
      <div className="frmlgnd">Requesting Services</div>

      <div className="form-group">
        <input type="text" id="service" placeholder=" " />
        <label htmlFor="service" className="frmlbl">Service</label>
      </div>

      <div className="form-group radgrp">
        <label>Preference</label>
        <div className="rdbox">
          <input type="radio" id="any" name="preference" defaultChecked />
          <label htmlFor="any">Any</label>
        </div>
        <div className="rdbox">
          <input type="radio" id="male2" name="preference" />
          <label htmlFor="male2">Male</label>
        </div>
        <div className="rdbox">
          <input type="radio" id="female2" name="preference" />
          <label htmlFor="female2">Female</label>
        </div>
      </div>

      <div className="form-group slctgrp">
        <label>Practitioner:</label>
        <select id="docSelect">
          <option value="0">Select Practitioner</option>
          {[...Array(7)].map((_, i) => (
            <option key={i} value={i + 1}>Dr. Aaliya</option>
          ))}
        </select>
      </div>

      <div className="form-group slctgrp">
        <label htmlFor="timeSelect">Start Time:</label>
        <select id="timeSelect"></select>
      </div>

      <div className="form-group slctgrp">
        <label htmlFor="durationSelect">Duration:</label>
        <select id="durationSelect"></select>
      </div>

      <div className="form-group">
        <input type="text" id="endtm" placeholder=" " readOnly value="10:05 AM" />
        <label htmlFor="endtm" className="frmlbl">End Time</label>
      </div>

      <div className="lstfrmsect">
        <div className="form-group slctgrp rmgrp">
          <label>Room:</label>
          <select>
            <option value="0">Select Room</option>
            {[...Array(4)].map((_, i) => (
              <option key={i} value={i + 1}>Room {i + 1}</option>
            ))}
          </select>
        </div>

        <span className="notebtn tooltip" data-tooltip="Add Note" data-tooltip-pos="down" onClick={() => setShowAddNote(true)}>
          <img src="/images/notes.svg" alt="Add Note" />
        </span>

        <button className="lnkbtn">
          <img src="/images/addservice.svg" alt="Add Service" /> Add Service
        </button>
      </div>
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
