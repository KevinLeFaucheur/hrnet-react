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

const yearsRange = (minYear, maxYear) => Array.from({ length: (maxYear - minYear + 1) }, (_, i) => minYear + i);

const daysCount = (year, month) => new Date(year, month, 0).getDate();

const weekCount = (daysCount) => {
  return Math.ceil(daysCount / 7);
}

const dataBuilder = (date) => {
  /**
   * start index
   * end index
   * previous month count
   * weekcount
   */
  let days = daysCount(date.getFullYear(), date.getMonth() + 1, 0);
  let start = new Date(date.getFullYear(), date.getMonth()).getDay();
  let end = start + days;
  let prevCount = daysCount(date.getFullYear(), date.getMonth(), 0);
  let weeks = weekCount(start + days);
  let length = weeks * 7;
  let arr = [...Array(length)];

  for (let i = 0; i < length; i++) {
    if(i < start) {
      arr[i] = prevCount - start + i + 1;
    } else if(i < end) {
      arr[i] = i - start + 1;
    } else {
      arr[i] = i - days - start + 1;
    }
  }

  console.log(arr, weeks);

  let weeksArr = [];
  for (let i = 0; i < weeks; i++) {
    weeksArr[i] = arr.slice(i * 7 , (i+1) * 7);
  }
  return weeksArr;
}

export const DatePicker = () => {
  const today = new Date(Date.now());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDay, setSelectedDay] = useState(today);
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());

  console.log(selectedMonth, selectedYear);

  const handleInputClick = (e) => {
    e.stopPropagation();
    setShowDatePicker(!showDatePicker);
  }

  const handleClick = (i) => {
    if (selectedMonth + i < 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else if(selectedMonth + i > 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else setSelectedMonth(selectedMonth + i);
  }

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  }

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
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
          <button onClick={() => setSelectedDay(today.getDay())} className="datepicker-today"><Home /></button>

          {/* {<div className="datepicker-month">{months[selectedMonth]}<SmallArrow /></div>} */}
          <select 
            className="datepicker-month" 
            value={months[selectedMonth]} 
            onChange={handleMonthChange}
            >
              {months.map((_, i) => <option key={months[i]} value={months[i]}>{months[i]}</option>)}
          </select>

          {/* {<div className="datepicker-year">{selectedYear}<SmallArrow /></div>} */}
          <select 
            className="datepicker-year" 
            value={selectedYear} 
            onChange={handleYearChange}
            >
              {yearsRange(1950, 2050).map(year => <option key={year} value={year}>{year}</option>)}
          </select>

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
              {dataBuilder(selectedDay).map((week, i) => 
                <tr key={`Week-${i+1}`}>
                  {week.map((day) => 
                    <td key={day}>{day}</td>
                  )}
                </tr>
              )}
            </tbody>
          </table>
        </footer>      
      </div>}
    </div>
  )
}
