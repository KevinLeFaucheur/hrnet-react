import { createContext, useEffect, useRef, useState } from "react";
import { Home, Calendar, ThinLeft, ThinRight } from "./assets/Icons";
import { internationalization as i18n } from "./internationalization";
import { daysCount, range, weekCount } from "./utils";
import { TimePicker } from "./TimePicker";
import "./index.css";

/**
 * 
 * @param {*} date 
 * @returns 
 */
const dataBuilder = (date) => {
  const month = date.getMonth();
  const year = date.getFullYear();

  let days = daysCount(year, month, 0);
  let start = new Date(year, month).getDay();
  let end = start + days;
  let prevMonthYear = month === 0 ? year - 1 : year;
  let prevMonth = month === 0 ? 11 : month - 1;
  let nextMonth = month === 11 ? 0 : month + 1;
  let nextMonthYear = month === 11 ? year + 1 : year;
  let prevMonthDaysCount = daysCount(prevMonthYear, prevMonth, 0);
  let weeks = weekCount(start + days);
  let length = weeks * 7;
  let cells = [...Array(length)];

  for (let i = 0; i < length; i++) {
    if(i < start) {
      cells[i] = new Date(prevMonthYear, prevMonth, prevMonthDaysCount - start + i + 1);
    } else if(i < end) {
      cells[i] = new Date(year, month, i - start + 1);
    } else {
      cells[i] = new Date(nextMonthYear, nextMonth, i - days - start + 1);
    }
  }

  let calendar = [];
  for (let i = 0; i < weeks; i++) {
    calendar[i] = cells.slice(i * 7 , (i+1) * 7);
  }
  return calendar;
}

// const calendarBuilder = (calendar, selectedDate, highlightedDays) => {
//   let tbody = document.createElement('tbody');

//   // For each week
//   for (let i = 0; i < calendar.length; i++) {
//     let tr = document.createElement('tr');
    
//     // For each day
//     for (let j = 0; j < calendar[i].length; j++) {
//       let date = calendar[i][j];
//       let td = document.createElement('td');
//       td.className = selectClass(new Date(selectedDate.year, selectedDate.month, selectedDate.day), date, highlightedDays);
//       td.dataset.year = date.getFullYear();
//       td.dataset.month = date.getMonth();
//       td.dataset.day = date.getDate();
//       td.key = date.toLocaleDateString();
//       td.setAttribute('onclick', '(e) => handleDateChange(e)');
//       td.title = selectTitle(date, highlightedDays);
//       td.innerText = date.getDate();
//       tr.appendChild(td);
//     }

//     tbody.appendChild(tr);
//   }
//   return tbody;
// }

// { data.map((week, i) => 
//   <tr key={`Week-${i + 1}`}>
//     { week.map(date => 
      
//       <td 
//         className={selectClass(new Date(selectedDate.year, selectedDate.month, selectedDate.day), date, highlightedDays)}
//         data-year={date.getFullYear()} data-month={date.getMonth()} data-day={date.getDate()} 
//         key={date.toLocaleDateString()} 
//         onClick={(e) => handleDateChange(e)}
//         title={selectTitle(date, highlightedDays)}
//         >
//           {date.getDate()}
//       </td>) }
//   </tr>
// )}

/**
 * Adds the corresponding CSS class for :
 *  selected, greyed out, today and hightlighted dates
 * @param {Date} sDate  // current selected Date by user
 * @param {Date} tdDate // td Date to display in calendar
 * @returns 
 */
const selectClass = (sDate, tdDate, arrayOfDates) => {
  let className = [];

  if (sDate.getFullYear() === tdDate.getFullYear()
    && sDate.getMonth() === tdDate.getMonth()
    && sDate.getDate() === tdDate.getDate()) {
      className.push('selected');
  }

  if(sDate.getMonth() !== tdDate.getMonth()) {
    className.push('greyed');
  }

  let now = new Date(Date.now());
  let nowTimeless = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if(Date.parse(nowTimeless) === Date.parse(tdDate)) {
    className.push('today');
  }

  let dateFound = arrayOfDates.find(date => date.timestamp === Date.parse(tdDate));
  if (dateFound) {
    if(dateFound.style) {
      dateFound.style.split(',').forEach(style => className.push(style));
    }
    else className.push('highlighted');
  }

  return className.join(' ');
}

/**
 * 
 * @param {*} tdDate 
 * @param {*} arrayOfDates 
 * @returns 
 */
