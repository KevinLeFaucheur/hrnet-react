import React from 'react'
import { Calendar } from './assets/Icons'

export const Input = ({ value, placeholder, onClick, onChange}) => {
  return (
    <div tabIndex={0} className="datepicker-input">
      <input 
        value={value}
        onClick={onClick} 
        placeholder={placeholder} 
        onChange={onChange} 
        /*onBlur={handleValidateOnBlur}*/
      />
      <div className="datepicker-icon"><Calendar /></div>
    </div>
  )
}
