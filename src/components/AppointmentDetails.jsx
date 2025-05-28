import React, { useState } from 'react';

const AppointmentDetails = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDetails = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`smdiv expand ${isExpanded ? 'expand' : ''}`} id="smdiv">
      <div className="resizable" id="resizableDiv">
        <div className="rightcls" onClick={toggleDetails}>
          <img src="images/dblrigh.svg" title="" alt="" width="16" height="16" />
        </div>

        <div className="apptcdet custdiv">
          <div className="csttopdiv">
            <img src="images/usericon.png" width="30" title="" alt="" />
            <h3 className="cstnm">
              Jane Doe
              <div className="cstno">+966-123456789</div>
              <div className="cstid">ABC123</div>
            </h3>
          </div>

          <div className="">
            <div className="cdtprof">
              <a href="#" className="cstlnk">
                <img src="images/custome.svg" title="" alt="" />
                Customer Profile
              </a>
            </div>
          </div>
        </div>

        <div className="apptblk">
          <div className="hdflx">
            <h2 className="dethead">Appointment Details</h2>
            <div className="acticons">
              <a href="#" className="edit tooltip" data-tooltip="Edit Appointment" data-tooltip-pos="down">
                <span className="stimg">
                  <img src="images/edtwht.svg" alt="" />
                </span>
              </a>

              <a href="#" className="delete tooltip" data-tooltip="Delete Appointment" data-tooltip-pos="left">
                <span className="stimg">
                  <img src="images/deletewt.svg" alt="" />
                </span>
              </a>
            </div>
          </div>

          <div className="apptsts">
            <div className="form-group slctgrp">
              <label htmlFor="docSelect">Status</label>
              <select id="docSelect">
                <option value="0">New</option>
                <option value="1" selected>Booked</option>
                <option value="2">Confirmed</option>
                <option value="3">Checked In</option>
                <option value="4">Active</option>
                <option value="5">Completed</option>
                <option value="6">Cancelled</option>
                <option value="7">No Show</option>
              </select>
            </div>
          </div>

          <div className="medhistdiv">
            <div className="aptdetailwrp">
              <div className="dtntime">
                <div className="icondiv">
                  <img src="images/Datentime.svg" title="" alt="" />
                </div>
                <div className="detaildiv">
                  <div className="dtlbl">Date & Time</div>
                  <div className="dtval">29/05/2025, 10:00 AM - 10:30 AM (30 minutes)</div>
                </div>
              </div>

              <div className="dtntime">
                <div className="icondiv">
                  <img src="images/services.svg" title="" alt="" />
                </div>
                <div className="detaildiv">
                  <div className="dtlbl">Services</div>
                  <div className="dtval">PRP, Laser, Hair Fall Consultation</div>
                </div>
              </div>

              <div className="dtntime">
                <div className="icondiv">
                  <img src="images/noteslist.svg" title="" alt="" />
                </div>
                <div className="detaildiv">
                  <div className="dtlbl">Notes</div>
                  <div className="dtval">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
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
              <img src="images/medical.svg" title="" alt="" />
              Medical History
            </a>
            <a href="#" className="cstlnk">
              <img src="images/consent.svg" title="" alt="" />
              Consent and Treatment forms
            </a>
          </div>

          <a href="#" className="pndpay">
            <span className="stimg">
              <img src="images/paymentpend.svg" alt="" /> Make Payment
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;
