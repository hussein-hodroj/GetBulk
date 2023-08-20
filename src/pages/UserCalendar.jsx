import React from 'react'
import './Reservations.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import TrainerDashboard from './TrainerDashboard.js';
import { useParams } from 'react-router-dom';
const localizer = momentLocalizer(moment);

function UserCalendar() {
    // const {UserCalendar } = usePage().props
    const [schedule, setSchedule] = useState([]);
    const { trainerId } = useParams(); // Get the trainerId from the URL parameter
  
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
      axios
        .get(`http://localhost:8000/schedule/getTrainerSchedule/${trainerId}`)
        .then((response) => setSchedule(response.data))
        .catch((error) => console.log(error));
    }, [trainerId]);

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
          <h2 className="text-yellow-500"> {`${selectedEvent.tname}`}</h2>

          <p >
            <strong className="text-yellow-500">Date:</strong>{' '}
            {moment(selectedEvent.formattedDate).format('YYYY-MM-DD')}
          </p>
          <p >
            <strong className="text-yellow-500">Reservation Time:</strong> {selectedEvent.Timeschedule}
          </p>
           <p >
            <strong className="text-yellow-500">Phone Number:</strong> {selectedEvent.tphonenumber}
          </p>
          <p >
            <strong className="text-yellow-500">Email:</strong> {selectedEvent.temail}
          </p>
          <p >
            <strong className="text-yellow-500">Address:</strong> {selectedEvent.taddress}
          </p>
          
        </div>
      </div>
      </div></div></div></div>
    );
  }

  
   

  function tileContent({ date, view }) {
    if (view === 'month') {
        const formattedDate = moment(date).format('D MMM');
        const eventData = schedule.find(event => moment(event.date).format('D MMM') === formattedDate);
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
  events={schedule}
  startAccessor={(event) =>
    moment(`${event.date} ${event.Timeschedule}`).toDate()
  }
  endAccessor={(event) =>
    moment(`${event.date} ${event.Timeschedule}`)
      .add(60, "minutes") // Change this from 30 to 60 minutes
      .toDate()
  }
  titleAccessor={(event) => `${event.tname}`}
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

export default UserCalendar
