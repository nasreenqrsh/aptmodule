import React, { useState, useEffect } from 'react';
import AppointmentDrawer from './appointmentdrawer/AppointmentDrawer';
import AppointmentDetails from './Sidebar';

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Fetch error");
  return await response.json();
};

const createDataHandler = async (payload) => {
  try {
    const response = await fetch("/GetAppointmentsHandler.ashx", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Data sent successfully:", data);
    } else {
      alert(`Failed to send data: ${data.message || "Unknown error"}`);
    }
  } catch (error) {
    alert("An error occurred. Please try again later.");
    console.error(error);
  }
};

const AppointmentScheduler = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

 const timeSlots = ['10:00 AM', '10:05 AM', '10:10 AM', '10:15 AM', '10:20 AM', '10:25 AM', '10:30 AM',
    '10:35 AM', '10:40 AM', '10:45 AM', '10:50 AM', '10:55 AM', '11:00 AM', '11:05 AM', 
    '11:10 AM', '11:15 AM', '11:20 AM', '11:25 AM', '11:30 AM', '11:35 AM', '11:40 AM', 
    '11:45 AM', '11:50 AM', '11:55 AM', '12:00 PM', '12:05 PM', '12:10 PM', '12:15 PM', 
    '12:20 PM', '12:25 PM', '12:30 PM', '12:35 PM', '12:40 PM', '12:45 PM', '12:50 PM', 
    '12:55 PM', '01:00 PM', '01:05 PM', '01:10 PM', '01:15 PM', '01:20 PM', '01:25 PM', 
    '01:30 PM', '01:35 PM', '01:40 PM', '01:45 PM', '01:50 PM', '01:55 PM', '02:00 PM', 
    '02:05 PM', '02:10 PM', '02:15 PM', '02:20 PM', '02:25 PM', '02:30 PM', '02:35 PM', 
    '02:40 PM', '02:45 PM', '02:50 PM', '02:55 PM', '03:00 PM', '03:05 PM', '03:10 PM', 
    '03:15 PM', '03:20 PM', '03:25 PM', '03:30 PM', '03:35 PM', '03:40 PM', '03:45 PM', 
    '03:50 PM', '03:55 PM', '04:00 PM', '04:05 PM', '04:10 PM', '04:15 PM', '04:20 PM', 
    '04:25 PM', '04:30 PM', '04:35 PM', '04:40 PM', '04:45 PM', '04:50 PM', '04:55 PM', 
    '05:00 PM', '05:05 PM', '05:10 PM', '05:15 PM', '05:20 PM', '05:25 PM', '05:30 PM', 
    '05:35 PM', '05:40 PM', '05:45 PM', '05:50 PM', '05:55 PM', '06:00 PM', '06:05 PM', 
    '06:10 PM', '06:15 PM', '06:20 PM', '06:25 PM', '06:30 PM', '06:35 PM', '06:40 PM', 
    '06:45 PM', '06:50 PM', '06:55 PM', '07:00 PM', '07:05 PM', '07:10 PM', '07:15 PM', 
    '07:20 PM', '07:25 PM', '07:30 PM', '07:35 PM', '07:40 PM', '07:45 PM', '07:50 PM', 
    '07:55 PM', '08:00 PM', '08:05 PM', '08:10 PM', '08:15 PM', '08:20 PM', '08:25 PM', 
    '08:30 PM', '08:35 PM', '08:40 PM', '08:45 PM', '08:50 PM', '08:55 PM', '09:00 PM', 
    '09:05 PM', '09:10 PM', '09:15 PM', '09:20 PM', '09:25 PM', '09:30 PM', '09:35 PM', 
    '09:40 PM', '09:45 PM', '09:50 PM', '09:55 PM', '10:00 PM'
  ];
