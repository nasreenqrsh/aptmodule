import React, { useState } from "react";
import AppointmentHeader from "./components/AppointmentHeader";
import AddCustomerModal from "./components/AddCustomerModal"; 
import AppointmentDrawer from "./components/appointmentdrawer/AppointmentDrawer";
import FilterHeader from "./components/FilterHeader";
import SchedulerGrid from "./components/SchedulerGrid";
import AppointmentDetails from "./components/Sidebar";

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null); //  New state

  const appointment = {
    customerName: "Jane Doe",
    customerPhone: "+966-123456789",
    customerId: "ABC123",
    status: "Booked",
    dateTime: "29/05/2025, 10:00 AM - 10:30 AM",
    services: "PRP, Laser, Hair Fall Consultation",
    notes: "Lorem ipsum dolor sit amet.",
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleBookAppointment = (customer) => {
    setSelectedCustomer(customer); //  Set selected customer
    setDrawerOpen(true);           //  Open appointment drawer
  };

  return (
    <>
      <AppointmentHeader
        onAddAppointment={handleBookAppointment} //  Handle book with data
        onAddCustomer={() => setShowAddCustomer(true)}
      />

      <FilterHeader />
      <SchedulerGrid />

      <AppointmentDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        customer={selectedCustomer} //  Pass customer prop
      />

      <button onClick={toggleDetails}>Show Appointment Details</button>

      {showDetails && (
        <AppointmentDetails
          appointment={appointment}
          onClose={toggleDetails}
        />
      )}

      {showAddCustomer && (
        <AddCustomerModal onClose={() => setShowAddCustomer(false)} />
      )}
    </>
  );
};

export default App;
