import React from 'react'
import './Reservations.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import TrainerDashboard from './TrainerDashboard.js';
const localizer = momentLocalizer(moment);

function Reservations() {
    // const { reservations } = usePage().props
    const [booking, setBooking] = useState([]);

  
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
      axios
        .get('http://localhost:8000/booking/allbooking')
        .then((response) => setBooking(response.data))
        .catch((error) => console.log(error));
    }, []);

  function handleEventSelect(event) {
    setSelectedEvent(event);
  }

  function handleClosePopup() {
    setSelectedEvent(null);
  }

  function getEventPopup() {
    if (!selectedEvent) {
      return null;
    }

    return (
      <div>
        <div className='flex'>
     {/* <TrainerDashboard/> */}
     <div className="h-full w-full ml-56 mt-14 mb-10 ">
      <div className="p-6 gap-4">
      <div className="event-popup-overlay">
        <div className="event-popup">
          <button className="close-btn" onClick={handleClosePopup}>
            &times;
          </button>
          <h2>{`${selectedEvent.uname}`}</h2>
          <p>
            <strong>Trainer:</strong> {selectedEvent.tname}
          </p>
          <p>
            <strong>Date:</strong>{' '}
            {moment(selectedEvent.formattedDate).format('YYYY-MM-DD')}
          </p>
          <p>
            <strong>Reservation Time:</strong> {selectedEvent.Timeschedule}
          </p>
           <p>
            <strong>Phone Number:</strong> {selectedEvent.uphonenumber}
          </p>
          <p>
            <strong>Email:</strong> {selectedEvent.uemail}
          </p>
          <p>
            <strong>Address:</strong> {selectedEvent.uaddress}
          </p>
          
        </div>
      </div>
      </div></div></div></div>
    );
  }

  
   

  function tileContent({ date, view }) {
    if (view === 'month') {
        const formattedDate = moment(date).format('D MMM');
        const eventData = booking.find(event => moment(event.date).format('D MMM') === formattedDate);
        return eventData ? eventData.someProperty : null;
    } else {
        return null;
    }
}

  return (
    <div>
        <div className='flex'>
     <TrainerDashboard/>
     <div className="h-full w-full ml-56 mt-14 mb-10 ">
      <div className="p-6 gap-4">
    <div className='desc-container'>
        <h1 className='title_home'>Reservations</h1>
        <div className='calendar_container'>
        <Calendar
  localizer={localizer}
  events={booking}
  startAccessor={(event) =>
    moment(`${event.date} ${event.Timeschedule}`).toDate()
  }
  endAccessor={(event) =>
    moment(`${event.date} ${event.Timeschedule}`)
      .add(60, "minutes") // Change this from 30 to 60 minutes
      .toDate()
  }
  titleAccessor={(event) => `${event.uname}`}
  step={15}
  tileContent={tileContent}
  style={{ height: '100vh' }}
  selectable={true}
  popup={true}
  onSelectEvent={handleEventSelect}
  views={['month', 'week', 'day', 'agenda']}
/>

      </div>
       {getEventPopup()}
    </div>
  </div></div></div></div>
  )
}

export default Reservations
