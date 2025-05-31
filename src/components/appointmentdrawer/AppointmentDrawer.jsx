// AppointmentDrawer.jsx
import React, { useEffect, useRef, useState } from "react";
import CustomerForm from "./components/CustomerForm";
import FormFooter from "./components/FormFooter";
import ServiceBookingContainer from "./components/ServiceBookingContainer";

const AppointmentDrawer = ({ isOpen, onClose, customer }) => {
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
            <img src="/images/collpase.svg" alt="Collapse" />
          </span>

          <ServiceBookingContainer key={resetKey} prefillData={customer} />
        </div>

        <FormFooter onCancel={resetAllForms} />
      </div>
    </>
  );
};

export default AppointmentDrawer;
