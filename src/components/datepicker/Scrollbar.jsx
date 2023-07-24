import { useContext, useEffect, useRef, useState } from "react";
import { clamp } from "./utils";
import { ScrollingContext } from "./DatePicker";

/**
 * TODO:
 * - Min and Max pos // Clamp marginTop instead
 */
export const Scrollbar = ({ scroller, setMargin, scrollPercent }) => {
  const setIsScrolling = useContext(ScrollingContext);
  const [canScroll, setCanScroll] = useState(false);
  const [mousePosY, setMousePosY] = useState(0);
  const trackRef = useRef(); 
  const thumbRef = useRef();   
  
  const handleMouseMove = (event) => {
    setMousePosY(event.clientY);
  };

  const handleCanScroll = (value) => {
    setCanScroll(value)
  }

  const handleMouseDown = (e) => {
    setCanScroll(true);
    // switch (e.type) {
    //   case 'mousedown': setCanScroll(true);
    //   break;
    //   case 'mouseup': setCanScroll(false);
    //   break;
    //   case 'mouseleave': if(!canScroll) setCanScroll(false);
    //   break;
    //   default:
    // }
  }

  useEffect(() => {
    ['mousemove', 'touchmove'].forEach(event => window.addEventListener(event, handleMouseMove));
    ['mouseup', 'touchup'].forEach(event => window.addEventListener(event, () => handleCanScroll(false)));

    return () => { 
      ['mousemove', 'touchmove'].forEach(event => window.removeEventListener(event, handleMouseMove));
      ['mouseup', 'touchup'].forEach(event => window.removeEventListener(event, () => handleCanScroll(false)));
    };
  }, []);

  useEffect(() => {

    const handleScrolling = (e) => { 
      
      if(canScroll) {
        setIsScrolling(true);
        let thumbHalfHeight = thumbRef.current.clientHeight / 2;
        let thumbTopY = thumbRef.current.getBoundingClientRect().top;  
        let scrollbartop = trackRef.current.getBoundingClientRect().top;
        let offset = clamp(mousePosY - scrollbartop - thumbHalfHeight, 0, trackRef.current.clientHeight - thumbRef.current.clientHeight);
        thumbRef.current.style.marginTop = offset + 'px';
        let scrollPercent = (thumbTopY - trackRef.current.getBoundingClientRect().top) / (trackRef.current.clientHeight - thumbRef.current.clientHeight);
        setMargin(-(scrollPercent * (scroller.current.clientHeight - trackRef.current.clientHeight)) );
      } else {
        setIsScrolling(false);
      }
    }

    ['mousemove', 'touchmove'].forEach(event => window.addEventListener(event, handleScrolling));
    return () => ['mousemove', 'touchmove'].forEach(event => window.removeEventListener(event, handleScrolling));
  }, [canScroll, mousePosY, scroller, setIsScrolling, setMargin])

  useEffect(() => {
    let margin = (trackRef.current.clientHeight - thumbRef.current.clientHeight) * scrollPercent;
    thumbRef.current.style.marginTop = margin + 'px';
  }, [scrollPercent])

  return (
    <div ref={trackRef} className="scrollbar">
      <div 
        onMouseDown={handleMouseDown} 
        // onMouseUp={handleMouseDown} 
        // onMouseLeave={handleMouseDown}
        className="thumb"
        ref={thumbRef}
      >&nbsp;</div>
    </div>
  )
}
