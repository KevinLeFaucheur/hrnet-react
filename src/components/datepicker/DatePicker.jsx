import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Home, Calendar } from "./assets/Icons"
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

const daysCount = (year, month) => new Date(year, month + 1, 0).getDate();

const weekCount = (daysCount) => {
  return Math.ceil(daysCount / 7);
}

const dataBuilder = (date) => {

  let days = daysCount(date.getFullYear(), date.getMonth(), 0);
  let start = new Date(date.getFullYear(), date.getMonth()).getDay();
  let end = start + days;
  let prevMonthYear = date.getMonth() === 0 ? date.getFullYear() - 1 : date.getFullYear();
  let prevMonth = date.getMonth() === 0 ? 11 : date.getMonth() - 1;
  let nextMonth = date.getMonth() === 11 ? 0 : date.getMonth() + 1;
  let prevCount = daysCount(prevMonthYear, prevMonth, 0);
  let weeks = weekCount(start + days);
  let length = weeks * 7;
  let arr = [...Array(length)];

  for (let i = 0; i < length; i++) {
    if(i < start) {
      arr[i] = new Date(prevMonthYear, prevMonth, prevCount - start + i + 1);
    } else if(i < end) {
      arr[i] = new Date(date.getFullYear(), date.getMonth(), i - start + 1);
    } else {
      arr[i] = new Date(date.getFullYear(), nextMonth, i - days - start + 1);
    }
  }

  let weeksArr = [];
  for (let i = 0; i < weeks; i++) {
    weeksArr[i] = arr.slice(i * 7 , (i+1) * 7);
  }
  return weeksArr;
}

const selectClass = (date1, date2) => {
  if (date1.getFullYear() === date2.getFullYear()
    && date1.getMonth() === date2.getMonth()
    && date1.getDate() === date2.getDate()) {
    return 'selected';
  }
  if(date1.getMonth() !== date2.getMonth()) {
    return 'greyed';
  }
}

/**
 * TODO:
 * - Accessibility
 * - Tab focus
 * - max-heigth of options within datepicker
 * - Date icon
 */


export const DatePicker = ({ id, onChange }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  const [selectedDate, setSelectedDate] = useState(new Date(Date.now()));
  const [selectedDay, setSelectedDay] = useState(selectedDate.getDate());
  const [selectedMonth, setSelectedMonth] = useState(selectedDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(selectedDate.getFullYear());
  const [data, setData] = useState([]);

  const inputRef = useRef('');

  useEffect(() => {
    const date = new Date(selectedYear, selectedMonth, selectedDay);

    setData(dataBuilder(date));
    inputRef.current.innerText = date.toLocaleDateString();   
    onChange(date.toLocaleDateString());
    
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);

  }, [selectedDay, selectedMonth, selectedYear])

  const handleInputClick = (e) => {
    e.stopPropagation();
    setShowDatePicker(!showDatePicker);
  }

  const close = (e) => {
    if (e.target.contains(document.querySelector(`#${id}-container`))) {
      setShowDatePicker(false);
    }
  }

  const handleClick = (i) => {
    let newYear, newMonth;
    if (parseInt(selectedMonth) + i < 0) {
      newMonth = 11;
      newYear = parseInt(selectedYear) - 1;
      
    } else if(parseInt(selectedMonth) + i > 11) {
      newMonth = 0;
      newYear = parseInt(selectedYear) + 1;
      
    } else {
      newMonth = parseInt(selectedMonth) + i;
      newYear = selectedYear;
    }
    
    setSelectedYear(newYear);
    setSelectedMonth(newMonth);
    setSelectedDate(new Date(newYear, newMonth, selectedDay));
  }

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    setSelectedDate(new Date(selectedYear, selectedMonth, selectedDay));
  }

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setSelectedDate(new Date(selectedYear, selectedMonth, selectedDay));
  }

  const handleClickToday = () => {
    const today = new Date(Date.now());
    setSelectedMonth(today.getMonth());
    setSelectedYear(today.getFullYear());
    setSelectedDay(today.getDate());
    setSelectedDate(today);
  }

  const handleDateChange = (e) => {

    let tds = document.querySelectorAll(`#${id}-menu td`);
    tds.forEach(td => td.classList.remove('selected'));
    e.target.classList.add('selected');

    setSelectedMonth(e.target.dataset.month);
    setSelectedYear(e.target.dataset.year);
    setSelectedDay(e.target.dataset.day);
    setSelectedDate(new Date(selectedYear, selectedMonth, selectedDay));
    
    setShowDatePicker(!showDatePicker);
  }

  return (
    <div id={`${id}-container`} className="datepicker-container">  
      <div className="datepicker-input" onClick={handleInputClick}>
        <div ref={inputRef} className="select-selected-value">DD/MM/YY</div>
        <div className="select-tools">
          <div className="select-tool">
            <Calendar />
          </div>
        </div>
      </div>  
      
      {showDatePicker && <div id={`${id}-menu`} className="datepicker-menu">

        <nav className="datepicker-nav">
          <button onClick={() => handleClick(-1)} className="datepicker-prev"><ArrowLeft /></button>
          <button onClick={handleClickToday} className="datepicker-today"><Home /></button>

          {/* {<div className="datepicker-month">{months[selectedMonth]}<SmallArrow /></div>} */}
          <select 
            className="datepicker-month" 
            value={selectedMonth} 
            onChange={handleMonthChange}
            >
              { months.map((_, i) => <option key={months[i]} value={i}>{months[i]}</option>) }
          </select>

          {/* {<div className="datepicker-year">{selectedYear}<SmallArrow /></div>} */}
          <select 
            className="datepicker-year" 
            value={selectedYear} 
            onChange={handleYearChange}
            >
              { yearsRange(1950, 2050).map(year => <option key={year} value={year}>{year}</option>) }
          </select>

          <button onClick={() => handleClick(1)} className="datepicker-next"><ArrowRight /></button>
        </nav>
        <div className="datepicker-body">
          <table>
            <thead>
              <tr>
                { weekdays.map(day => <th key={day} >{day.slice(0, 3)}</th>) }
              </tr>
            </thead>
            <tbody>
              { data.map((week, i) => 
                <tr key={`Week-${i + 1}`}>
                  { week.map(date => 
                    
                    <td 
                      className={selectClass(new Date(selectedYear, selectedMonth, selectedDay), date)}
                      data-year={date.getFullYear()} data-month={date.getMonth()} data-day={date.getDate()} 
                      key={date.toLocaleDateString()} 
                      onClick={(e) => handleDateChange(e)}
                      >
                        {date.getDate()}
                    </td>) }
                </tr>
              )}
            </tbody>
          </table>
        </div>      

        <footer className="datepicker-footer"></footer>  
      </div>}
    </div>
  )
}
