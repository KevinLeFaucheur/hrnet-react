import React from "react";

export const ArrowLeft = () => {
  return (
    <svg width="7" height="14" viewBox="0 0 7 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 7L6.75 0.0717964L6.75 13.9282L0 7Z" fill="black"/>
    </svg>
  )
}

export const ArrowRight = () => {
  return (
  <svg width="7" height="14" viewBox="0 0 7 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 7L0.25 13.9282L0.25 0.0717969L7 7Z" fill="black"/>
  </svg>
  )
}

export const ArrowUp = () => {
  return (
    <svg width="14" height="7" viewBox="0 0 14 7" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 0L13.9282 6.75H0.0717969L7 0Z" fill="black"/>
    </svg>
  )
}

export const ArrowDown = () => {
  return (
    <svg width="14" height="7" viewBox="0 0 14 7" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 7L0.0717964 0.25L13.9282 0.25L7 7Z" fill="black"/>
    </svg>
  )
}

export const Home = () => {
  return (
    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M7 0L13.9282 6.75H11V12H9V8C8.99999 6.89542 8.10457 6 7 6C5.89543 6 5.00001 6.89542 5 8V12H3V6.75H0.0717969L7 0Z" fill="black"/>
    </svg>
  )
}

export const SmallArrow = () => {
  return (
    <svg width="6" height="3" viewBox="0 0 6 3" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 3L0.401924 0.75L5.59808 0.75L3 3Z" fill="black"/>
    </svg>
  )
}

export const Calendar = () => {
  return (
    <svg width="7" height="8" viewBox="0 0 7 8" transform="scale(1.3, 1.3)" opacity={0.75} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M2 0H1V1H0V8H7V1H6V0H5V1H2V0ZM6 3H1V7H6V3Z" fill="black"/>
    </svg>
  )
}

export const ThinLeft = () => {
  return (
    <svg className="thin-arrow-left" width="10" height="10" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle className="thin-arrow-left" cx="9" cy="16.0711" r="1" transform="rotate(45 9 16.0711)" fill="black"/>
      <line className="thin-arrow-left" x1="1.92894" y1="9" x2="9.00001" y2="16.0711" fill="black" strokeWidth="3"/>
      <circle className="thin-arrow-left" cx="9" cy="1.92893" r="1" transform="rotate(-45 9 1.92893)" fill="black"/>
      <circle className="thin-arrow-left" cx="1.92892" cy="9" r="1" transform="rotate(-45 1.92892 9)" fill="black"/>
      <line className="thin-arrow-left" x1="1.92891" y1="9" x2="8.99998" y2="1.92893" fill="black" strokeWidth="3"/>
    </svg>
  )
}

export const ThinRight = () => {
  return (
    <svg className="thin-arrow-right" width="10" height="10" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle className="thin-arrow-right" cx="9" cy="1.92893" r="1" transform="rotate(-135 9 1.92893)" fill="black"/>
      <line className="thin-arrow-right" x1="16.0711" y1="9" x2="8.99999" y2="1.92893" fill="black" strokeWidth="3"/>
      <circle className="thin-arrow-right" cx="9" cy="16.0711" r="1" transform="rotate(135 9 16.0711)" fill="black"/>
      <circle className="thin-arrow-right" cx="16.0711" cy="9" r="1" transform="rotate(135 16.0711 9)" fill="black"/>
      <line className="thin-arrow-right" x1="16.0711" y1="9" x2="9.00002" y2="16.0711" fill="black" strokeWidth="3"/>
    </svg>
  )
}
