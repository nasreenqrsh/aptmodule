import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AppointmentHeader from "./components/AppointmentHeader";
import AddCustomerModal from "./components/AddCustomerModal"; 
import AppointmentDrawer from "./components/appointmentdrawer/AppointmentDrawer";
import FilterHeader from "./components/FilterHeader";
import SchedulerGrid from "./components/SchedulerGrid";
import AppointmentDetails from "./components/Sidebar";
import PaymentPage from "./pages/PaymentPage";

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const appointment = {
    customerName: "Jane Doe",
    customerPhone: "+966-123456789",
    customerId: "ABC123",
    status: "Booked",
    dateTime: "29/05/2025, 10:00 AM - 10:30 AM",
    services: "PRP, Laser, Hair Fall Consultation",
    notes: "Lorem ipsum dolor sit amet.",
    id:"app123"
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleBookAppointment = (customer) => {
    setSelectedCustomer(customer);
    setDrawerOpen(true);
  };

  return (
    <Router basename="/ReactClient">

      <Routes>
        {/* Default Scheduler + Drawer UI */}
        <Route path="/" element={
          <>
            <AppointmentHeader
              onAddAppointment={handleBookAppointment}
              onAddCustomer={() => setShowAddCustomer(true)}
            />
            <FilterHeader />
            <SchedulerGrid />

            <AppointmentDrawer
              isOpen={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              customer={selectedCustomer}
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
        } />

        {/* Payment Page Route */}
        <Route path="/payment-page" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
};

export default App;
