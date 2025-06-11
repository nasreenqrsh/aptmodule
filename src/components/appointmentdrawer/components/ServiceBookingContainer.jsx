import React, { useEffect, useState } from "react";
import CustomerForm from "./CustomerForm";
import ServiceRequestForm from "./ServiceRequestForm";
import ServiceList from "./ServiceList";
import FormFooter from "./FormFooter";
import Toast from "../../Toast";

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
      return { success: false, message: data.message || "Submission failed" };
    }

    return { success: true, message: "Appointment submitted successfully!" };
  } catch (error) {
    console.error("createDataHandler error:", error.message);
    return { success: false, message: error.message };
  }
};

const ServiceBookingContainer = ({
  prefillData,
  doctor,
  timeSlot,
  onClose,
  onRefreshAppointments
}) => {
  const [customerData, setCustomerData] = useState({});
  const [serviceList, setServiceList] = useState([]);
  const [notes, setNotes] = useState("");
  const [toast, setToast] = useState(null);

  // ✅ Prefill logic - triggers only when drawer opens with edit data
  useEffect(() => {
    if (prefillData?.appointmentId) {
      console.log("Applying prefill data", prefillData);

      setCustomerData({
        fullname: prefillData.fullname || "",
        mobile: prefillData.number || "",
        custid: prefillData.custid || "",
        gender: prefillData.gender || "",
        email: prefillData.email || "",
        nationalityid: prefillData.nationalityid || "",
        nationalitynumber: prefillData.nationalitynumber || "",
      });

      setServiceList([
        {
          servicename: prefillData.servicename || "",
          servicecode: prefillData.servicecode || "",
          duration: prefillData.duration || "5 mins",
        },
      ]);

      setNotes(prefillData.notes || "");
    } else {
      // New appointment – reset form
      setCustomerData({});
      setServiceList([]);
      setNotes("");
    }
  }, [prefillData]);

  const handleSubmit = async () => {
    if (!customerData || !customerData.custid || serviceList.length === 0) {
      setToast({ message: "Please fill in all required fields", type: "error" });
      return;
    }

    const payload = {
      appointmentid: prefillData?.appointmentId || undefined,
      custid: customerData.custid,
      fullname: customerData.fullname,
      number: customerData.mobile,
      email: customerData.email,
      gender: customerData.gender,
      nationalityid: customerData.nationalityid,
      nationalitynumber: customerData.nationalitynumber,
      doctorid: doctor?.id || "",
      doctorname: doctor,
      appointmentdate: new Date().toISOString().split("T")[0],
      starttime: timeSlot,
      endtime: "", // optional
      duration: serviceList[0].duration,
      servicecode: serviceList[0].servicecode,
      servicename: serviceList[0].servicename,
      notes: notes,
      status: prefillData?.status || "Booked",
      operation: prefillData ? "UPDATE" : "CREATE",
    };

    const result = await createDataHandler(payload);
    setToast({ message: result.message, type: result.success ? "success" : "error" });

    if (result.success) {
      setTimeout(() => {
        onRefreshAppointments?.();
        onClose?.();
      }, 1500);
    }
  };

  return (
    <div className="service-booking-container">
      <CustomerForm formData={customerData} setFormData={setCustomerData} />
      <ServiceRequestForm serviceList={serviceList} setServiceList={setServiceList} />
      <FormFooter notes={notes} setNotes={setNotes} />
      <ServiceList services={serviceList} setServices={setServiceList} />
      <button className="submitbtn" onClick={handleSubmit}>
        {prefillData ? "Update Appointment" : "Save Appointment"}
      </button>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default ServiceBookingContainer;