const selectTitle = (tdDate, arrayOfDates) => {
  let dateFound = arrayOfDates.find(date => date.timestamp === Date.parse(tdDate));
  if (dateFound) {
    return dateFound.desc;
  }
  return '';
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
  const [selectedDate, setSelectedDate] = useState({
    date: new Date(Date.now()),
    year: new Date(Date.now()).getFullYear(),
    month: new Date(Date.now()).getMonth(),
    day: new Date(Date.now()).getDate(),
    time: new Date(Date.now()).getHours(),
  });
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
  const default_options = {
    saveSelected: false,
    timepicker: false,
    locale: document.documentElement.lang,  

    highlightedDates: [],
    highlightedPeriods: [],
  }

  //
  useEffect(() => {
    const date = new Date(selectedDate.year, selectedDate.month, selectedDate.day);
    setData(dataBuilder(date));
    placeholderRef.current.innerText = date.toLocaleDateString();   
    if(onChange) onChange(date.toLocaleDateString());
  }, [onChange, selectedDate]);

  //
  useEffect(() => {
    const close = (e) => {
      if (datepickerRef.current && !datepickerRef.current.contains(e.target) && !isScrolling) {
        setShowDatePicker(false);
      }
    }
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, [isScrolling])

  const handleMonthClick = (i) => {
    let month = selectedDate.month;
    let year = selectedDate.year;

    setSelectedDate(o => ({
      ...o,
      year : month + i < 0 ? year - 1 : month + i > 11 ? year + 1 : year ,
      month: month + i < 0 ? 11 : month + i > 11 ? 0 : month + i
    }));
  }

  const handleMonthChange = (e) => {
    setSelectedDate(o => ({
      ...o,
      month: parseInt(e.target.value)
    }));
  }

  const handleYearChange = (e) => {
    setSelectedDate(o => ({
      ...o,
      year : parseInt(e.target.value)
    }));
  }

  const handleClickToday = () => {
    setSelectedDate(o => ({
      ...o,
      year : new Date(Date.now()).getFullYear(),
      month: new Date(Date.now()).getMonth(),
      day: new Date(Date.now()).getDate()
    }));
  }

  const handleDateChange = (e) => {

    document
      .querySelectorAll(`#${id}-menu td`)
      .forEach(td => td.classList.remove('selected'));
    e.target.classList.add('selected');

    setSelectedDate(o => ({
      ...o,
      year : parseInt(e.target.dataset.year),
      month: parseInt(e.target.dataset.month),
      day: parseInt(e.target.dataset.day)
    }));
    setShowDatePicker(!showDatePicker);
  }

  const handleSaveSelected = () => {

    const date = new Date(selectedDate.year, selectedDate.month, selectedDate.day);
    setData(dataBuilder(date));
    placeholderRef.current.innerText = date.toLocaleDateString();   
    if(onChange) onChange(date.toLocaleDateString());

    // localStorage.setItem('date', selectedDate);
    // e.preventDefault();
    // datetimepicker.data('changed', true);
    // _xdsoft_datetime.setCurrentTime(getCurrentValue());
    // input.val(_xdsoft_datetime.str());
    // datetimepicker.trigger('close.xdsoft');
  }

  /**
   * Initializing variables with options if not null or default_options
   */
  const locale = options?.locale ?? default_options.locale;
  const timepicker = options?.timepicker ?? default_options.timepicker;
  const saveSelected = options?.saveSelected ?? default_options.saveSelected;
  const weekdays = options?.dayOfWeekShort ?? i18n[locale].dayOfWeekShort;
  const months = options?.months ?? i18n[locale].months;
  const highlightedDates = getHighlightedDates(options?.highlightedDates) || [];
  const highlightedPeriods = getHighlightedPeriod(options?.highlightedPeriods, highlightedDates) || [];
  const highlightedDays = [highlightedDates, highlightedPeriods].flat();
  /*  */

  return (
    <div id={`${id}-container`} className="datepicker-container" ref={datepickerRef} data-date={new Date(selectedDate.year, selectedDate.month, selectedDate.day)}>  
      <div className="datepicker-input" onClick={handleInputClick} >
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
            <button onClick={() => handleMonthClick(-1)} className="datepicker-prev"><ThinLeft /></button>
            <button onClick={handleClickToday} className="datepicker-today"><Home /></button>

            <select 
              className="datepicker-month" 
              value={selectedDate.month} 
              onChange={handleMonthChange}
              >
                { months.map((_, i) => <option key={months[i]} value={i}>{months[i]}</option>) }
            </select>

            <select 
              className="datepicker-year" 
              value={selectedDate.year} 
              onChange={handleYearChange}
              >
                { yearsRange.map(year => <option key={year} value={year}>{year}</option>) }
            </select>

            <button onClick={() => handleMonthClick(1)} className="datepicker-next"><ThinRight /></button>
          </nav>

          <div className="datepicker-body">
            <table id={`${id}-table`}>
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
                        className={selectClass(new Date(selectedDate.year, selectedDate.month, selectedDate.day), date, highlightedDays)}
                        data-year={date.getFullYear()} data-month={date.getMonth()} data-day={date.getDate()} 
                        key={date.toLocaleDateString()} 
                        onClick={(e) => handleDateChange(e)}
                        title={selectTitle(date, highlightedDays)}
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
            <TimePicker setSelectedTime={time => setSelectedDate(o => ({ ...o, time }))} />
          </ScrollingContext.Provider>}
      </div>}
    </div>
  )
}

 /**
  * 
  * @param {*} hlDates 
  * @returns 
  */
