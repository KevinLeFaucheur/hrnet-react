import { createContext, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Home, Calendar } from "./assets/Icons";
import { internationalization as i18n } from "./internationalization";
import { daysCount, range, weekCount } from "./utils";
import { TimePicker } from "./TimePicker";
import "./index.css";

const dataBuilder = (date) => {

  let days = daysCount(date.getFullYear(), date.getMonth(), 0);
  let start = new Date(date.getFullYear(), date.getMonth()).getDay();
  let end = start + days;
  let prevMonthYear = date.getMonth() === 0 ? date.getFullYear() - 1 : date.getFullYear();
  let prevMonth = date.getMonth() === 0 ? 11 : date.getMonth() - 1;
  let nextMonth = date.getMonth() === 11 ? 0 : date.getMonth() + 1;
  let prevMonthDaysCount = daysCount(prevMonthYear, prevMonth, 0);
  let weeks = weekCount(start + days);
  let length = weeks * 7;
  let cells = [...Array(length)];

  for (let i = 0; i < length; i++) {
    if(i < start) {
      cells[i] = new Date(prevMonthYear, prevMonth, prevMonthDaysCount - start + i + 1);
    } else if(i < end) {
      cells[i] = new Date(date.getFullYear(), date.getMonth(), i - start + 1);
    } else {
      cells[i] = new Date(date.getFullYear(), nextMonth, i - days - start + 1);
    }
  }

  let calendar = [];
  for (let i = 0; i < weeks; i++) {
    calendar[i] = cells.slice(i * 7 , (i+1) * 7);
  }
  return calendar;
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
 */
export const ScrollingContext = createContext(null);

export const DatePicker = ({ id, onChange, options }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date(Date.now()));
  const [selectedDay, setSelectedDay] = useState(selectedDate.getDate());
  const [selectedMonth, setSelectedMonth] = useState(selectedDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(selectedDate.getFullYear());
  const [selectedTime, setSelectedTime] = useState(selectedDate.getHours());
  const [isScrolling, setIsScrolling] = useState(false);
  const [data, setData] = useState([]);

  const placeholderRef = useRef();
  const datepickerRef = useRef();
  const yearsRange = range(1950, 2050);

  const handleInputClick = () => setShowDatePicker(!showDatePicker);

  /**
   * Passing datepicker options as object
   * @type {object} options {
   * @property {boolean} save - your age.
   * @property {boolean} timepicker - your age.
   * @property {string} locale - your age.
   * }
   */
  let saveSelected = options?.save ?? false;
  let timepicker = options?.timepicker ?? false;
  let locale = options?.locale ?? document.documentElement.lang;
  let weekdays = i18n[locale].dayOfWeekShort;
  let months = i18n[locale].months;

  useEffect(() => {
    const date = new Date(selectedYear, selectedMonth, selectedDay);
    setData(dataBuilder(date));
    placeholderRef.current.innerText = date.toLocaleDateString();   
    onChange(date.toLocaleDateString());

  }, [onChange, selectedDay, selectedMonth, selectedYear]);

  useEffect(() => {
    const close = (e) => {
      if (datepickerRef.current && !datepickerRef.current.contains(e.target) && !isScrolling) {
        setShowDatePicker(false);
      }
    }    
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, [isScrolling])

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

  const handleSaveSelected = () => {
    localStorage.setItem('date', selectedDate);
    // e.preventDefault();
    // datetimepicker.data('changed', true);
    // _xdsoft_datetime.setCurrentTime(getCurrentValue());
    // input.val(_xdsoft_datetime.str());
    // datetimepicker.trigger('close.xdsoft');
  }

  const handleDateChange = (e) => {

    document
      .querySelectorAll(`#${id}-menu td`)
      .forEach(td => td.classList.remove('selected'));
    e.target.classList.add('selected');

    setSelectedMonth(e.target.dataset.month);
    setSelectedYear(e.target.dataset.year);
    setSelectedDay(e.target.dataset.day);
    setSelectedDate(new Date(selectedYear, selectedMonth, selectedDay));

    setShowDatePicker(!showDatePicker);
  }

  return (
    <div id={`${id}-container`} className="datepicker-container" ref={datepickerRef}>  
      <div className="datepicker-input" onClick={handleInputClick}>
        <div ref={placeholderRef} className="select-selected-value">DD/MM/YY</div>
        <div className="select-tools">
          <div className="select-tool">
            <Calendar />
          </div>
        </div>
      </div>  
      
      {showDatePicker && <div id={`${id}-menu`} className="datepicker-menu">
        <div className="datepicker-calendar">
          <nav className="datepicker-nav">
            <button onClick={() => handleClick(-1)} className="datepicker-prev"><ArrowLeft /></button>
            <button onClick={handleClickToday} className="datepicker-today"><Home /></button>

            <select 
              className="datepicker-month" 
              value={selectedMonth} 
              onChange={handleMonthChange}
              >
                { months.map((_, i) => <option key={months[i]} value={i}>{months[i]}</option>) }
            </select>

            <select 
              className="datepicker-year" 
              value={selectedYear} 
              onChange={handleYearChange}
              >
                { yearsRange.map(year => <option key={year} value={year}>{year}</option>) }
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

          <footer className="datepicker-footer">
            {saveSelected && <button type="button" className="datepicker-save-selected" onClick={handleSaveSelected} >Save Selected</button>}
          </footer> 
        </div> 
        {timepicker && 
          <ScrollingContext.Provider value={setIsScrolling}>
            <TimePicker setSelectedTime={setSelectedTime} />
          </ScrollingContext.Provider>}
      </div>}
    </div>
  )
}
