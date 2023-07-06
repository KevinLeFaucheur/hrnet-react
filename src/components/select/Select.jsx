import { useEffect, useState } from "react";
import "./Select.css"
import { Icon } from "./assets/Icon";

/**
 * TODO: 
 * - CSS options
 * - accessibility:
 *    - space or enter should select a value
 *    - arrow up and down on input should shuffle options too
 * - more tolerant options building (optional)
 * - upwards is broken
 */

export const Select = ({ placeHolder, options, onChange }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const [upwards, setUpwards] = useState(false);

  const [focus, setFocus] = useState(-1);
  const [keyCode, setKeyCode] = useState(null);

  useEffect(() => {
    const handler = () => setShowMenu(false);

    setUpwards(document.querySelector('.select-container')?.getBoundingClientRect().bottom + 150 > window.innerHeight);
    
    if(showMenu){
      let selectMenu = document.querySelector('.select-menu');
      selectMenu.children[focus].focus();
      selectMenu.children[focus].classList.add('active');  
    }

    window.addEventListener('click', handler);
    return () => { window.removeEventListener('click', handler) }
  }, [focus, keyCode, showMenu])

  const setPlaceholder = () => {
    return selectedValue ? selectedValue.label : placeHolder ? placeHolder : options[0].label;
  }

  const handleInputClick = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  }

  const handleKeyDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if(e.keyCode === 32) setShowMenu(!showMenu);
    setKeyCode(e.keyCode);
    setFocus(0);
  }

  const handleOption = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if(e.keyCode === 32) setShowMenu(!showMenu);
    setKeyCode(e.keyCode);

    let selectMenu = document.querySelector('.select-menu');
    let index = focus;
    switch(e.keyCode) {
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
      <div tabIndex={0} onKeyDown={handleKeyDown} onClick={handleInputClick} className="select-input">
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
            onKeyDown={handleOption}
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
