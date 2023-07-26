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
  let nextMonthYear = date.getMonth() === 11 ? date.getFullYear() + 1 : date.getFullYear();
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
      cells[i] = new Date(nextMonthYear, nextMonth, i - days - start + 1);
    }
  }

  let calendar = [];
  for (let i = 0; i < weeks; i++) {
    calendar[i] = cells.slice(i * 7 , (i+1) * 7);
  }
  return calendar;
}

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
    className.push(dateFound.style ?? 'highlighted');
  }

  return className.join(' ');
}

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
  // const [selectedDay, setSelectedDay] = useState(new Date(Date.now()).getDate());
  // const [selectedMonth, setSelectedMonth] = useState(new Date(Date.now()).getMonth());
  // const [selectedYear, setSelectedYear] = useState(new Date(Date.now()).getFullYear());
  // const [selectedTime, setSelectedTime] = useState(new Date(Date.now()).getHours());
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


  useEffect(() => {
    const date = new Date(selectedDate.year, selectedDate.month, selectedDate.day);
    setData(dataBuilder(date));
    placeholderRef.current.innerText = date.toLocaleDateString();   
    onChange(date.toLocaleDateString());

  }, [onChange, selectedDate.day, selectedDate.month, selectedDate.year]);

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
    if (parseInt(selectedDate.month) + i < 0) {
      newMonth = 11;
      newYear = parseInt(selectedDate.year) - 1;
      
    } else if(parseInt(selectedDate.month) + i > 11) {
      newMonth = 0;
      newYear = parseInt(selectedDate.year) + 1;
      
    } else {
      newMonth = parseInt(selectedDate.month) + i;
      newYear = selectedDate.year;
    }
    setSelectedDate(o => ({
      ...o,
      year : newYear,
      month: newMonth
    }));
    // setSelectedDate(new Date(newYear, newMonth, selectedDay));
  }

  const handleMonthChange = (e) => {
    setSelectedDate(o => ({
      ...o,
      month: e.target.value
    }));
    // setSelectedDate(new Date(selectedYear, selectedMonth, selectedDay));
  }

  const handleYearChange = (e) => {
    setSelectedDate(o => ({
      ...o,
      year : e.target.value,
    }));
    // setSelectedDate(new Date(selectedYear, selectedMonth, selectedDay));
  }

  const handleClickToday = () => {
    setSelectedDate(o => ({
      ...o,
      year : new Date(Date.now()).getFullYear(),
      month: new Date(Date.now()).getMonth(),
      day: new Date(Date.now()).getDate()
    }));
    // setSelectedDate(today);
  }

  const handleSaveSelected = () => {
    // localStorage.setItem('date', selectedDate);

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

    setSelectedDate(o => ({
      ...o,
      year : e.target.dataset.year,
      month: e.target.dataset.month,
      day: e.target.dataset.day
    }));
    // setSelectedDate(new Date(selectedYear, selectedMonth, selectedDay));

    setShowDatePicker(!showDatePicker);
  }

  /* Initializing variables with options if not null or default_options */
  const locale = options?.locale ?? default_options.locale;
  const timepicker = options?.timepicker ?? default_options.timepicker;
  const saveSelected = options?.saveSelected ?? default_options.saveSelected;
  const weekdays = options?.dayOfWeekShort ?? i18n[locale].dayOfWeekShort;
  const months = options?.months ?? i18n[locale].months;
  const highlightedDates = getHighlightedDates(options?.highlightedDates) || [];
  const highlightedPeriods = getHighlightedPeriod(options?.highlightedPeriods) || [];
  const highlightedDays = [highlightedDates, highlightedPeriods].flat();
  /*  */

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
            <TimePicker setSelectedTime={selectedDate.time} />
          </ScrollingContext.Provider>}
      </div>}
    </div>
  )
}

const getHighlightedDates = (hlDates) => {
  let dates = [];

  if (hlDates && Array.isArray(hlDates) && hlDates.length) {

    hlDates.forEach(date => {
      let dateStruct = date.split(',').map(value => value.trim());
      let highlightedDate = {
        timestamp: Date.parse(dateStruct[0]),
        desc: dateStruct[1],
        style: dateStruct[2],
      }

    // hDate = new HighlightedDate(dateHelper.parseDate(splitData[0], options.formatDate), splitData[1], splitData[2]), // date, desc, style
    // keyDate = dateHelper.formatDate(hDate.date, options.formatDate);
    // if (highlightedDates[keyDate] !== undefined) {
    //   exDesc = highlightedDates[keyDate].desc;
    //   if (exDesc && exDesc.length && hDate.desc && hDate.desc.length) {
    //     highlightedDates[keyDate].desc = exDesc + "\n" + hDate.desc;
    //   }
    // } else {
    //   highlightedDates[keyDate] = hDate;
    // }

      dates.push(highlightedDate);
    })
  }
  return dates;
}


const getHighlightedPeriod = (hlPeriods) => {
  let dates = [];

  if (hlPeriods && Array.isArray(hlPeriods) && hlPeriods.length) {

    // highlightedDates = $.extend(true, [], options.highlightedDates);

    hlPeriods.forEach(period => {
      let start; // start date
      let end;
      let desc;
      let hDate;
      let keyDate;
      let exDesc;
      let style;
      if (Array.isArray(period)) {
        start = period[0];
        end = period[1];
        desc = period[2];
        style = period[3];
      }
      else {
        let periodStruct = period.split(',').map(value => value.trim());
        start = Date.parse(periodStruct[0]) /*dateHelper.parseDate(periodStruct[0], options.formatDate)*/;
        end = Date.parse(periodStruct[1]) /*dateHelper.parseDate(periodStruct[1], options.formatDate)*/;
        desc = periodStruct[2];
        style = periodStruct[3];
      }

      while (start <= end) {
        // hDate = new HighlightedDate(start, desc, style);
        let highlightedDate = {
          timestamp: start,
          desc: desc,
          style: style,
        }
        // keyDate = dateHelper.formatDate(start, options.formatDate);
        // start.setDate(start.getDate() + 1);
        // start = (new Date(start)).getDate() + 1; 
        let startDate = new Date(start);
        start = startDate.setDate(startDate.getDate() + 1);

        // if (highlightedDates[keyDate] !== undefined) {
        //   exDesc = highlightedDates[keyDate].desc;
        //   if (exDesc && exDesc.length && hDate.desc && hDate.desc.length) {
        //     highlightedDates[keyDate].desc = exDesc + "\n" + hDate.desc;
        //   }
        // } else {
        //   highlightedDates[keyDate] = hDate;
        // }
        dates.push(highlightedDate);
      }
    });
    return dates;
  }
}