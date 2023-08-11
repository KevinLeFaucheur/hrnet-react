import { useEffect, useRef, useState } from "react";
import { Home, ThinLeft, ThinRight } from "./assets/Icons";
import { internationalization as i18n } from "./internationalization";
import { 
  calendarBuilder, formatToDate, formatToTime, getCurrentWeek, 
  getHighlightedDates, getHighlightedPeriod, 
  identifyFormat, range, 
  selectClass, selectTitle
} from "./utils";
import { TimePicker } from "./TimePicker";
import "./index.css";
import { ScrollingContext } from "./ScrollingContext";
import { Input } from "./Input";

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
  const format = identifyFormat(options?.format ?? 'd/m/Y h:i');
  
  // Localization
  const locale = options?.locale ?? default_options.locale;
  const weekdays = options?.dayOfWeekShort ?? i18n[locale].dayOfWeekShort;
  const months = options?.months ?? i18n[locale].months;
  
  // Controls & Buttons
  const saveSelected = options?.saveSelected ?? default_options.saveSelected;
  const todayButton = options?.todayButton ?? default_options.todayButton;
  const prev = options?.inverseButton ? 1 : -1;
  const next = options?.inverseButton ? -1 : 1;
  const scrollMonth = options?.scrollMonth ?? false;
  const closeOnDateSelect = options?.closeOnDateSelect ?? false;
  
  // Main features
  const datepicker = options?.datepicker ?? default_options.datepicker;
  const timepicker = options?.timepicker ?? default_options.timepicker;
  const weeks = options?.weeks ?? default_options.weeks;
  const inline = options?.inline ?? false;
  
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
  const validateOnBlur = options?.validateOnBlur ?? true;

  /** Callbacks */
  const onSelectDate = options?.onSelectDate ?? false;
  const onChangeMonth = options?.onChangeMonth ?? false;
  const onChangeYear = options?.onChangeYear ?? false;
  const onChangeDateTime = options?.onChangeDateTime ?? false;
  const onShow = options?.onShow ?? false;
  const onClose = options?.onClose ?? false;
  
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

    onSelectTime: options?.onSelectTime ?? false,
  }

  const [showDatePicker, setShowDatePicker] = useState(opened);
  const [selectedDate, setSelectedDate] = useState({
    year: new Date(startDate).getFullYear(),
    month: new Date(startDate).getMonth(),
    day: new Date(startDate).getDate(),
    time: new Date(startDate).getHours() + ':' + new Date(startDate).getMinutes(),
  });
  const [isScrolling, setIsScrolling] = useState(false);
  const [calendar, setCalendar] = useState([]);

  const datepickerRef = useRef();

  /**
   * 
   */
  useEffect(() => {

    const date = new Date(selectedDate.year, selectedDate.month, selectedDate.day);
    const localeDate = formatToDate(date, format);

    setCalendar(calendarBuilder(date));

    if(onChange) onChange(/*date.toLocaleDateString()*/localeDate);
    
  }, [onChange, selectedDate])
  
  // 
  useEffect(() => {
    const close = (e) => {
      if (datepickerRef.current && !datepickerRef.current.contains(e.target) && !isScrolling) {
        setShowDatePicker(false);
        if(onClose) onClose();
      }
    }
    window.addEventListener('click', close);

    return () => window.removeEventListener('click', close);
  }, [isScrolling, onClose])

  //
  const handleInputClick = () => { 
    setShowDatePicker(!showDatePicker);

    if(!showDatePicker && onShow) onShow(); 
    if(showDatePicker && onClose) onClose(); 
  };

  //
  const handleMonthClick = (i) => {
    let month = selectedDate.month;
    let year = selectedDate.year;

    setSelectedDate(o => ({
      ...o,
      year : month + i < 0 ? year - 1 : month + i > 11 ? year + 1 : year ,
      month: month + i < 0 ? 11 : month + i > 11 ? 0 : month + i
    }));
    if(onChangeMonth) onChangeMonth();
  }

  // Scrolling months with mouse wheel if scrollMonth is true
  const handleMonthScrollWheel = (e) => {
    if (!scrollMonth) return;

    switch (Math.sign(e.deltaY)) {
      case -1: handleMonthClick(-1); break;
      case 1: handleMonthClick(1); break;
      case 0: break;
      default: break;
    }
  }

  //
  const handleMonthChange = (e) => {
    setSelectedDate(o => ({
      ...o,
      month: parseInt(e.target.value)
    }));
    if(onChangeMonth) onChangeMonth();
  }

  //
  const handleYearChange = (e) => {
    setSelectedDate(o => ({
      ...o,
      year : parseInt(e.target.value)
    }));
    if(onChangeYear) onChangeYear();
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

  // Selecting Date on clicking Calendar TD
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

    if(closeOnDateSelect) {
      setShowDatePicker(!showDatePicker);
      if(onClose) onClose();
    }
    if(onSelectDate) onSelectDate();
  }

  const handleInputOnChange = (value) => {
    const date = new Date(value);
    const y = date.getFullYear();
    const m = date.getMonth();
    const d = date.getDate();

    if(date instanceof Date 
      && y.toString().length === 4 
      && m.toString().length >= 1 
      && d.toString().length >= 1) {

      setSelectedDate(o => ({
        ...o,
        year : parseInt(y),
        month: parseInt(m),
        day: parseInt(d)
      }));
      setCalendar(calendarBuilder(date));
    }
  }

  // 
  const handleSaveSelected = () => {
    const date = new Date(selectedDate.year, selectedDate.month, selectedDate.day);
    setCalendar(calendarBuilder(date));
    if(onChange) onChange(date.toLocaleDateString());
    
    if(closeOnDateSelect) {
      setShowDatePicker(!showDatePicker);
      if(onClose) onClose();
    }
    if(onSelectDate) onSelectDate();
  }

  // 
  const handleValidateOnBlur = () => {
    if(validateOnBlur) {
      const date = new Date(selectedDate.year, selectedDate.month, selectedDate.day); 
      if(onChange) onChange(date.toLocaleDateString());

      if(onChangeDateTime) onChangeDateTime();
    }
  }

  return (
    <div id={`${id}-container`} className="datepicker-container" ref={datepickerRef} >  
      <Input 
        value={(datepicker ? formatToDate(new Date(selectedDate.year, selectedDate.month, selectedDate.day), format) : '') + (timepicker ? ' ' + formatToTime(selectedDate.time, format) : '')} 
        placeholder={new Date(defaultDate).toLocaleDateString()} 
        onClick={handleInputClick} 
        onChange={(e) => handleInputOnChange(e.currentTarget.value)} 
      />
      
      {showDatePicker &&<div id={`${id}-menu`} className={`datepicker-menu ${theme ? theme : ''} ${inline ? 'inline' : ''}`} onBlur={handleValidateOnBlur}>
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
            <table id={`${id}-table`} onWheel={handleMonthScrollWheel}>
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