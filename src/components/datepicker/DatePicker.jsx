import React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, Calendar, Home, ThinLeft, ThinRight } from "./assets/Icons";
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

/**
 * 
 */
export const DatePicker = ({ id, onChange, options }) => {
  /**
   * Initializing variables with options if not null else uses a default options
  */
  const years = useMemo(() => [options?.yearStart ?? 1950, options?.yearEnd ?? 2050].sort(), [options?.yearEnd, options?.yearStart]);
  const yearsRange = useMemo(() => range(years[0], years[1]), [years]);
  const format = useMemo(() => identifyFormat(options?.format ?? 'm/d/Y h:i'), [options?.format]);
  
  // Localization
  const locale = options?.locale ?? document.documentElement.lang;
  const weekdays = options?.dayOfWeekShort ?? i18n[locale].dayOfWeekShort;
  const months = options?.months ?? i18n[locale].months;
  
  // Controls & Buttons
  const saveSelected = options?.saveSelected ?? false;
  const todayButton = options?.todayButton ?? true;
  const prev = options?.inverseButton ? 1 : -1;
  const next = options?.inverseButton ? -1 : 1;
  const scrollMonth = options?.scrollMonth ?? false;
  const closeOnDateSelect = options?.closeOnDateSelect ?? false;
  
  // Main features
  const datepicker = options?.datepicker ?? true;
  const timepicker = options?.timepicker ?? false;
  const weeks = options?.weeks ?? false;
  const inline = options?.inline ?? false;
  
  // Default and clamping Date and Time  
  let defaultDate = options?.defaultDate ?? false;
  const startDate = options?.startDate ?? Date.now();
  const minDate = options?.minDate ?? false;
  const maxDate = options?.maxDate ?? false;
  
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
    scrollbar: options?.timepickerScrollbar ?? true,

    hours12: options?.hours12 ?? false,
    step: options?.step ?? 60,
    allowTimes: options?.allowTimes ?? [],
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
  const [value, setValue] = useState('');

  const inputRef = useRef();
  const datepickerRef = useRef();

  /**
   * 
   */
  useEffect(() => {
    const date = new Date(selectedDate.year, selectedDate.month, selectedDate.day);

    const d = datepicker ? formatToDate(date, format) : '';
    const time = timepicker ? ' ' + formatToTime(selectedDate.time, format) : '';
    setValue(d + time);

    if(onChange) onChange(formatToDate(date, format));
    setCalendar(calendarBuilder(date));
  }, [datepicker, format, onChange, selectedDate.day, selectedDate.month, selectedDate.time, selectedDate.year, timepicker])
  
  /**
   * Handles closing when clicking outside DatePicker
   */
  useEffect(() => {
    const close = (e) => {
      if (datepickerRef.current && !datepickerRef.current.contains(e.target) && !isScrolling && !inline) {
        setShowDatePicker(false);
        if(onClose) onClose();
      }
    }
    window.addEventListener('click', close);

    return () => window.removeEventListener('click', close);
  }, [inline, isScrolling, onClose])

  /**
   * Toggles DatePicker on clicking input
   */
  const handleInputClick = () => { 
    setShowDatePicker(!showDatePicker);

    if(!showDatePicker && onShow) onShow(); 
    if(showDatePicker && onClose) onClose(); 
  };

  /**
   * Navigates month to previous if -1, next if 1
   * @param {number} i - Offset [-1, 1]
   */
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

  /**
   * Scrolling months with mouse wheel if scrollMonth is true
   * @param {Event} e   - DOM Event
   */
  const handleMonthScrollWheel = (e) => {
    if (!scrollMonth) return;

    switch (Math.sign(e.deltaY)) {
      case -1: handleMonthClick(-1); break;
      case 1: handleMonthClick(1); break;
      case 0: break;
      default: break;
    }
  }

  /**
   * Sets selected date's month from select
   * @param {Event} e   - DOM Event
   */
  const handleMonthChange = (e) => {
    setSelectedDate(o => ({
      ...o,
      month: parseInt(e.target.value)
    }));
    if(onChangeMonth) onChangeMonth();
  }

  /**
   * Sets selected date's year from select
   * @param {Event} e   - DOM Event
   */
  const handleYearChange = (e) => {
    setSelectedDate(o => ({
      ...o,
      year : parseInt(e.target.value)
    }));
    if(onChangeYear) onChangeYear();
  }

  /**
   * Set selected date to today's
   */
  const handleClickToday = () => {
    setSelectedDate(o => ({
      ...o,
      year : new Date(Date.now()).getFullYear(),
      month: new Date(Date.now()).getMonth(),
      day: new Date(Date.now()).getDate()
    }));
  }

  /**
   * Set selected date on clicking Calendar's td
   * @param {Event} e   - DOM Event
   */
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

  /**
   * 
   * @param {*} value 
   */
  // const handleInputOnChange = (value) => {
  //   const date = new Date(value);
  //   const y = date.getFullYear();
  //   const m = date.getMonth();
  //   const d = date.getDate();

  //   if(date instanceof Date 
  //     && y.toString().length === 4 
  //     && m.toString().length >= 1 
  //     && d.toString().length >= 1) {

  //     setSelectedDate(o => ({
  //       ...o,
  //       year : parseInt(y),
  //       month: parseInt(m),
  //       day: parseInt(d)
  //     }));
  //     setCalendar(calendarBuilder(date));
  //   }
  //   if(onChange) onChange(formatToDate(date, format));
  // }

  /**
   * Save Selected Button
   */
  const handleSaveSelected = () => {
    const date = new Date(selectedDate.year, selectedDate.month, selectedDate.day);
    if(onChange) onChange(formatToDate(date, format));
    setCalendar(calendarBuilder(date));
    
    if(closeOnDateSelect) {
      setShowDatePicker(!showDatePicker);
      if(onClose) onClose();
    }
    if(onSelectDate) onSelectDate();
  }

  /**
   * Sets selectedDate when input loses focus
   * Updates DatePicker's onChange value if validateOnBlur is true
   */
  const handleValidateOnBlur = () => {
    const date = new Date(value);
    // console.log(date);

    if(!isNaN(Date.parse(date))) {      
      setSelectedDate(o => ({
        ...o,
        year : date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate()
      }));
      setCalendar(calendarBuilder(date));
    }

    if(validateOnBlur) {
      const date = new Date(selectedDate.year, selectedDate.month, selectedDate.day); 
      if(onChange) onChange(formatToDate(date, format));
      if(onChangeDateTime) onChangeDateTime();
    }
  }

  /**
   * Sets input's value either from typing or using the picker
   * @param {Event} e  - DOM Event
   * @returns {string} - Formatted date and time to display
   */
  const handleInputValue = (e) => {
    if(e) {
      if(e.type === "change") {
        // console.log(e.currentTarget.value);
        setValue(e.currentTarget.value);
        return e.currentTarget.value;
      }
    }
    if(inputRef.current === document.activeElement) {
      return value;
    };

    const date = datepicker ? formatToDate(new Date(selectedDate.year, selectedDate.month, selectedDate.day), format) : '';
    const time = timepicker ? ' ' + formatToTime(selectedDate.time, format) : '';
    return date + time;
  }

  return (
    <div id={`${id}-container`} className="datepicker-container" ref={datepickerRef} >  

      {!inline && <div className={`datepicker-input ${theme ? theme : ''}`}>
        <input 
          ref={inputRef}
          value={handleInputValue()}
          onClick={handleInputClick} 
          placeholder={new Date(defaultDate).toLocaleDateString()} 
          onChange={(e) => handleInputValue(e)} 
          onBlur={handleValidateOnBlur}
        />
        <div className="datepicker-icon"><Calendar /></div>
      </div>}
      
      {(showDatePicker || inline) && <div id={`${id}-menu`} className={`datepicker-menu ${theme ? theme : ''} ${inline ? 'inline' : ''}`} onBlur={handleValidateOnBlur}>
        {datepicker && <div className="datepicker-calendar">
          <nav className="datepicker-nav">
            <button type="button" onClick={() => handleMonthClick(prev)} className="datepicker-prev"><ThinLeft /></button>
            <button type="button" onClick={handleClickToday} className={`datepicker-today ${!todayButton ? 'hidden' : ''}`}><Home /></button>

            <div className="datepicker-select">
              <select 
                className={`datepicker-month ${theme ? theme : ''}`} 
                value={selectedDate.month} 
                onChange={handleMonthChange}
                >
                  { months.map((_, i) => <option key={months[i]} value={i}>{months[i]}</option>) }
              </select>
              <ArrowDown />
            </div>

            <div className="datepicker-select">
              <select 
                className={`datepicker-year ${theme ? theme : ''}`} 
                value={selectedDate.year} 
                onChange={handleYearChange}
                >
                  { yearsRange.map(year => <option key={year} value={year}>{year}</option>) }
              </select>   
              <ArrowDown />           
            </div>

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