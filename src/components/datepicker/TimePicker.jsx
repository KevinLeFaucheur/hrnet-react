import { useEffect, useRef, useState } from "react";
import { Scrollbar } from "./Scrollbar"
import { ArrowDown, ArrowUp } from "./assets/Icons";
import "./DatePicker.css";
import { clamp, range } from "./utils";


export const TimePicker = () => {
  const timeScrollerRef = useRef();
  const timerpickerRef = useRef();
  const unitRef = useRef();
  const hoursRange = range(0, 23);
  const [scrollUnit, setScrollUnit] = useState(0);

  const handleHourSelected = (e) => {
    timerpickerRef.current
      .querySelectorAll('.timepicker_time')
      .forEach(hour => hour.classList.remove('selected'));
    e.target.classList.add('selected')
  }

  const handleScrollButton = (n) => {  
    setScrollUnit(clamp(scrollUnit + n, 0, 23));
  }
  
  useEffect(() => {
    let maxMargin = - (timerpickerRef.current.clientHeight - timeScrollerRef.current.clientHeight);
    let offset = clamp(-(scrollUnit * unitRef.current.offsetHeight), maxMargin, 0);
    timerpickerRef.current.style.marginTop = offset + 'px';
  }, [scrollUnit])

  return (
    <div className="timepicker" >
      <button type="button" className="timepicker_prev" onClick={() => handleScrollButton(-1)}><ArrowUp /></button>
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
          <Scrollbar scroller={timerpickerRef} />
        </div>
      <button type="button" className="timepicker_next" onClick={() => handleScrollButton(1)}><ArrowDown /></button>
    </div>
  )
}
