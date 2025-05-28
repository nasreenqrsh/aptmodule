// src/components/AppointmentList.jsx
import React from "react";
import AppointmentItem from "./AppointmentItem";

const appointments = [
  {
    id: 1,
    patient: "Jane Doe",
    time: "10:00 AM",
    status: "Confirmed",
  },
  {
    id: 2,
    patient: "John Smith",
    time: "10:30 AM",
    status: "Ongoing",
  },
];

const AppointmentList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {appointments.map((appt) => (
        <AppointmentItem key={appt.id} {...appt} />
      ))}
    </div>
  );
};

export default AppointmentList;