const getHighlightedDates = (hlDates) => {
  let dates = [];

  if (hlDates && Array.isArray(hlDates) && hlDates.length) {

    hlDates.forEach(date => {
      let dateStruct = date.split(',').map(value => value.trim());
      let highlightedDate = {
        key: formatDate(dateStruct[0]),
        timestamp: Date.parse(dateStruct[0]),
        desc: dateStruct[1],
        style: dateStruct[2],
      }
      let existingDate = dates.find(date => date.key === highlightedDate.key);
      if(existingDate !== undefined) {

        let hasDescription = existingDate.desc && existingDate.desc.length;
        let hasAlsoDescritpion = highlightedDate.desc && highlightedDate.desc.length;

        if(hasDescription && hasAlsoDescritpion) {
          existingDate.desc += "\n" + highlightedDate.desc;
        }
      } else {
        dates.push(highlightedDate);
      }
    })
  }
  return dates;
}

/**
 * 
 * @param {*} hlPeriods 
 * @param {*} hlDates 
 * @returns 
 */
const getHighlightedPeriod = (hlPeriods, hlDates) => {
  let dates = hlDates;

  if (hlPeriods && Array.isArray(hlPeriods) && hlPeriods.length) {

    hlPeriods.forEach(period => {
      let start; // start date
      let end;
      let key; // Should be MM/DD/YYYY
      let desc;
      let style;
      let first = true;
      if (Array.isArray(period)) {
        key = formatDate(period[0]);
        start = Date.parse(period[0]);
        end = Date.parse(period[1]);
        desc = period[2];
        style = period[3];
      }
      else {
        let periodStruct = period.split(',').map(value => value.trim());
        key = formatDate(periodStruct[0]);
        start = Date.parse(periodStruct[0]);
        end = Date.parse(periodStruct[1]);
        desc = periodStruct[2];
        style = periodStruct[3];
      }

      while (start <= end) {
        if(first) {
          first = false;
          style += ',hlFirst';
        } 

        let highlightedDate = {
          key: key,
          timestamp: start,
          desc: desc,
          style: style,
        }

        let startDate = new Date(start);
        start = startDate.setDate(startDate.getDate() + 1);
        let nextDate = new Date(start);
        key = formatDate((nextDate.getMonth() + 1) + '/' + nextDate.getDate() + '/' + nextDate.getFullYear());

        let existingDate = dates.find(date => date.key === highlightedDate.key);
        if(existingDate !== undefined) {

          let hasDescription = existingDate.desc && existingDate.desc.length;
          let hasAlsoDescritpion = highlightedDate.desc && highlightedDate.desc.length;

          if(hasDescription && hasAlsoDescritpion) {
            existingDate.desc += "\n" + highlightedDate.desc;
          }
        } else {
          dates.push(highlightedDate);
        }
        
        style = style.split(',')[0];
        if(start === end){
          style += ',hlEnd';
        }
      }
    });
    console.log(dates);
    return dates;
  }
}

const formatDate = (string) => {
  return string 
          .split('/')
          .map(number => {
              return Number(number).toLocaleString('en-EN', { minimumIntegerDigits: 2, useGrouping: false })
            })
          .join('/');
}