import React,{useState} from 'react'
import Calendar from 'react-calendar';

import './leave.css';


const Attandance = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());


const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <div>
      <h1>Your Attandance</h1>
      <div className="calendar-container">
        <h2>Calendar</h2>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          prevLabel="Previous Month"
          nextLabel="Next Month"
          prev2Label={null} // Hide double previous arrow
          next2Label={null} // Hide double next arrow
          calendarType="US" // Set the calendar type (US or ISO 8601)
        />
      </div>
    </div>
  )
}

export default Attandance
