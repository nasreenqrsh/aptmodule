import React, { useState } from "react";
import CustomerForm from "./CustomerForm";
import ServiceRequestForm from "./ServiceRequestForm";
import ServiceList from "./ServiceList";
import FormFooter from "./FormFooter";

const createDataHandler = async (payload) => {
  console.log(payload);
  try {
    const response = await fetch("https://mocki.io/v1/fe1da8d7-3afa-4866-bb24-553db358f743", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error("Failed to submit data");
    return await response.json();
  } catch (error) {
    console.error("createDataHandler error:", error);
    throw error;
  }
};

const ServiceBookingContainer = ({ prefillData }) => {
  const [customerFormData, setCustomerFormData] = useState(null);
  const [serviceList, setServiceList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resetKey, setResetKey] = useState(Date.now());
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [lastEndTime, setLastEndTime] = useState("10:00 AM");

  const handleAddService = (serviceData) => {
    if (!customerFormData) {
      alert("Customer data is missing.");
      return;
    }

    const combinedData = { customer: customerFormData, service: serviceData };

    if (editingIndex !== null) {
      const updatedList = [...serviceList];
      updatedList[editingIndex] = combinedData;
      setServiceList(updatedList);
      setEditingIndex(null);
      setEditingService(null);
    } else {
      setServiceList((prev) => [...prev, combinedData]);
    }

    setLastEndTime(serviceData.end); // ⏱ update next start time
    setResetKey(Date.now());
  };

  const handleDelete = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this service?");
    if (!confirmDelete) return;
    setServiceList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    const entry = serviceList[index];
    setEditingService(entry.service);
    setEditingIndex(index);
    setResetKey(Date.now());
  };

  const handleSubmitAll = async () => {
    if (!customerFormData || serviceList.length === 0) {
      alert("Missing customer or service data.");
      return;
    }

    const payload = {
      customer: customerFormData,
      services: serviceList.map((entry) => entry.service),
    };

    try {
      const result = await createDataHandler(payload);
      alert("✅ Data submitted successfully!");
      console.log("Response:", result);
      setServiceList([]);
    } catch (error) {
      alert("❌ Submission failed. Check console for details.");
    }
  };

  return (
    <>
      <div className="service-booking apptfrmflx">
        <CustomerForm
          prefillData={prefillData}
          setCustomerData={setCustomerFormData}
          setLoading={setLoading}
          customerFormData={customerFormData}
          setCustomerFormData={setCustomerFormData}
        />

        <ServiceRequestForm
          onAddService={handleAddService}
          resetKey={resetKey}
          initialData={editingService}
          lastEndTime={lastEndTime}
        />

        <ServiceList
          data={serviceList}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>

      <div style={{ marginTop: "1rem" }}>
        <button className="submitbtn" onClick={handleSubmitAll}>
          Submit All Services
        </button>
      </div>
    </>
  );
};

export default ServiceBookingContainer;
