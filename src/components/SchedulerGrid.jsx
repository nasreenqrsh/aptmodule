import React, { useState, useEffect } from 'react';
import AppointmentDrawer from './appointmentdrawer/AppointmentDrawer';
import AppointmentDetails from './Sidebar';
import FilterHeader from './FilterHeader';

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

const convertTo24Hour = (time12h) => {
  if (!time12h) return '';
  const [time, modifier] = time12h.trim().split(' ');
  let [hours, minutes] = time.split(':');
  if (modifier === 'PM' && hours !== '12') hours = String(parseInt(hours) + 12);
  if (modifier === 'AM' && hours === '12') hours = '00';
  return `${hours.padStart(2, '0')}:${minutes}`;
};

const formatToHHMM = (t) => {
  if (!t) return '';
  const d = new Date(`1970-01-01T${convertTo24Hour(t)}`);
  return d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0');
};

const AppointmentScheduler = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [statusCounts, setStatusCounts] = useState({});

  const timeSlots = [...Array(145)].map((_, i) => {
    const base = new Date(`1970-01-01T10:00:00`);
    base.setMinutes(base.getMinutes() + i * 5);
    return base.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        //const data = await fetchData('/LoadAllPractionerHandler.ashx');
        const data = await fetchData('https://mocki.io/v1/1cf6b4f2-e470-48e8-a013-3ffd7b3e6f6f');
        const doctorNames = data.map((doc) => doc.Name);
        setDoctors(doctorNames);
      } catch (error) {
        console.error('Error loading doctors:', error);
      }
    };

    const today = new Date().toISOString().split('T')[0];
    fetchDoctors();
    fetchAppointments(today);
  }, []);

  const fetchAppointments = async (date, cusID = null) => {
    try {
      const payload = {
        appointmentdate: date,
        searchtext: '',
        ...(cusID && { cusid: cusID }),
      };
     // const data = await fetchData('/AppointmentDetailsHandler.ashx', payload);
     const data = await fetchData('https://mocki.io/v1/8778a051-7aeb-4e00-b98d-83e8930f3c9d')
      console.log('Appointments response:', data);
      setAppointments(data);
    } catch (error) {
      console.error('Error loading appointments:', error);
    }
  };

  const handleDoubleClick = (time, doctor) => {
    setSelectedTimeSlot(time);
    setSelectedDoctor(doctor);
    setIsDrawerOpen(true);
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
  const normalizeTime = (t) => {
    if (!t) return '';
    const d = new Date(`1970-01-01T${convertTo24Hour(t.trim())}`);
    return d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0');
  };

  const normalizeDoctorName = (name) =>
    name?.replace(/^Dr\.?\s*/i, '').trim().toLowerCase();

  const slotTime = normalizeTime(time);
  const filteredAppointments = appointments.filter((appt) => {
    const apptTime = normalizeTime(appt.starttime);
    const doctorMatch =
      normalizeDoctorName(appt.doctorname) === normalizeDoctorName(doctor);
    return apptTime === slotTime && doctorMatch;
  });

  return filteredAppointments.map((appt, idx) => {
    const duration = parseInt(appt.duration?.replace(/\D/g, ''), 10) || 5;
    const width = duration * 14;
    const statusClass = getStatusClass(appt.status);
    const extraClass = duration === 5 ? 'smllappt' : '';

    return (
      <div
        key={appt.appointmentId || idx}
        className={`appcell ${statusClass} ${extraClass}`}
        style={{
          width: `${width}px`,
          minWidth: '50px',
          boxSizing: 'border-box',
        }}
      >
        <div className="ptflx">
          <div className="ptnm">{appt.fullname}</div>
          <div className={`aptst ${statusClass}`}>
            <span></span>
            {appt.status || 'Booked'}
          </div>
        </div>
        <div className="apptype">
          <strong>{appt.servicename}</strong>
        </div>
        <span
          className="expopup"
          onClick={() => {
            setSelectedAppointment(appt);
            setIsSidebarOpen(true);
          }}
        >
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
      <FilterHeader counts={statusCounts} />

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
                  style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}
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
          onRefreshAppointments={() => {
            const today = new Date().toISOString().split('T')[0];
            fetchAppointments(today);
          }}
        />
      )}
    </section>
  );
};

export default AppointmentScheduler;
