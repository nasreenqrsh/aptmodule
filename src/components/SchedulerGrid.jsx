import React, { useState, useEffect } from 'react';
import AppointmentDrawer from './appointmentdrawer/AppointmentDrawer';
import AppointmentDetails from './Sidebar';

const fetchData = async (url, payload = null) => {
  const options = payload
    ? {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    : {};
  const response = await fetch(url, options);
  if (!response.ok) throw new Error('Fetch error');
  return await response.json();
};

const normalizeTime = (timeStr) => {
  if (!timeStr) return '';
  const date = new Date(`1970-01-01T${convertTo24Hour(timeStr)}`);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
};

const convertTo24Hour = (time12h) => {
  const [time, modifier] = time12h.trim().split(' ');
  let [hours, minutes] = time.split(':');
  if (modifier === 'PM' && hours !== '12') hours = String(parseInt(hours) + 12);
  if (modifier === 'AM' && hours === '12') hours = '00';
  return `${hours.padStart(2, '0')}:${minutes}`;
};

const AppointmentScheduler = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editAppointment, setEditAppointment] = useState(null);

const openEditDrawer = (appt) => {
  setEditAppointment(appt);
  setIsDrawerOpen(true);
};


  const timeSlots = [...Array(157).keys()].map(i => {
    const date = new Date(2000, 0, 1, 10, i * 5);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  });

  const fetchDoctors = async () => {
    try {
      const data = await fetchData('https://mocki.io/v1/1cf6b4f2-e470-48e8-a013-3ffd7b3e6f6f');
      const doctorNames = data.map((doc) => doc.Name);
      setDoctors(doctorNames);
    } catch (error) {
      console.error('Error loading doctors:', error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const data = await fetchData('/AppointmentDetailsHandler.ashx');
      setAppointments(data);
    } catch (error) {
      console.error('Error loading appointments:', error);
    }
  };

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    const payload = {
      appointmentdate: formattedDate,
      searchtext: '',
    };
    fetchData('https://mocki.io/v1/1191ce9b-b8e7-47c3-9545-a1bd22dfbb1d', payload)
      .then((data) => {
        console.log('Initial data sent successfully:', data);
      })
      .catch((error) => {
        console.error('Error sending initial data:', error);
      });
  }, []);

  useEffect(() => {
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
      case 'booked': return 'bked';
      case 'confirmed': return 'cnfrmd';
      case 'completed': return 'donest';
      case 'active': return 'active';
      case 'checked in': return 'chkinst';
      case 'no show': return 'noshow';
      case 'cancelled': return 'cancelled';
      default: return '';
    }
  };

  const renderAppointments = (time, doctor) => {
    return appointments
      .filter(
        (appt) =>
          normalizeTime(appt.starttime) === normalizeTime(time) &&
          appt.doctorname?.trim().toLowerCase() === doctor.trim().toLowerCase()
      )
      .map((appt, idx) => {
        const rawDuration = appt.duration || '';
        const duration = parseInt(rawDuration.replace(/\D/g, ''), 10) || 5;
        const width = duration * 14;
        const statusClass = getStatusClass(appt.status || '');
        const extraClass = duration === 5 ? 'smllappt' : '';

        return (
          <div
            key={idx}
            className={`appcell ${statusClass} ${extraClass}`}
            style={{ width: `${width}px`, minWidth: '50px' }}
          >
            <div className="ptflx">
              <div className="ptnm">{appt.fullname}</div>
              <div className={`aptst ${statusClass}`}>
                <span></span>
                {appt.status || 'Booked'}
              </div>
            </div>
            <div className="apptype">
              <strong>{appt.servicecode}</strong>
              <br />
            </div>
            <span
              className="expopup"
              onClick={() => {
                setSelectedAppointment(appt);
                setIsSidebarOpen(true);
              }}
            >
              <img src={`${import.meta.env.BASE_URL}images/expand.svg`} alt="Expand" />
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
                <div key={index} className="lfttm tblcell">
                  {doctor}
                </div>
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
            onEditAppointment={openEditDrawer}

        />
      )}

      {isDrawerOpen && (
        <AppointmentDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          timeSlot={selectedTimeSlot}
          doctor={selectedDoctor}
          onSave={handleAppointmentSave}
          onRefreshAppointments={fetchAppointments}
           editAppointment={editAppointment}
        />
      )}
    </section>
  );
};

export default AppointmentScheduler;
