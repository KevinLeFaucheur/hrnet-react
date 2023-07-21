import { useRef } from "react";
import { Scrollbar } from "./Scrollbar"
import { ArrowDown, ArrowUp } from "./assets/Icons";
import "./DatePicker.css";

const hoursRange = (minHour, maxHour) => Array.from({ length: (maxHour - minHour + 1) }, (_, i) => minHour + i);

export const TimePicker = () => {
  const timerpickerRef = useRef();
  const unitRef = useRef();

  console.log(timerpickerRef);

  const handleScrollButton = (n) => {

  }

  return (
    <div className="timepicker" >
      <button type="button" className="timepicker_prev" onClick={() => handleScrollButton(1)}><ArrowUp /></button>
        <div className="time_box time_scroller">
          <div ref={timerpickerRef} className="timepicker-time-container">
            { hoursRange(0, 23).map(hour => <div key={hour} ref={unitRef} className="timepicker_time" data-hour={hour} data-minute={0}>{hour + ':00'}</div>) }
          </div>
          <Scrollbar scroller={timerpickerRef} />
        </div>
      <button type="button" className="timepicker_next" onClick={() => handleScrollButton(1)}><ArrowDown /></button>
    </div>
  )
}
