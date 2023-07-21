import { useEffect, useRef, useState } from "react";
import { clamp } from "./utils";

/**
 * TODO:
 * - Min and Max pos // Clamp marginTop instead
 * - Keep dragging on leave
 * - Buttons
 * - Set Selected Time
 */

export const Scrollbar = ({ scroller }) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const scrollBarRef = useRef(); 
  const thumbRef = useRef(); 

  const scrollTotalLength = scroller.current?.clientHeight ?? 0;

  let offset;
  let offsetThumb;

  const handleMouseDown = (e) => {
    switch (e.type) {
      case 'mousedown': setIsMouseDown(true);
      break;
      case 'mouseup': setIsMouseDown(false);
      break;
      case 'mouseleave': if(!isMouseDown) setIsMouseDown(false);
      break;
      default:
    }
  }

  const handleScrolling = (e, isMouseDown) => {  
    let thumbHalfHeight = thumbRef.current.clientHeight / 2;
    let thumbTopY = thumbRef.current.getBoundingClientRect().top;
    let scrollRange = { 
      min: scrollBarRef.current.getBoundingClientRect().top - 1, 
      max: scrollBarRef.current.getBoundingClientRect().bottom - thumbRef.current.clientHeight
    };

    if(isMouseDown) {

      let scrollbartop = scrollBarRef.current.getBoundingClientRect().top;
      offset = clamp(e.clientY - scrollbartop - thumbHalfHeight, 0, scrollBarRef.current.clientHeight - thumbRef.current.clientHeight);
      thumbRef.current.style.marginTop = offset + 'px';
      let scrollPercent = (thumbTopY - scrollBarRef.current.getBoundingClientRect().top) / (scrollBarRef.current.clientHeight - thumbRef.current.clientHeight);
      scroller.current.style.marginTop = -(scrollPercent * (scrollTotalLength - scrollBarRef.current.clientHeight)) + 'px';
    }
    else {
      offset = 0;
    }
  }

  return (
    <div onMouseMove={(e) => handleScrolling(e, isMouseDown)}  ref={scrollBarRef} className="scrollbar">
      <div 
        onClick={(e) => offsetThumb = e.nativeEvent.offsetY}
        onMouseDown={handleMouseDown} 
        onMouseUp={handleMouseDown} 
        onMouseLeave={handleMouseDown}
        // onMouseMove={(e) => handleScrolling(e, isMouseDown)} 
        className="thumb"
        ref={thumbRef}
      >&nbsp;</div>
    </div>
  )
}
