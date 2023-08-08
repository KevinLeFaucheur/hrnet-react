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
  let maxMargin;
  
  /* Processing options */
  let timesRange = range(0, 23).map(hour => hour + ':00');

  const timepickerOnly = options.timepickerOnly ?? false;
  const scrollbar = options.scrollbar;

  if (options.allowTimes && Array.isArray(options.allowTimes) && options.allowTimes.length) {
    options.allowTimes.sort();
    timesRange = options.allowTimes;
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
    e.target.classList.add('selected');
    // let hour = options?.hours12 ? parseInt(e.target.dataset.hour) + 12 : e.target.dataset.hour;
    setSelectedTime(e.target.dataset.hour + ':' + e.target.dataset.minute);
  }

  /**
   * Calculates and sets margin for moving hours up or down with buttons
   * @param {number} offset - Should be -1 to move up and 1 to move down 
   */
  const handleScrollButton = (n) => {  
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
        <div ref={timeScrollerRef} className="time_box time_scroller">
          <div ref={timerpickerRef} className="timepicker-time-container">
            { timesRange.map(time => 
              <div 
                key={time} 
                ref={unitRef} 
                className="timepicker_time" 
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
