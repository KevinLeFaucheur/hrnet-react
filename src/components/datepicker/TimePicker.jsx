import { useEffect, useRef, useState } from "react";
import { Scrollbar } from "./Scrollbar"
import { ArrowDown, ArrowUp } from "./assets/Icons";
import { clamp, range } from "./utils";
import "./index.css";

/**
 * TimerPicker renders a range of hours to select,
 * Returns the selected time through 'setSelectedTime' 
 */
export const TimePicker = ({ setSelectedTime }) => {
  const timeScrollerRef = useRef();
  const timerpickerRef = useRef();
  const unitRef = useRef();
  const hoursRange = range(0, 23);
  const [margin, setMargin] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);
  let maxMargin;

  const handleHourSelected = (e) => {
    timerpickerRef.current
      .querySelectorAll('.timepicker_time')
      .forEach(hour => hour.classList.remove('selected'));
    e.target.classList.add('selected');
    setSelectedTime(e.target);
  }

  const handleScrollButton = (n) => {  
    maxMargin = - (timerpickerRef.current.clientHeight - timeScrollerRef.current.clientHeight);
    let offset = clamp(margin + (n * unitRef.current.offsetHeight), maxMargin, 0);
    setMargin(offset);
    setScrollPercent(margin / maxMargin);
  }
  
  useEffect(() => {
    timerpickerRef.current.style.marginTop = margin + 'px';
  }, [margin])

  return (
    <div className="timepicker" >
      <button type="button" className="timepicker_prev" onClick={() => handleScrollButton(1)}><ArrowUp /></button>
        <div ref={timeScrollerRef} className="time_box time_scroller">
          <div ref={timerpickerRef} className="timepicker-time-container">
            { hoursRange.map(hour => 
              <div 
                key={hour} 
                ref={unitRef} 
                className="timepicker_time" 
                onClick={(e) => handleHourSelected(e)}
                data-hour={hour} 
                data-minute={0}
              >{hour + ':00'}</div>) }
          </div>
          <Scrollbar scroller={timerpickerRef} setMargin={setMargin} scrollPercent={scrollPercent} />
        </div>
      <button type="button" className="timepicker_next" onClick={() => handleScrollButton(-1)}><ArrowDown /></button>
    </div>
  )
}
