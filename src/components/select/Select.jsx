import { useEffect, useRef, useState } from "react";
import "./Select.css"
import { Icon } from "./assets/Icon";

/**
 * TODO: 
 * - CSS options
 * - accessibility:
 * - more tolerant options building (optional)
 * - upwards is broken
 */

export const Select = ({ placeHolder, options, onChange }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState({ label: options[0].label ?? '-', value: options[0].value ?? '-'});
  const [upwards, setUpwards] = useState(false);
  const [focus, setFocus] = useState(0);
  const inputRef = useRef();

  useEffect(() => {
    const handler = (e) => { 
      if(inputRef.current && !inputRef.current.contains(e.target)) {
        setShowMenu(false); 
      }
    }

    setUpwards(document.querySelector('.select-container')?.getBoundingClientRect().bottom + 150 > window.innerHeight);
    
    if(showMenu){
      let selectMenu = document.querySelector('.select-menu');
      selectMenu.children[focus].focus();
      selectMenu.children[focus].classList.add('active');  
    }

    window.addEventListener('click', handler);
    return () => { window.removeEventListener('click', handler) }
  }, [focus, showMenu])

  const setPlaceholder = () => {
    return selectedValue ? selectedValue.label : placeHolder ? placeHolder : options[0].label;
  }

  const handleInputClick = (e) => {
    setShowMenu(!showMenu);
  }

  const handleKeyDown = (e) => {
    if(e.keyCode === 9) return;
    e.stopPropagation();
    e.preventDefault();
    if([13, 32].includes(e.keyCode)) {
      setShowMenu(!showMenu);
      setFocus(focus);
    }

    let index = focus;
    switch(e.keyCode) {
      case 38: if(index > 0) index--; break;
      case 40: if(index < options.length-1) index++; break;
      default:
    }
    setSelectedValue(options[index]);
    onChange(options[index].value);
    if(index !== focus) {
      setFocus(index);
    }
  }

  const handleOption = (option, e) => {
    e.stopPropagation();
    e.preventDefault();
    if([13, 27, 32].includes(e.keyCode)) setShowMenu(!showMenu);

    let selectMenu = document.querySelector('.select-menu');
    let index = focus;
    switch(e.keyCode) {
      case 13:
      case 32: setSelectedValue(option); onChange(option.value); break;
      case 38: if(index > 0) index--; break;
      case 40: if(index < selectMenu.children.length-1) index++; break;
      default:
    }
    if(index !== focus) {
      setFocus(index);
      e.target.classList.remove('active');
    }
  }

  const onItemClick = (option) => {
    setSelectedValue(option);
    onChange(option.value);
  }

  const isSelected = (option) => {
    return !selectedValue ? false : selectedValue.value === option.value;
  }

  return (
    <div className="select-container">
      <div tabIndex={0} onKeyDown={handleKeyDown} ref={inputRef} onClick={handleInputClick} className="select-input">
        <div className="select-selected-value">{setPlaceholder()}</div>
        <div className="select-tools">
          <div className="select-tool">
            <Icon rotate={showMenu}/>
          </div>
        </div>
      </div>

      {showMenu && <div className={`select-menu ${upwards ? "upwards" : ""}`}>
        {options.map(option => (
          <div 
            tabIndex={0}
            onKeyDown={(e) => handleOption(option, e)}
            onClick={() => onItemClick(option)} 
            key={option.value} 
            className={`select-item ${isSelected(option) && "selected"}`}>
              {option.label}
          </div>
        ))}
      </div>}

    </div>
  )
}
