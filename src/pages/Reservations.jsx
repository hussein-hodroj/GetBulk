import React from 'react'
import './Reservations.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import TrainerDashboard from './TrainerDashboard.js';
import jwt_decode from 'jwt-decode';


const localizer = momentLocalizer(moment);


function Reservations() {
    // const { reservations } = usePage().props
    const [booking, setBooking] = useState([]);
    const [trainerId, setTrainerId] = useState('');

  
    const [selectedEvent, setSelectedEvent] = useState(null);
    useEffect(() => {
      const token = localStorage.getItem('token');
      const decodedToken = jwt_decode(token);
      const id = decodedToken.id;

    console.log("decodedToken=>",id);
     
      axios.get(`http://localhost:8000/user/trainers/${id}`) // Adjust the API endpoint
        .then((response) => {
          const userData = response.data;
          
          if (userData) {
            setTrainerId(id); // Update user's id
         
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }, []);

    function eventPropGetter(event, start, end, isSelected) {
      // Customize the event's background color based on your requirements
  
      
       var style=  {
          backgroundColor:'yellow',
          borderRadius: '5px',
          opacity: 0.8,
          color: 'white',
          border: 'none',
          display: 'block',
        }; 
       return{
        style : style
       }
    }
   

    useEffect(() => {
      axios
        .get(`http://localhost:8000/booking/${trainerId}`)
        .then((response) => setBooking(response.data))
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
          <h2 className="text-yellow-500"> {`${selectedEvent.uname}`}</h2>  <br/>
          <p >
            <strong className="text-yellow-500">Trainer:</strong> {selectedEvent.tname }
          </p>
          <p >
            <strong className="text-yellow-500">Date:</strong>{' '}
            {moment(selectedEvent.formattedDate).format('YYYY-MM-DD')}
          </p>
          <p >
            <strong className="text-yellow-500">Reservation Time:</strong> {selectedEvent.Timeschedule}
          </p>
           <p >
            <strong className="text-yellow-500">Phone Number:</strong> {selectedEvent.uphonenumber}
          </p>
          <p >
            <strong className="text-yellow-500">Email:</strong> {selectedEvent.uemail}
          </p>
          <p >
            <strong className="text-yellow-500">Address:</strong> {selectedEvent.uaddress}
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
  eventPropGetter={(booking)=>{return{style:{backgroundColor:'#ebab21', color: 'black',
}}}}

/>

      </div>
       {getEventPopup()}
    </div>
  </div></div></div></div>
  )
}

export default Reservations
