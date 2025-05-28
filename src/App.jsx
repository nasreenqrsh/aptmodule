import React, { useState } from "react";
import AppointmentHeader from "./components/AppointmentHeader";
import AddCustomerModal from "./components/AddCustomerModal"; 
import AppointmentDrawer from "./components/appointmentdrawer/AppointmentDrawer"
import FilterHeader from "./components/FilterHeader";
import SchedulerGrid from "./components/SchedulerGrid";

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showAddCustomer, setShowAddCustomer] = useState(false); 

  return (
    <>
      <AppointmentHeader
        onAddAppointment={() => setDrawerOpen(true)}
        onAddCustomer={() => setShowAddCustomer(true)} 
      />
      <FilterHeader />
    <SchedulerGrid />
      
      <AppointmentDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      
      {showAddCustomer && (
        <AddCustomerModal onClose={() => setShowAddCustomer(false)} />
      )}
    </>
  );
};

export default App;