import React, { useState } from "react";
import CustomerForm from "./CustomerForm";
import ServiceRequestForm from "./ServiceRequestForm";
import ServiceList from "./ServiceList";
import FormFooter from "./FormFooter";

const createDataHandler = async (payload) => {
  console.log("Sending payload:", payload);
  try {
    const response = await fetch("/SaveAppointmentHandler.ashx", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok || data.success === false) {
      console.error("Server Error:", data.message || "Unknown error");
      alert(`❌ Error: ${data.message || 'Failed to submit data'}`);
      return { success: false, message: data.message || "Submission failed" };
    }

    alert("✅ Appointment submitted successfully!");
    return data;
  } catch (error) {
    console.error("createDataHandler error:", error.message);
    alert(`❌ Network or server error: ${error.message}`);
    return { success: false, message: error.message };
  }
};


const ServiceBookingContainer = ({ prefillData, doctor, timeSlot, onClose }) => {
  const [customerFormData, setCustomerFormData] = useState(null);
  const [serviceList, setServiceList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resetKey, setResetKey] = useState(Date.now());
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [lastEndTime, setLastEndTime] = useState("10:00 AM");
const handleCancel = () => {
  setServiceList([]);
  setCustomerFormData(null);
  setResetKey(Date.now());
  setEditingIndex(null);
  setEditingService(null);
  setLastEndTime("10:00 AM");

  onClose?.(); // ✅ close drawer via parent if provided
};

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
    console.log(customerFormData)
  if (!customerFormData || serviceList.length === 0) {
    alert("Missing customer or service data.");
    return;
  }

  

  const payload = serviceList.map((entry, index) => ({
    CustID: customerFormData.custid || " ",
    AppointmentDate: new Date().toISOString().split("T")[0], // today as example
    StartTime: entry.service.start,
    EndTime: entry.service.end,
    Duration: entry.service.duration,
    LineNo: index + 1,
    ServiceCode: entry.service.servicecode, // or actual code if available
    Practioner: entry.service.practitioner,
    Preference: entry.service.preference,
    Notes: entry.service.note,
    Amount: entry.service.amount,
    Room:entry.service.room
  }));

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
           selectedDoctor={doctor}     
          selectedTime={timeSlot} 
        />

        <ServiceList
          data={serviceList}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>

      <div style={{ marginTop: "1rem", display: "flex", gap:"15px", justifyContent: "center", borderTop:"1px solid #ccc", paddingTop: "20px" }}>
        <button className="submitbtn editbtn" onClick={handleSubmitAll}>
          Save Appointment
        </button>

        <button className="restbtn" onClick={handleCancel}>
    Cancel
  </button>
        
      </div>
    </>
  );
};

export default ServiceBookingContainer;
