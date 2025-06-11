import React, { useEffect, useRef, useState } from "react";
import ServiceBookingContainer from "./components/ServiceBookingContainer";

const AppointmentDrawer = ({
  isOpen,
  onClose,
  timeSlot,
  doctor,
  editAppointment,
  onRefreshAppointments,
}) => {
  const drawerRef = useRef(null);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    if (drawerRef.current) {
      if (isOpen) {
        drawerRef.current.classList.add("expand");
      } else {
        drawerRef.current.classList.remove("expand");
      }
    }
  }, [isOpen]);

  const handleClose = () => {
    setResetKey((prev) => prev + 1); // Trigger form reset
    onClose(); // Close the drawer
  };

  return (
    <div ref={drawerRef} className="appointdrwr">
      <div className="apptfrmflxwrp">
        <span className="clpse" onClick={handleClose}>
          <img
            src={`${import.meta.env.BASE_URL}images/closeicon.svg`}
            alt="Close"
          />
        </span>

        <ServiceBookingContainer
          key={resetKey}
          prefillData={editAppointment} // ✅ prefill when editing
          doctor={doctor}
          timeSlot={timeSlot}
          onClose={handleClose}
          onRefreshAppointments={onRefreshAppointments}
        />
      </div>
    </div>
  );
};

export default AppointmentDrawer;
