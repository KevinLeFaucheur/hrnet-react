import { useEffect, useRef, useState } from "react";
import { Home, Calendar, ThinLeft, ThinRight } from "./assets/Icons";
import { internationalization as i18n } from "./internationalization";
import { daysCount, range, weekCount } from "./utils";
import { TimePicker } from "./TimePicker";
import "./index.css";
import { ScrollingContext } from "./ScrollingContext";

/**
 * Passing datepicker options as object
 * @type {Object} options
 * @property {boolean} save       - Should or not use a save button to confirm the selected date.
 * @property {boolean} timepicker - Should or not add a selection of hours.
 * @property {string} locale      - Localization for the datepicker, defaults to lang attribute.
 */
const default_options = {
  locale: document.documentElement.lang, 

  saveSelected: false,
  todayButton: true,

  datepicker: true,
  timepicker: false,
  weeks: false,		
  
  highlightedDates: [],
  highlightedPeriods: [], 
}

const timepicker_defaults = {
  scrollbar: true,
  allowTimes: [],
}

/**
 * 
 */
export const DatePicker = ({ id, onChange, options }) => {
  /**
   * Initializing variables with options if not null or default_options
  */
  const years = [options?.yearStart ?? 1950, options?.yearEnd ?? 2050].sort();
  const yearsRange = range(years[0], years[1]);
  
  // Localization
  const locale = options?.locale ?? default_options.locale;
  const weekdays = options?.dayOfWeekShort ?? i18n[locale].dayOfWeekShort;
  const months = options?.months ?? i18n[locale].months;
  
  // Controls & Buttons
  const saveSelected = options?.saveSelected ?? default_options.saveSelected;
  const todayButton = options?.todayButton ?? default_options.todayButton;
  const prev = options?.inverseButton ? 1 : -1;
  const next = options?.inverseButton ? -1 : 1;
  
  // Main features
  const datepicker = options?.datepicker ?? default_options.datepicker;
  const timepicker = options?.timepicker ?? default_options.timepicker;
  const weeks = options?.weeks ?? default_options.weeks;
  
  // Default and clamping Date and Time  
  let defaultDate = options?.defaultDate ?? false;
  const startDate = options?.startDate ?? Date.now();
  const minDate = options?.minDate ?? false;
  const maxDate = options?.maxDate ?? false;
  // const minDateTime = options?.minDateTime ?? false;
  // const maxDateTime = options?.maxDateTime ?? false;
  
  // Select Class Dates
  const highlightedDates = getHighlightedDates(options?.highlightedDates) || [];
  const highlightedPeriods = getHighlightedPeriod(options?.highlightedPeriods, highlightedDates) || [];
  const highlightedDays = [highlightedDates, highlightedPeriods].flat();

  const selectClassesDates = {
    highlightedDates: highlightedDates,
    highlightedPeriods: highlightedPeriods,
    highlightedDays: highlightedDays,
    minMaxDates: [minDate, maxDate],
    weekends: options?.weekends ? options.weekends.map(weekend => Date.parse(weekend)) : [],
    disabledDates: options?.disabledDates ? options.disabledDates.map(date => Date.parse(date)) : [],
    allowDates: options?.allowDates ? options.allowDates.map(date => Date.parse(date)) : [],
    disabledWeekDays: options?.disabledWeekDays || [],
  }

  const theme = options?.theme ?? false; // 'dark' is supported
  const opened = options?.opened ?? false;
  
  /**
   * TimePicker Options
   */ 
  const timepicker_options = {
    timepickerOnly: !datepicker,

    inverseButton: options?.inverseButton ?? false,
    scrollbar: options?.timepickerScrollbar ?? timepicker_defaults.scrollbar,

    hours12: options?.hours12 ?? false,
    step: options?.step ?? 60,
    allowTimes: options?.allowTimes ?? timepicker_defaults.allowTimes,
    defaultTime: options?.defaultTime ?? false,
    minTime: options?.minTime ?? false,
    maxTime: options?.maxTime ?? false,

    theme: options?.theme ?? false,
  }

  const [showDatePicker, setShowDatePicker] = useState(opened);
  const [selectedDate, setSelectedDate] = useState({
    date: new Date(startDate),
    year: new Date(startDate).getFullYear(),
    month: new Date(startDate).getMonth(),
    day: new Date(startDate).getDate(),
    time: new Date(startDate).getHours() + ':' + new Date(startDate).getMinutes(),
  });
  const [isScrolling, setIsScrolling] = useState(false);
  const [calendar, setCalendar] = useState([]);

  const placeholderRef = useRef();
  const inputRef = useRef();
  const datepickerRef = useRef();

  const handleInputClick = () => { 
    inputRef.current.focus({ focusVisible: true });
    setShowDatePicker(!showDatePicker)
  };

  /**
   * 
   */
  useEffect(() => {

    if(datepicker){
      
    }

    const date = new Date(selectedDate.year, selectedDate.month, selectedDate.day);

    setCalendar(calendarBuilder(date));
    placeholderRef.current.innerText = (datepicker ? date.toLocaleDateString() : '') + (timepicker ? ' ' + selectedDate.time : ''); 
    if(onChange) onChange(date.toLocaleDateString());

  }, [datepicker, onChange, selectedDate, timepicker])

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

  //
  const handleMonthClick = (i) => {
    let month = selectedDate.month;
    let year = selectedDate.year;

    setSelectedDate(o => ({
      ...o,
      year : month + i < 0 ? year - 1 : month + i > 11 ? year + 1 : year ,
      month: month + i < 0 ? 11 : month + i > 11 ? 0 : month + i
    }));
  }

  //
  const handleMonthChange = (e) => {
    setSelectedDate(o => ({
      ...o,
      month: parseInt(e.target.value)
    }));
  }

  //
  const handleYearChange = (e) => {
    setSelectedDate(o => ({
      ...o,
      year : parseInt(e.target.value)
    }));
  }

  // Set selected date to today's
  const handleClickToday = () => {
    setSelectedDate(o => ({
      ...o,
      year : new Date(Date.now()).getFullYear(),
      month: new Date(Date.now()).getMonth(),
      day: new Date(Date.now()).getDate()
    }));
  }

  // 
  const handleDateChange = (e) => {
    if(e.target.classList.contains('disabled')) return;

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

  // 
  const handleSaveSelected = () => {

    const date = new Date(selectedDate.year, selectedDate.month, selectedDate.day);
    setCalendar(calendarBuilder(date));
    placeholderRef.current.innerText = (datepicker ? date.toLocaleDateString() : '') + (timepicker ? ' ' + selectedDate.time : '');   
    if(onChange) onChange(date.toLocaleDateString());

    // localStorage.setItem('date', selectedDate);
    // e.preventDefault();
    // datetimepicker.data('changed', true);
    // _xdsoft_datetime.setCurrentTime(getCurrentValue());
    // input.val(_xdsoft_datetime.str());
    // datetimepicker.trigger('close.xdsoft');
  }


  return (
    <div id={`${id}-container`} className="datepicker-container" ref={datepickerRef} data-date={new Date(selectedDate.year, selectedDate.month, selectedDate.day)}>  
      <div ref={inputRef} tabIndex={0} className="datepicker-input" onClick={handleInputClick} 
      role="combobox" aria-expanded="false" aria-haspopup="dialog" aria-controls="cb-dialog-1" aria-label={`${id}-date`}>
        <div ref={placeholderRef} className="select-selected-value">{new Date(defaultDate).toLocaleDateString()}</div>
        <div className="select-tools">
          <div className="select-tool">
            <Calendar />
          </div>
        </div>
      </div>  
      
      {showDatePicker &&<div id={`${id}-menu`} className={`datepicker-menu ${theme ? theme : ''}`}>
        {datepicker && <div className="datepicker-calendar">
          <nav className="datepicker-nav">
            <button type="button" onClick={() => handleMonthClick(prev)} className="datepicker-prev"><ThinLeft /></button>
            <button type="button" onClick={handleClickToday} className={`datepicker-today ${!todayButton ? 'hidden' : ''}`}><Home /></button>

            <select 
              className={`datepicker-month ${theme ? theme : ''}`} 
              value={selectedDate.month} 
              onChange={handleMonthChange}
              >
                { months.map((_, i) => <option key={months[i]} value={i}>{months[i]}</option>) }
            </select>

            <select 
              className={`datepicker-year ${theme ? theme : ''}`} 
              value={selectedDate.year} 
              onChange={handleYearChange}
              >
                { yearsRange.map(year => <option key={year} value={year}>{year}</option>) }
            </select>

            <button type="button" onClick={() => handleMonthClick(next)} className="datepicker-next"><ThinRight /></button>
          </nav>

          <div className="datepicker-body">
            <table id={`${id}-table`}>
              <thead>
                <tr>
                  { weeks ? <th></th> : '' }
                  { weekdays.map(day => <th key={day} >{day.slice(0, 3)}</th>) }
                </tr>
              </thead>
              <tbody>
                { calendar.map((week, i) => 
                  <tr key={`Week-${i + 1}`}>
                    { weeks ? <th>{getCurrentWeek(week[0]) + 1}</th> : '' }
                    { week.map(date => 
                      
                      <td 
                        className={selectClass(new Date(selectedDate.year, selectedDate.month, selectedDate.day), date, selectClassesDates)}
                        data-year={date.getFullYear()} data-month={date.getMonth()} data-day={date.getDate()} 
                        key={date.toLocaleDateString()} 
                        onClick={(e) => handleDateChange(e)}
                        title={selectTitle(date, highlightedDays)}
                        tabIndex={0}
                        role="menuitem"
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
        </div>}
        {timepicker && 
          <ScrollingContext.Provider value={setIsScrolling}>
            <TimePicker setSelectedTime={time => setSelectedDate(o => ({ ...o, time }))} options={timepicker_options} />
          </ScrollingContext.Provider>}
      </div>}
    </div>
  )
}


/**
 * Fills the calendar with an array for each week for each date visible
 * Includes previous and next month days if needed to be seen
 * @param {Date} date        - 
 * @returns {Array.<Date[]>} - 
 */
const calendarBuilder = (date) => {
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

/**
 * Adds the corresponding CSS class for :
 *  selected, greyed out, today and hightlighted dates
 * @param {Date} sDate    - current selected Date by user
 * @param {Date} tdDate   - td Date to display in calendar
 * @param {Object} dates  - td Date to display in calendar
 * @returns {string}      - classNames for this td
 */
const selectClass = (sDate, tdDate, dates) => {
  let className = [];
  let [minDate, maxDate] = dates.minMaxDates; 
  let minDateTimestamp = Date.parse(minDate);
  let maxDateTimestamp = Date.parse(maxDate);

  if (sDate.getFullYear() === tdDate.getFullYear()
    && sDate.getMonth() === tdDate.getMonth()
    && sDate.getDate() === tdDate.getDate()) {
      className.push('selected');
  }

  if(sDate.getMonth() !== tdDate.getMonth()) {
    className.push('greyed');
  }

  if(dates.disabledWeekDays.includes(tdDate.getDay())) {
    className.push('disabled');
  }

  if(dates.disabledDates.includes(Date.parse(tdDate))) {
    className.push('disabled');
  }

  if(minDateTimestamp !== false && Date.parse(tdDate) < minDateTimestamp) {
    className.push('disabled');
  }

  if(maxDateTimestamp !== false && Date.parse(tdDate) > maxDateTimestamp) {
    className.push('disabled');
  }

  if(dates.allowDates.length > 0) {
    if(dates.allowDates.includes(Date.parse(tdDate))) {
      className = className.filter(className => className !== 'disabled');
    }
    else {
      className.push('disabled');
    } 
  }

  if(tdDate.getDay() === 0 || tdDate.getDay() === 6 || dates.weekends.includes(Date.parse(tdDate))) {
    className.push('weekend');
  }

  let now = new Date(Date.now());
  let nowTimeless = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if(Date.parse(nowTimeless) === Date.parse(tdDate)) {
    className.push('today');
  }

  let dateFound = dates.highlightedDates.find(date => date.timestamp === Date.parse(tdDate));
  if (dateFound) {
    if(dateFound.style) {
      dateFound.style.split(',').forEach(style => className.push(style));
    }
    else className.push('highlighted');
  }
  return className.join(' ');
}

/**
 * Finds if a date has a description within the Highlighted Dates array
 * @param {Date} tdDate                           - Date Object to check if a title exists for it
 * @param {Array.<HighlightedDate>} arrayOfDates  - All Highlighted Dates to check upon
 * @returns {string}                              - Description added to the title attribute
 */
const selectTitle = (tdDate, arrayOfDates) => {
  let dateFound = arrayOfDates.find(date => date.timestamp === Date.parse(tdDate));
  if (dateFound) {
    return dateFound.desc;
  }
  return '';
}

 /**
  * 
  * @param {Array.<string>} hlDates     - string of valid date, optional desc and optional className
  * @returns {Array.<HighlightedDate>}  - Highlighted Dates, to be compared with Periods then used in Calendar
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
 * Builds an array of HighlightedDate for a period,
 * Checking if each period day overlaps with an already highlighted day
 * @param {string|Array.<string>} hlPeriods - string, or array of string of valid date, optional desc and optional className
 * @param {Array.<HighlightedDate>} hlDates - Highlighted Dates to find overlaps
 * @returns {Array.<HighlightedDate>}       - Complete array of Highlighted Dates including overlaps
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
    return dates;
  }
}

/**
 * Makes sure date format is minimum 2 integer digits
 * @param {string} dateString - 
 * @returns {string}          - formatted date string as MM/DD/YYYY
 */
const formatDate = (string) => {
  return string 
          .split('/')
          .map(number => {
              return Number(number).toLocaleString('en-EN', { minimumIntegerDigits: 2, useGrouping: false })
            })
          .join('/');
}

/**
 * Calculates Week Number 
 * @param {Date} currentDate - Which date
 * @returns {number}         - Integer, Week Number
 */
const getCurrentWeek = (currentDate) => {
  let startDate = new Date(currentDate.getFullYear(), 0, 1);
  let days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
   
  return Math.ceil(days / 7);
}

/**
 * @typedef {Object} HighlightedDate
 * @property {string} desc      - Description set in title attribute
 * @property {string} key       - Highlighted Date in MM/DD/YYYY format
 * @property {string} className - Custom CSS class, use a default one if left empty
 * @property {string} timestamp - Highlighted Date as timestamp in ms
 */