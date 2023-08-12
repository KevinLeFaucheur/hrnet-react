import React from "react";
import { useEffect, useRef, useState } from "react";
import { Scrollbar } from "./Scrollbar"
import { ArrowDown, ArrowUp } from "./assets/Icons";
import { clamp, range } from "./utils";
import "./index.css";

/**
 * TimerPicker renders a range of hours to select,
 * Returns the selected time through 'setSelectedTime' 
 */
export const TimePicker = ({ setSelectedTime, options }) => {
  const timeScrollerRef = useRef();
  const timerpickerRef = useRef();
  const unitRef = useRef();
  const [margin, setMargin] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [selected, setSelected] = useState(timeToMinutes(options.defaultTime) ?? false);
  let maxMargin;
  
  /**
   *  Processing TimePicker options
   */
  let timesRange = range(0, 23).map(hour => hour + ':00');
  if(![0, false].includes(options.step) || options.step >= 60) {
    timesRange = timesRange.map(time => {
      let hoursRange = [];
      let hour = time.split(':')[0];

      for (let j = 0; j < 60; j += options.step) {
        let minutes = hour * 60 + j;
        let hours = (hour < 10 ? '0' : '') + hour;
        minutes = (j < 10 ? '0' : '') + j;
        hoursRange.push(hours + ':' + minutes);
      }
      return [...hoursRange];
    });
    timesRange = timesRange.flat();
  }

  const timepickerOnly = options.timepickerOnly ?? false;
  const scrollbar = options.scrollbar;

  if (options.allowTimes && Array.isArray(options.allowTimes) && options.allowTimes.length) {
    options.allowTimes.sort();
    timesRange = options.allowTimes;
  }

  if(options.minTime !== false) {
    timesRange = timesRange.filter(time => timeToMinutes(time) >= timeToMinutes(options.minTime));
  }
  if(options.maxTime !== false) {
    timesRange = timesRange.filter(time => timeToMinutes(time) <= timeToMinutes(options.maxTime));
  }

  if(options.hours12) {
    timesRange = timesRange.map(time => {
      let hour = time.split(':')[0];
      let minute = time.split(':')[1];
      return hour > 12 ?  (hour - 12) + ':' + minute + ' pm' : hour + ':' + minute + ' am';
    })
  }

  const prev = options?.inverseButton ? -1 : 1;
  const next = options?.inverseButton ? 1 : -1;

  /**
   * 
   */
  const handleHourSelected = (e) => {
    timerpickerRef.current
      .querySelectorAll('.timepicker_time')
      .forEach(hour => hour.classList.remove('selected'));
    let selectedTime = e.target.dataset.hour + ':' + e.target.dataset.minute;
    setSelected(timeToMinutes(selectedTime));
    // let hour = options?.hours12 ? parseInt(e.target.dataset.hour) + 12 : e.target.dataset.hour;
    setSelectedTime(selectedTime);

    if(options.onSelectTime) options.onSelectTime();
  }

  /**
   * Calculates and sets margin for moving hours up or down with buttons
   * @param {number} offset - Should be -1 to move up and 1 to move down 
   */
  const handleScrollButton = (n) => {  
    if(unitRef === null) return;

    maxMargin = - (timerpickerRef.current.clientHeight - timeScrollerRef.current.clientHeight);
    let offset = clamp(margin + (n * unitRef.current.offsetHeight), maxMargin, 0);
    setMargin(offset);
    setScrollPercent(margin / maxMargin);
  }
  
  /**
   * Updates margin top as value changes
   */
  useEffect(() => {
    timerpickerRef.current.style.marginTop = margin + 'px';
  }, [margin])

  return (
    <div className={`timepicker ${timepickerOnly ? 'marginless' : ''}`}>
      <button type="button" className="timepicker_prev" onClick={() => handleScrollButton(prev)}><ArrowUp /></button>
        <div ref={timeScrollerRef} className={`time_box time_scroller ${options.theme ? options.theme : ''}`}>
          <div ref={timerpickerRef} className="timepicker-time-container">
            { timesRange.map(time => 
              <div 
                key={time} 
                ref={unitRef} 
                className={`timepicker_time ${options.theme ? options.theme : ''} ${setSelectedClass(timeToMinutes(time), selected)}`} 
                onClick={(e) => handleHourSelected(e)}
                data-hour={time.split(':')[0]} 
                data-minute={time.split(':')[1]}
              >{time}</div>) }
          </div>
          {scrollbar && <Scrollbar scroller={timerpickerRef} setMargin={setMargin} scrollPercent={scrollPercent} />}
        </div>
      <button type="button" className="timepicker_next" onClick={() => handleScrollButton(next)}><ArrowDown /></button>
    </div>
  )
}

/**
 * Convert time of H:M into minutes
 * @param {string} time - Time as a string
 * @returns {number}    - Time converted to minutes
 */
const timeToMinutes = (time) => {
  
  if(time === 0) {
    return new Date(Date.now()).getHours() * 60 + new Date(Date.now()).getMinutes();
  }
  else if(time instanceof Date) {
    return time.getHours() * 60 + time.getMinutes();
  } 
  else if(time) {
    let timeArr = time.split(':');
  
    let h = parseInt(timeArr[0]) * 60 ?? 0;
    let m = parseInt(timeArr[1]) ?? 0;
  
    return (isNaN(h) ? 0 : h) + (isNaN(m) ? 0 : m);
  }
  return -1;
}

/**
 * Evaluates if this time is the selected one
 * Then returns selected className or none 
 * @param {number} time          - compared time in minutes
 * @param {number} selectedTime  - selectedTime in minutes
 * @returns {string}             - className: selected or none
 */
const setSelectedClass = (time, selectedTime) => {
  return time === selectedTime ? 'selected' : '';
}