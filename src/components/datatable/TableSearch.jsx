import { useContext, useRef } from "react"
import { styled } from "styled-components"
import { DataContext } from "./DataTable"
import { search } from './utils/search'
import closeIcon from './assets/close.svg'

const Search = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;

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
`

/**
 * Search:
 * - Send a regex to SearchContexts
 */

export const TableSearch = ({ onChange }) => {
  const data = useContext(DataContext);
  const inputRef = useRef();
  
  const event = new Event("clear");
  inputRef.current.addEventListener(
    "clear",
    e => onChange(search(data, e.target.value)),
    false,
  );

  const handleClearInput = () => {
    inputRef.current.value = '';
    inputRef.current.dispatchEvent(event);
  }

  return (
    <Search>
      <label>Search:&nbsp;<input ref={inputRef} onChange={(e) => onChange(search(data, e.target.value))} />
        <img src={closeIcon} alt='Clear Input' className={inputRef.current.value ? 'close' : 'none'} onClick={handleClearInput} />
      </label>
    </Search>
  )
}
