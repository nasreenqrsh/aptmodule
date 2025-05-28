// src/components/ServiceList.jsx
import React from "react";

const bookedServices = new Array(6).fill({
  service: "Hair Loss Treatment (PRP - Hair Loss Treatment )",
  preference: "Female",
  practitioner: "Dr. Aaliya",
  amount: 100,
  start: "10:00 AM",
  end: "10:50 AM",
  duration: "50 mins"
});

const ServiceList = () => {
  return (
    <div className="srvlist">
      <div className="frmlgnd">Booked Services</div>

      <div className="bkdwrp">
        <div className="srctblwrp">
          <table className="srvctbl">
            <thead>
              <tr>
                <th width="300">Service</th>
                <th>Preference</th>
                <th>Practitioner</th>
                <th>Amount</th>
                <th width="90">Start Time</th>
                <th width="90">End Time</th>
                <th>Duration</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {bookedServices.map((service, index) => (
                <tr key={index}>
                  <td>{service.service}</td>
                  <td>{service.preference}</td>
                  <td>{service.practitioner}</td>
                  <td>{service.amount}</td>
                  <td>{service.start}</td>
                  <td>{service.end}</td>
                  <td>{service.duration}</td>
                  <td>
                    <button className="delbtn tooltip" data-tooltip="Delete Service" data-tooltip-pos="left">
                      <img src="/images/deletewt.svg" alt="Delete" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ServiceList;
