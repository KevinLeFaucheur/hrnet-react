import { useContext, useRef } from "react"
import { styled } from "styled-components"
import { TableContext } from "./DataTable"
import { search } from './utils/search'
import clear from './assets/clear.svg'
import magnifier from './assets/magnifier.svg'

const Search = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;

  input {
    background-color: #F8F9FD;
    box-sizing: border-box;
    padding-left: 26px;
    border: none;
    border-radius: 5px;
    height: 30px;
    margin-left: 0.5rem;
  }

  input:focus {
    outline-color: #2C71E1;
  }

  .none {
    display: none;
  }

  .close {
    cursor: default;
    display: none;
    position: absolute;
    right: 0;
    top: calc(50% - 12px);
    padding: 5px;
    height: 21px;
  }

  label:hover > .close {
    display: block;
  }

  .search-icon {
    height: 14px;
    font-weight: bold;
    position: absolute;
    left: 70px;
    top: 8px;
    opacity: 0.3;
  }
`

/**
 * Search:
 * - Send a regex to SearchContexts
 */
export const TableSearch = ({ onChange }) => {
  const data = useContext(TableContext);
  const inputRef = useRef('');
  
  const event = new Event("clear");
  const handleClearInput = () => {
    inputRef.current.value = '';
    inputRef.current.dispatchEvent(event);
    onChange(search(data, inputRef.current.value))
  }

  return (
    <Search>
      <label>Search:&nbsp;
        <img src={magnifier} className='search-icon' alt='Search' />
        <input ref={inputRef} onChange={(e) => onChange(search(data, e.target.value))} />
        <img src={clear} alt='Clear' className={inputRef.current.value ? 'close' : 'none'} onClick={handleClearInput} />
      </label>
    </Search>
  )
}
