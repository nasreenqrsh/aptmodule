import React, { useState } from 'react';
import AppointmentDetails from './AppointmentDetails';

const AppointmentScheduler = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDetails = () => {
    setIsExpanded(!isExpanded);
  };

  const timeSlots = [
    '10:00 AM', '10:05 AM', '10:10 AM', '10:15 AM', '10:20 AM', '10:25 AM', '10:30 AM',
    '10:35 AM', '10:40 AM', '10:45 AM', '10:50 AM', '10:55 AM', '11:00 AM', '11:05 AM', 
    '11:10 AM', '11:15 AM', '11:20 AM', '11:25 AM', '11:30 AM', '11:35 AM', '11:40 AM', 
    '11:45 AM', '11:50 AM', '11:55 AM', '12:00 PM', '12:05 PM', '12:10 PM', '12:15 PM', 
    '12:20 PM', '12:25 PM', '12:30 PM', '12:35 PM', '12:40 PM', '12:45 PM', '12:50 PM', 
    '12:55 PM', '01:00 PM', '01:05 PM', '01:10 PM', '01:15 PM', '01:20 PM', '01:25 PM', 
    '01:30 PM', '01:35 PM', '01:40 PM', '01:45 PM', '01:50 PM', '01:55 PM', '02:00 PM', 
    '02:05 PM', '02:10 PM', '02:15 PM', '02:20 PM', '02:25 PM', '02:30 PM', '02:35 PM', 
    '02:40 PM', '02:45 PM', '02:50 PM', '02:55 PM', '03:00 PM', '03:05 PM', '03:10 PM', 
    '03:15 PM', '03:20 PM', '03:25 PM', '03:30 PM', '03:35 PM', '03:40 PM', '03:45 PM', 
    '03:50 PM', '03:55 PM', '04:00 PM', '04:05 PM', '04:10 PM', '04:15 PM', '04:20 PM', 
    '04:25 PM', '04:30 PM', '04:35 PM', '04:40 PM', '04:45 PM', '04:50 PM', '04:55 PM', 
    '05:00 PM', '05:05 PM', '05:10 PM', '05:15 PM', '05:20 PM', '05:25 PM', '05:30 PM', 
    '05:35 PM', '05:40 PM', '05:45 PM', '05:50 PM', '05:55 PM', '06:00 PM', '06:05 PM', 
    '06:10 PM', '06:15 PM', '06:20 PM', '06:25 PM', '06:30 PM', '06:35 PM', '06:40 PM', 
    '06:45 PM', '06:50 PM', '06:55 PM', '07:00 PM', '07:05 PM', '07:10 PM', '07:15 PM', 
    '07:20 PM', '07:25 PM', '07:30 PM', '07:35 PM', '07:40 PM', '07:45 PM', '07:50 PM', 
    '07:55 PM', '08:00 PM', '08:05 PM', '08:10 PM', '08:15 PM', '08:20 PM', '08:25 PM', 
    '08:30 PM', '08:35 PM', '08:40 PM', '08:45 PM', '08:50 PM', '08:55 PM', '09:00 PM', 
    '09:05 PM', '09:10 PM', '09:15 PM', '09:20 PM', '09:25 PM', '09:30 PM', '09:35 PM', 
    '09:40 PM', '09:45 PM', '09:50 PM', '09:55 PM', '10:00 PM'
  ];

  const doctors = [
    'Dr. Aisha Karim', 'Dr. Leila Siddiq', 'Dr. Samira Nadeem',
    'Dr. Noor Hassan', 'Dr. Youssef Khan', 'Dr. Salman Qureshi',
    'Dr. Zainab Chaudhry', 'Dr. Huda Yasin'
  ];

  return (
    <section className="calsection">
      <div className="msttbl">
        <div className="lfthrdiv">
          <div className="lftcol">
            <div className="lftmin lgndiv">
              <div className="lgndth">
                <div className="vertxt">
                  Doctors
                </div>

                <div className="hrtxt">
                  Time
                </div>
              </div>
            </div>
          </div>

          <div className="lftcol">
            <div className="lftmin">
              {doctors.map((doctor, index) => (
                <div key={index} className="lfttm tblcell">
                  {doctor}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rgtcol">
          {timeSlots.map((time, index) => (
            <div className="cldrrow" key={index}>
              <div className="cldrttl clnctm">
                {time}
              </div>
              {doctors.map((_, colIndex) => (
                <div key={colIndex} className="cldrcol clncoff" onDoubleClick={toggleDetails}>
                  {/* Appointment cells */}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {isExpanded && (
        <div className="smdiv">
          <div className="resizable" id="resizableDiv">
            <div className="rightcls" onClick={toggleDetails}>
              <img src="images/dblrigh.svg" alt="" width="16" height="16" />
            </div>

            {/* Appointment details here */}
            <div className="apptcdet custdiv">
              <img src="images/usericon.png" width="30" alt="" />
              <h3 className="cstnm">Jane Doe</h3>
            </div>
            <div className="apptsts">
              <div className="form-group slctgrp">
                <label htmlFor="">Status</label>
                <select id="docSelect">
                  <option value="0">New</option>
                  <option value="1" selected>Booked</option>
                  <option value="2">Confirmed</option>
                  {/* other options */}
                </select>
              </div>
            </div>

            {/* More Appointment Info */}
            <div className="apptlst">
              <ul>
                <li><span className="apptlbl">Date:</span> 29/05/2025</li>
                <li><span className="apptlbl">Start Time:</span> 10:00 AM</li>
                {/* more details */}
              </ul>
            </div>
          </div>
        </div>
      )}

      <AppointmentDetails isExpanded={true}/>
    </section>
  );
};

export default AppointmentScheduler;