useEffect(() => {
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0]; // Formats date as 'YYYY-MM-DD'
  const payload = {
    appointmentdate: formattedDate,
    searchtext: "", // Optional: Replace with actual search text if available
  };
  createDataHandler(payload);
}, []);
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await fetchData("https://mocki.io/v1/4519c325-7de2-432f-b770-096782070c7a");
        const doctorNames = data.map((doc) => doc.Name);
        setDoctors(doctorNames);
      } catch (error) {
        console.error("Error loading doctors:", error);
      }
    };

    const fetchAppointments = async () => {
      try {
        const data = await fetchData("https://mocki.io/v1/9fa85172-871a-452a-a862-62dc98c53126");
        setAppointments(data);
      } catch (error) {
        console.error("Error loading appointments:", error);
      }
    };

    fetchDoctors();
    fetchAppointments();
  }, []);

  const handleDoubleClick = (time, doctor) => {
    setSelectedTimeSlot(time);
    setSelectedDoctor(doctor);
    setIsDrawerOpen(true);
  };

  const handleAppointmentSave = (newAppt) => {
    setAppointments((prev) => [...prev, newAppt]);
    setIsDrawerOpen(false);
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "booked": return "bked";
      case "confirmed": return "cnfrmd";
      case "completed": return "donest";
      case "active": return "active";
      case "checked in": return "chkinst";
      case "no show": return "noshow";
      case "cancelled": return "cancelled";
      default: return "";
    }
  };

 const renderAppointments = (time, doctor) => {
  return appointments
    .filter(appt =>
      appt.StartTime?.trim().toLowerCase() === time.trim().toLowerCase() &&
      appt.Practioner?.trim().toLowerCase() === doctor.trim().toLowerCase()
    )
    .map((appt, idx) => {
      const rawDuration = appt.Duration || "";
      const duration = parseInt(rawDuration.replace(/\D/g, ""), 10) || 5;
      const width = duration * 14;
      const statusClass = getStatusClass(appt.status);

      const extraClass = duration === 5 ? "smllappt" : ""; // ✅ Add this line

      return (
        <div
          key={idx}
          className={`appcell ${statusClass} ${extraClass}`} // ✅ Apply class
          style={{ width: `${width}px`, minWidth: '50px' }}
        >
          <div className="ptflx">
            <div className="ptnm">{appt.firstname} {appt.lastname}</div>
            <div className={`aptst ${statusClass}`}>
              <span></span>
              {appt.status}
            </div>
          </div>

          <div className="apptype">
            <strong>{appt.ServiceCode}</strong><br />
          </div>

          <span className="expopup" onClick={() => {
            setSelectedAppointment(appt);
            setIsSidebarOpen(true);
          }}>
            <img
              src={`${import.meta.env.BASE_URL}images/expand.svg`}
              alt="Expand"
            />
          </span>
        </div>
      );
    });
};



  return (
    <section className="calsection">
      <div className="msttbl">
        <div className="lfthrdiv">
          <div className="lftcol sticky-header">
            <div className="lftmin lgndiv">
              <div className="lgndth">
                <div className="vertxt">Doctors</div>
                <div className="hrtxt">Time</div>
              </div>
            </div>
          </div>

          <div className="lftcol sticky-header">
            <div className="lftmin">
              {doctors.map((doctor, index) => (
                <div key={index} className="lfttm tblcell">{doctor}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="rgtcol">
          {timeSlots.map((time, index) => (
            <div className="cldrrow" key={index}>
              <div className="cldrttl clnctm sticky-time">{time}</div>
              {doctors.map((doctor, colIndex) => (
                <div
                  key={colIndex}
                  className="cldrcol clncoff"
                  onDoubleClick={() => handleDoubleClick(time, doctor)}
                >
                  {renderAppointments(time, doctor)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {isSidebarOpen && selectedAppointment && (
        <AppointmentDetails
          appointment={selectedAppointment}
          onClose={() => setIsSidebarOpen(false)}
        />
      )}

      {isDrawerOpen && (
        <AppointmentDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          timeSlot={selectedTimeSlot}
          doctor={selectedDoctor}
          onSave={handleAppointmentSave}
        />
      )}
    </section>
  );
};

export default AppointmentScheduler;
