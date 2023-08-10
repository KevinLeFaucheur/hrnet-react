import { useContext, useEffect, useRef, useState } from "react";
import { clamp } from "./utils";
import { ScrollingContext } from "./ScrollingContext";

/**
 * Scroll Bar Component
 * @param {Object} scroller -parentRef
 * @param {Callback} setMargin 
 * @param {number} scrollPercent 
 * TODO:
 */
export const Scrollbar = ({ scroller, setMargin, scrollPercent }) => {
  const setIsScrolling = useContext(ScrollingContext);
  const [canScroll, setCanScroll] = useState(false);
  const trackRef = useRef(); 
  const thumbRef = useRef();   
  
  const handleCanScroll = (value) => setCanScroll(value);
  const handleMouseDown = () => setCanScroll(true);

  useEffect(() => {
    ['mouseup', 'touchup'].forEach(event => window.addEventListener(event, () => handleCanScroll(false)));
    scroller?.current.addEventListener('wheel', handleWheelScroll);
    let scroll = scroller?.current;

    return () => { 
      ['mouseup', 'touchup'].forEach(event => window.removeEventListener(event, () => handleCanScroll(false)));
      scroll.removeEventListener('wheel', handleWheelScroll);
    };
  }, []);

  /**
   * Handles and calculates mouse wheel scrolling
   */
  const handleWheelScroll = (e) => {
    let multiplier = 12.5;
    let deltaSCroll = clamp(e.deltaY,  -1, 1) * multiplier;
    
    let trackTop = trackRef.current.getBoundingClientRect().top;
    let thumbTopY = thumbRef.current.getBoundingClientRect().top;
    let scrollableHeight = trackRef.current.clientHeight - thumbRef.current.clientHeight;

    let offset = thumbTopY - trackTop + deltaSCroll;
    offset = clamp(offset, 0, scrollableHeight);

    thumbRef.current.style.marginTop = offset + 'px';
    let scrollPercent = (thumbTopY - trackTop) / scrollableHeight;
    setMargin(-scrollPercent * (scroller.current.clientHeight - trackRef.current.clientHeight));
  };

  /**
   * Handles and calculates mouse down scrolling
   */
  useEffect(() => {

    const handleScrolling = (e) => {    
      if(canScroll) {
        setIsScrolling(true);

        let thumbHalfHeight = thumbRef.current.clientHeight / 2;

        let thumbTopY = thumbRef.current.getBoundingClientRect().top;  
        let trackTop = trackRef.current.getBoundingClientRect().top;
        let scrollableHeight = trackRef.current.clientHeight - thumbRef.current.clientHeight;
        
        let offset = e.clientY - trackTop - thumbHalfHeight;
        offset = clamp(offset, 0, scrollableHeight);

        thumbRef.current.style.marginTop = offset + 'px';
        let scrollPercent = (thumbTopY - trackTop) / scrollableHeight;
        setMargin(-scrollPercent * (scroller.current.clientHeight - trackRef.current.clientHeight));

      } else {
        setIsScrolling(false);
      }
    }

    ['mousemove', 'touchmove'].forEach(event => window.addEventListener(event, handleScrolling));
    return () => ['mousemove', 'touchmove'].forEach(event => window.removeEventListener(event, handleScrolling));
  }, [canScroll, scroller, setIsScrolling, setMargin])

  /**
   * Updates the scrolling percent 
   * for timepicker can calculate its own margin to offset
   */
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
