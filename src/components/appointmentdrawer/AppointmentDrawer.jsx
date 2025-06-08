// AppointmentDrawer.jsx
import React, { useEffect, useRef, useState } from "react";
import CustomerForm from "./components/CustomerForm";
import FormFooter from "./components/FormFooter";
import ServiceBookingContainer from "./components/ServiceBookingContainer";

const AppointmentDrawer = ({ isOpen, onClose, timeSlot, customer, doctor, onRefreshAppointments }) => {
  const drawerRef = useRef(null);
  const [resetKey, setResetKey] = useState(0); // 👈 Used to trigger reset

  useEffect(() => {
    if (drawerRef.current) {
      if (isOpen) {
        drawerRef.current.classList.add("expand");
      } else {
        drawerRef.current.classList.remove("expand");
      }
    }
  }, [isOpen]);

  const resetAllForms = () => {
    setResetKey(prev => prev + 1); // 👈 Trigger reset
    onClose(); // 👈 Also close the drawer
  };

  return (
    <>
      <div ref={drawerRef} className="appointdrwr">
        <div className="apptfrmflxwrp">
          <span className="clpse" onClick={resetAllForms}>
<img src={`${import.meta.env.BASE_URL}images/collpase.svg`} alt="Collapse" />
          </span>

          <ServiceBookingContainer key={resetKey} doctor={doctor}
        timeSlot={timeSlot} prefillData={customer} onClose={resetAllForms} onRefreshAppointments={onRefreshAppointments}/>
        </div>

      </div>
    </>
  );
};

export default AppointmentDrawer;
