import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';


// The AppointmentDetails component
const AppointmentDetails = ({ appointment, onClose }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
const goToPaymentPage = () => {
  const queryParams = new URLSearchParams();
  if (appointment.id) queryParams.append("aptid", appointment.id);
  if (appointment.customerName) queryParams.append("custname", appointment.customerName);

  navigate(`/payment-page${queryParams.toString() ? `?${queryParams.toString()}` : ""}`);
};


  // Function to handle expanding the appointment drawer
  const toggleDetails = () => {
    setIsExpanded(!isExpanded);
  };
  let queryParams = new URLSearchParams();
if (appointment.id) queryParams.append("aptid", appointment.id);
if (appointment.customerName) queryParams.append("custname", appointment.customerName);


  return (
    <div className={`smdiv expand ${isExpanded ? "expand" : ""}`}>
      <div className="resizable" id="resizableDiv">
        <div className="rightcls" onClick={onClose}>
          <img
  src={`${import.meta.env.BASE_URL}images/dblrigh.svg`}
  alt="Close"
  width="16"
  height="16"
/>
        </div>

        <div className="apptcdet custdiv">
          <div className="csttopdiv">
            <img
              src={`${import.meta.env.BASE_URL}images/usericon.png`}
              width="30"
              title="User Icon"
              alt="User Icon"
            />
            <h3 className="cstnm">
              {appointment.customerName}
              <div className="cstno">{appointment.customerPhone}</div>
              <div className="cstid">{appointment.customerId}</div>
            </h3>
          </div>

          <div className="cdtprof">
            <a href="#" title="" className="cstlnk">
              <img
                src={`${import.meta.env.BASE_URL}images/custome.svg`}
                width="16"
                title="Customer Profile"
                alt="Customer Profile"
              />
              Customer Profile
            </a>
          </div>
        </div>

        <div className="apptblk">
          <div className="hdflx">
            <h2 className="dethead">Appointment Details</h2>
            <div className="acticons">
              <a href="#" className="edit tooltip" data-tooltip="Edit Appointment" title="Edit Appointment">
                <span className="stimg">
                 <img src={`${import.meta.env.BASE_URL}images/edtwht.svg`} alt="Edit Appointment" />

                </span>
              </a>
              <a href="#" className="delete tooltip" title="Delete Appointment">
                <span className="stimg">
                  <img src={`${import.meta.env.BASE_URL}images/deletewt.svg`} alt="Delete Appointment" />

                </span>
              </a>
            </div>
          </div>

          <div className="apptsts">
            <div className="form-group slctgrp">
              <label>Status</label>
              <select id="docSelect" value={appointment.status}>
                <option value="0">New</option>
                <option value="1" selected={appointment.status === "Booked"}>
                  Booked
                </option>
                <option value="2" selected={appointment.status === "Confirmed"}>
                  Confirmed
                </option>
                <option value="3" selected={appointment.status === "Checked In"}>
                  Checked In
                </option>
                <option value="4" selected={appointment.status === "Active"}>
                  Active
                </option>
                <option value="5" selected={appointment.status === "Completed"}>
                  Completed
                </option>
                <option value="6" selected={appointment.status === "Cancelled"}>
                  Cancelled
                </option>
                <option value="7" selected={appointment.status === "No Show"}>
                  No Show
                </option>
              </select>
            </div>
          </div>

          <div className="medhistdiv">
            <div className="aptdetailwrp">
              <div className="dtntime">
                <div className="icondiv">
                  <img src={`${import.meta.env.BASE_URL}images/Datentime.svg`} alt="Date and Time" />

                </div>
                <div className="detaildiv">
                  <div className="dtlbl">Date & Time</div>
                  <div className="dtval">{appointment.dateTime}</div>
                </div>
              </div>

              <div className="dtntime">
                <div className="icondiv">
<img src={`${import.meta.env.BASE_URL}images/services.svg`} alt="Services" />
                </div>
                <div className="detaildiv">
                  <div className="dtlbl">Services</div>
                  <div className="dtval">{appointment.services}</div>
                </div>
              </div>

              <div className="dtntime">
                <div className="icondiv">
<img src={`${import.meta.env.BASE_URL}images/noteslist.svg`} alt="Notes" />
                </div>
                <div className="detaildiv">
                  <div className="dtlbl">Notes</div>
                  <div className="dtval">{appointment.notes}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="apptactdiv">
          <div className="hdflx">
            <h2 className="dethead">Appointment Execution</h2>
          </div>

          <div className="apptcdet">
            <a href="#" className="cstlnk">
<img src={`${import.meta.env.BASE_URL}images/medical.svg`} alt="Medical History" />
              Medical History
            </a>
            <a href="#" className="cstlnk">
<img src={`${import.meta.env.BASE_URL}images/consent.svg`} alt="Consent and Treatment Forms" />
              Consent and Treatment forms
            </a>
          </div>
         

         <button onClick={goToPaymentPage} className="pndpay">
  <span className="stimg">
    <img
      src={`${import.meta.env.BASE_URL}images/paymentpend.svg`}
      alt="Make Payment"
    />
    Make Payment
  </span>
</button>

        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;
