import { useState } from "react";
import { Icon } from "./assets/Icon";
import { ArrowLeft, ArrowRight, Home, SmallArrow } from "./assets/Icons"
import "./DatePicker.css";

const weekdays = [
  'Sunday', 'Monday', 'Tuesday', 
  'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

const months = [
  'January', 'February', 'Mars', 'April',
  'May', 'June', 'July', 'August', 
  'September', 'October', 'November', 'December'
];

const daysCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const weekCount = (date) => {
  return Math.ceil((daysCount[date.getMonth()] - date.getDay()) / 7);
}

export const DatePicker = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const today = new Date(Date.now());
  const [weekRows, setWeekRows] = useState(weekCount(today))

  const [weekDay, setWeekDay] = useState(today.getDay())
  const [month, setMonth] = useState(today.getMonth())
  const [year, setYear] = useState(today.getFullYear())

  const handleInputClick = (e) => {
    e.stopPropagation();
    setShowDatePicker(!showDatePicker);
  }

  const handleClick = (i) => {
    if (month + i < 0) {
      setMonth(11);
      setYear(year - 1);
    } else if(month + i > 11) {
      setMonth(0);
      setYear(year + 1);
    } else setMonth(month + i);
  }

  return (
    <div className="datepicker-container">
      <div className="datepicker-input" onClick={handleInputClick}>
        <div className="select-selected-value">DD/MM/YY</div>
        <div className="select-tools">
          <div className="select-tool">
            <Icon />
          </div>
        </div>
      </div>

      {showDatePicker && <div className="datepicker-menu">
        <nav className="datepicker-nav">
          <button onClick={() => handleClick(-1)} className="datepicker-prev"><ArrowLeft /></button>
          <button onClick={() => setWeekDay(today.getDay())} className="datepicker-today"><Home /></button>
          <div className="datepicker-month">{months[month]}<SmallArrow /></div>
          <div className="datepicker-year">{year}<SmallArrow /></div>
          <button onClick={() => handleClick(1)} className="datepicker-next"><ArrowRight /></button>
        </nav>
        <div className="datepicker-body">

        </div>      
        <footer className="datepicker-footer">
          <table>
            <thead>
              <tr>
                {weekdays.map(day => <th key={day} >{day.slice(0, 3)}</th>)}
              </tr>
            </thead>
            <tbody>
              {[...Array(weekRows)].map((week, i) => 
              <tr key={`Week-${i+1}`} >
                {[...Array(7)].map((day, j) => 
                  <td key={(i * 7) + j + 1}>{(i * 7) + j + 1}</td>
                )}
              </tr>)}
            </tbody>
          </table>
        </footer>      
      </div>}
    </div>
  )
}
