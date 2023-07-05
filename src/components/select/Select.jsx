import { useEffect, useState } from "react";
import "./Select.css"

const Icon = () => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20">
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  );
};

/**
 * TODO: 
 * - 1st option as placeholder is none
 * - CSS
 * - accessibility
 * - more tolerant options building 
 */

export const Select = ({ placeHolder, options, onChange }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [upwards, setUpwards] = useState(false);

  useEffect(() => {
    const handler = () => setShowMenu(false);
    
    setUpwards(document.querySelector('.select-container')?.getBoundingClientRect().bottom + 150 > window.innerHeight);

    window.addEventListener('click', handler);
    return () => { window.removeEventListener('click', handler) }
  }, [])

  const setPlaceholder = () => {
    return selectedValue ? selectedValue.label : placeHolder ? placeHolder : options[0].label;
  }

  const handleInputClick = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
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
      <div tabIndex={0} onKeyDown={handleInputClick} onClick={handleInputClick} className="select-input">
        <div className="select-selected-value">{setPlaceholder()}</div>
        <div className="select-tools">
          <div className="select-tool">
            <Icon />
          </div>
        </div>

      </div>
      {showMenu && <div className={`select-menu ${upwards ? "upwards" : ""}`}>
        {options.map(option => (
          <div 
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
