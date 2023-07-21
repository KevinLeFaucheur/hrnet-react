import { useEffect, useRef, useState } from "react";
import { clamp } from "./utils";

/**
 * TODO:
 * - Min and Max pos // Clamp marginTop instead
 * - Keep dragging on leave
 */
export const Scrollbar = ({ scroller, setMargin, scrollPercent }) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const trackRef = useRef(); 
  const thumbRef = useRef();   
  
  const [mousePosY, setMousePosY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosY(event.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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

  useEffect(() => {

    const handleScrolling = (e) => { 
      
      if(isMouseDown) {
        console.log(mousePosY - thumbRef.current.getBoundingClientRect().top);
        let thumbHalfHeight = thumbRef.current.clientHeight / 2;
        let thumbTopY = thumbRef.current.getBoundingClientRect().top;  
        let scrollbartop = trackRef.current.getBoundingClientRect().top;
        let offset = clamp(mousePosY - scrollbartop - thumbHalfHeight, 0, trackRef.current.clientHeight - thumbRef.current.clientHeight);
        thumbRef.current.style.marginTop = offset + 'px';
        let scrollPercent = (thumbTopY - trackRef.current.getBoundingClientRect().top) / (trackRef.current.clientHeight - thumbRef.current.clientHeight);
        setMargin(-(scrollPercent * (scroller.current.clientHeight - trackRef.current.clientHeight)) );
      }
    }

    window.addEventListener('mousemove', handleScrolling);
    return () => window.removeEventListener('mousemove', handleScrolling);
  }, [isMouseDown, mousePosY, scroller, setMargin])

  useEffect(() => {
    let margin = (trackRef.current.clientHeight - thumbRef.current.clientHeight) * scrollPercent;
    thumbRef.current.style.marginTop = margin + 'px';
  }, [scrollPercent])

  return (
    <div ref={trackRef} className="scrollbar">
      <div 
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
