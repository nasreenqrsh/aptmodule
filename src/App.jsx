import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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


  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleBookAppointment = (customer) => {
    setSelectedCustomer(customer);
    setDrawerOpen(true);
  };

  return (
    <BrowserRouter basename="/Reactclient/">
  <Routes>
    <Route
      path="/"
      element={
        <>
          <AppointmentHeader
            onAddAppointment={handleBookAppointment}
            onAddCustomer={() => setShowAddCustomer(true)}
          />
          <SchedulerGrid />

          <AppointmentDrawer
            isOpen={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            customer={selectedCustomer}
          />



          {showAddCustomer && (
            <AddCustomerModal onClose={() => setShowAddCustomer(false)} />
          )}
        </>
      }
    />
    <Route path="/payment" element={<PaymentPage />} />
  </Routes>
</BrowserRouter>


      
  );
};

export default App;
