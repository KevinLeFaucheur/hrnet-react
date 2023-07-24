import { useContext, useEffect, useRef, useState } from "react";
import { ScrollingContext } from "./DatePicker";
import { clamp } from "./utils";

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
  
  const handleMouseMove = (event) => setMousePosY(event.clientY);
  const handleCanScroll = (value) => setCanScroll(value);
  const handleMouseDown = () => setCanScroll(true);

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
        let scrollableHeight = trackRef.current.clientHeight - thumbRef.current.clientHeight;
        let offset = clamp(mousePosY - scrollbartop - thumbHalfHeight, 0, scrollableHeight);

        thumbRef.current.style.marginTop = offset + 'px';
        let scrollPercent = (thumbTopY - scrollbartop) / scrollableHeight;

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
        className="thumb"
        ref={thumbRef}
      >&nbsp;</div>
    </div>
  )
}
