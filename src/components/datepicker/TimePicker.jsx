import { useRef, useState } from "react";
import { Scrollbar } from "./Scrollbar"
import { ArrowDown, ArrowUp } from "./assets/Icons";
import "./DatePicker.css";

const hoursRange = (minHour, maxHour) => Array.from({ length: (maxHour - minHour + 1) }, (_, i) => minHour + i);

export const TimePicker = () => {
  const timerpickerRef = useRef();
  const unitRef = useRef();
  const [unit, setUnit] = useState(0);

  const handleHourSelected = (e) => {
    console.log(e.target.dataset.hour, e.target.dataset.minute);
    timerpickerRef.current
      .querySelectorAll('.timepicker_time')
      .forEach(hour => hour.classList.remove('selected'));
    e.target.classList.add('selected')
  }

  const handleScrollButton = (n) => {
    setUnit(n * unitRef.current.clientHeight);
  }

  return (
    <div className="timepicker" >
      <button type="button" className="timepicker_prev" onClick={() => handleScrollButton(-1)}><ArrowUp /></button>
        <div className="time_box time_scroller">
          <div ref={timerpickerRef} className="timepicker-time-container">
            { hoursRange(0, 23).map(hour => 
              <div 
                key={hour} 
                ref={unitRef} 
                className="timepicker_time" 
                onClick={(e) => handleHourSelected(e)}
                data-hour={hour} 
                data-minute={0}
              >{hour + ':00'}</div>) }
          </div>
          <Scrollbar scroller={timerpickerRef} unit={unit} />
        </div>
      <button type="button" className="timepicker_next" onClick={() => handleScrollButton(1)}><ArrowDown /></button>
    </div>
  )
}
