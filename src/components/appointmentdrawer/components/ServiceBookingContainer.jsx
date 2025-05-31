// ServiceBookingContainer.jsx
import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import CustomerForm from "./CustomerForm";
import ServiceRequestForm from "./ServiceRequestForm";
import ServiceList from "./ServiceList";

const ServiceBookingContainer = forwardRef(({ prefillData }, ref) => {
  const [bookedServices, setBookedServices] = useState([]);
  const [customerData, setCustomerData] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (prefillData) {
      setCustomerData(prefillData);
    }
  }, [prefillData]);

  useImperativeHandle(ref, () => ({
    resetForm() {
      setCustomerData(null);
      setBookedServices([]);
    },
  }));

  const saveAppointmentToAPI = async (data) => {
    try {
      const response = await fetch("https://mocki.io/v1/37f2f3c4-0e58-4e8d-bc66-8c2901b5ec3e", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log("API Response:", result);
    } catch (error) {
      console.error("Failed to save appointment:", error);
    }
  };

  const addService = (newService) => {
    if (
      !customerData ||
      !customerData.name ||
      !customerData.number ||
      !customerData.gender
    ) {
      alert("Please fill in customer details before adding a service.");
      return;
    }

    const combinedData = {
      customer: customerData,
      service: newService,
    };

    setBookedServices((prev) => [...prev, newService]);
    setShowToast(true);
    saveAppointmentToAPI(combinedData); // ✅ Save to API
  };

  const deleteService = (index) => {
    setBookedServices((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="booking-container apptfrmflx">
      {showToast && (
        <div className="toast success">
          Service added successfully
          <button onClick={() => setShowToast(false)}>&times;</button>
        </div>
      )}

      <CustomerForm setCustomerData={setCustomerData} prefillData={prefillData} />
      <ServiceRequestForm onAddService={addService} />
      <ServiceList services={bookedServices} onDeleteService={deleteService} />
    </div>
  );
});

export default ServiceBookingContainer;
