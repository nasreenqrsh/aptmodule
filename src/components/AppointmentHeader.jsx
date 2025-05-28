import React, {useState} from "react";
import "../index.css";

const AppointmentHeader = ({ onAddAppointment, onAddCustomer }) => {
      const [showAddCustomer, setShowAddCustomer] = useState(false);

  return (
    <header className="appthdr">
      <div className="flx-spcbt">
        <div style={{ width: "300px" }}></div>

        <div className="datepkrdiv">
          <input type="date" id="date" />
        </div>

        <div className="actbtnsdiv">
          <div
            className="apptimg tooltip"
            data-tooltip="Add Appointment"
            data-tooltip-pos="down"
            onClick={onAddAppointment} 
          >
            <img src="/images/addappt.svg" alt="Add Appointment" />
          </div>

          <div
            className="apptstgs tooltip"
            data-tooltip="Settings"
            data-tooltip-pos="down"
          >
            <img src="/images/settings.svg" alt="Settings" />
          </div>

          <span
            className="apptstgs tooltip"
            data-tooltip="Add Customer"
            data-tooltip-pos="down"
            onClick={onAddCustomer}
          >
            <img src="/images/addcustwhite.svg" alt="Add Customer" />
          </span>

          <div
            className="apptstgs tooltip"
            data-tooltip="View Reports"
            data-tooltip-pos="down"
          >
            <img src="/images/reports.svg" alt="View Reports" />
          </div>

          <div className="search-container">
            <input type="text" id="fruit" placeholder="Search..." />
            <div className="suggestionssrc">
              <ul></ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppointmentHeader;
