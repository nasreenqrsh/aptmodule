import React, { useState } from "react";
import ServiceRequestForm from "./ServiceRequestForm";
import ServiceList from "./ServiceList";

const ServiceBookingContainer = () => {
  const [bookedServices, setBookedServices] = useState([]);

  const addService = (newService) => {
    setBookedServices((prev) => [...prev, newService]);
  };

  const deleteService = (index) => {
    setBookedServices((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <ServiceRequestForm onAddService={addService} />
      <ServiceList services={bookedServices} onDeleteService={deleteService} />
    </>
  );
};

export default ServiceBookingContainer;
