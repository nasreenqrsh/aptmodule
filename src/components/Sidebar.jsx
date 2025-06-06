import React, { useState } from "react";
  import { useNavigate } from 'react-router-dom';

const AppointmentDetails = ({ appointment, onClose }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const toggleDetails = () => {
    setIsExpanded(!isExpanded);
  };

  const goToPaymentPage = () => {
    const queryParams = new URLSearchParams();
    if (appointment?.CustId) queryParams.append("custid", appointment.CustId);
    if (appointment?.firstname || appointment?.lastname) {
      queryParams.append("custname", `${appointment.firstname || ""} ${appointment.lastname || ""}`);
    }
    navigate(`/payment${queryParams.toString() ? `?${queryParams.toString()}` : ""}`);
  };

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
              {appointment?.fullname || ""} 
              <div className="cstno">{appointment?.number || "—"}</div>
              <div className="cstid">{appointment?.custid || "—"}</div>
            </h3>
          </div>

          <div className="cdtprof">
            <a href="#" className="cstlnk">
              <img
                src={`${import.meta.env.BASE_URL}images/custome.svg`}
                width="16"
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
              <a href="#" className="edit tooltip" title="Edit Appointment">
                <span className="stimg">
                  <img src={`${import.meta.env.BASE_URL}images/edtwht.svg`} alt="Edit" />
                </span>
              </a>
              <a href="#" className="delete tooltip" data-tooltip="Delete Appointment" data-tooltip-pos="left">
                <span className="stimg">
                  <img src={`${import.meta.env.BASE_URL}images/deletewt.svg`} alt="Delete" />
                </span>
              </a>
            </div>
          </div>

          <div className="apptsts">
            <div className="form-group slctgrp">
              <label>Status</label>
              <select id="docSelect" value={appointment?.status || "0"} >
                <option value="Booked">Booked</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Checked In">Checked In</option>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
                <option value="No Show">No Show</option>
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
                  <div className="dtval">
                    {appointment?.starttime || ""} - {appointment?.endtime || ""}
                  </div>
                </div>
              </div>

              <div className="dtntime">
                <div className="icondiv">
                  <img src={`${import.meta.env.BASE_URL}images/services.svg`} alt="Services" />
                </div>
                <div className="detaildiv">
                  <div className="dtlbl">Services</div>
                  <div className="dtval">{appointment?.servicecode || "—"}</div>
                </div>
              </div>

              <div className="dtntime">
                <div className="icondiv">
                  <img src={`${import.meta.env.BASE_URL}images/noteslist.svg`} alt="Notes" />
                </div>
                <div className="detaildiv">
                  <div className="dtlbl">Notes</div>
                  <div className="dtval">{appointment?.notes || "—"}</div>
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
              <img src={`${import.meta.env.BASE_URL}images/consent.svg`} alt="Consent Forms" />
              Consent and Treatment Forms
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
