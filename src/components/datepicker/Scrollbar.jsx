import { useEffect, useRef, useState } from "react";
import { clamp } from "./utils";

/**
 * TODO:
 * - Min and Max pos // Clamp marginTop instead
 * - mouseup should always stop it
 */
export const Scrollbar = ({ scroller, setMargin, scrollPercent }) => {
  const [canScroll, setCanScroll] = useState(false);
  const [mousePosY, setMousePosY] = useState(0);
  const trackRef = useRef(); 
  const thumbRef = useRef();   
  
  const handleMouseMove = (event) => {
    setMousePosY(event.clientY);
  };

  const handleCanScroll = (value) => {
    console.log('mouseup: ', value);
    setCanScroll(value)
  }

  useEffect(() => {
    ['mousemove', 'touchmove'].forEach(event => window.addEventListener(event, handleMouseMove));
    ['mouseup', 'touchup'].forEach(event => window.addEventListener(event, () => handleCanScroll(false)));

    return () => { 
      ['mousemove', 'touchmove'].forEach(event => window.removeEventListener(event, handleMouseMove));
      ['mouseup', 'touchup'].forEach(event => window.removeEventListener(event, () => handleCanScroll(false)));
    };
  }, []);

  const handleMouseDown = (e) => {
    switch (e.type) {
      case 'mousedown': setCanScroll(true);
      break;
      case 'mouseup': setCanScroll(false);
      break;
      case 'mouseleave': if(!canScroll) setCanScroll(false);
      break;
      default:
    }
  }

  useEffect(() => {

    const handleScrolling = (e) => { 
      
      if(canScroll) {
        // console.log(mousePosY - thumbRef.current.getBoundingClientRect().top);
        let thumbHalfHeight = thumbRef.current.clientHeight / 2;
        let thumbTopY = thumbRef.current.getBoundingClientRect().top;  
        let scrollbartop = trackRef.current.getBoundingClientRect().top;
        let offset = clamp(mousePosY - scrollbartop - thumbHalfHeight, 0, trackRef.current.clientHeight - thumbRef.current.clientHeight);
        thumbRef.current.style.marginTop = offset + 'px';
        let scrollPercent = (thumbTopY - trackRef.current.getBoundingClientRect().top) / (trackRef.current.clientHeight - thumbRef.current.clientHeight);
        setMargin(-(scrollPercent * (scroller.current.clientHeight - trackRef.current.clientHeight)) );
      }
    }

    ['mousemove', 'touchmove'].forEach(event => window.addEventListener(event, handleScrolling));
    return () => ['mousemove', 'touchmove'].forEach(event => window.removeEventListener(event, handleScrolling));
  }, [canScroll, mousePosY, scroller, setMargin])

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
        // onMouseMove={(e) => handleScrolling(e, canScroll)} 
        className="thumb"
        ref={thumbRef}
      >&nbsp;</div>
    </div>
  )
}
