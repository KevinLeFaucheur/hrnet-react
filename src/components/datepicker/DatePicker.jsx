import { useState } from "react";
import { Icon } from "./assets/Icon";
import "./DatePicker.css"

export const DatePicker = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleInputClick = (e) => {
    e.stopPropagation();
    setShowDatePicker(!showDatePicker);
  }

  return (
    <div className="datepicker-container">
      <div className="datepicker-input" onClick={handleInputClick}>
        <div className="select-selected-value">DD/MM/YY</div>
        <div className="select-tools">
          <div className="select-tool">
            <Icon />
          </div>
        </div>
      </div>

      {showDatePicker && <div className="datepicker-menu">
      
      
      </div>}
    </div>
  )
}
