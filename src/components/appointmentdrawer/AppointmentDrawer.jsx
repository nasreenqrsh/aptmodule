// src/components/AppointmentDrawer.jsx
import React, { useEffect, useRef, useState } from "react";
import CustomerForm from "./components/CustomerForm";
import ServiceRequestForm from "./components/ServiceRequestForm";
import ServiceList from "./components/ServiceList";
import FormFooter from "./components/FormFooter";


const AppointmentDrawer = ({ isOpen, onClose }) => {
  const drawerRef = useRef(null);


  useEffect(() => {
    if (drawerRef.current) {
      if (isOpen) {
        drawerRef.current.classList.add("expand");
      } else {
        drawerRef.current.classList.remove("expand");
      }
    }
  }, [isOpen]);

  return (
    <>    
    <div ref={drawerRef} className="appointdrwr">
      <div className="apptfrmflx">
        <span className="clpse" onClick={onClose}>
          <img src="/images/collpase.svg" alt="Collapse" />
        </span>

        <CustomerForm />
        <ServiceRequestForm />
        <ServiceList />
      </div>

      <FormFooter onCancel={onClose} />
    </div>
   
</>
    
  )
};

export default AppointmentDrawer;
