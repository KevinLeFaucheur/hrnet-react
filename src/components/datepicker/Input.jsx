import React from 'react'
import { Calendar } from './assets/Icons'

export const Input = ({ value, placeholder, onClick, onChange, theme}) => {
  return (
    <div tabIndex={0} className={`datepicker-input ${theme ? theme : ''}`}>
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
