import { useContext, useRef } from "react"
import { styled } from "styled-components"
import { TableContext } from "./DataTable"
import { search } from './utils/search'
import clear from './assets/clear.svg'

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
      <label>Search:&nbsp;<input ref={inputRef} onChange={(e) => onChange(search(data, e.target.value))} />
        <img src={clear} alt='Clear Input' className={inputRef.current.value ? 'close' : 'none'} onClick={handleClearInput} />
      </label>
    </Search>
  )
}
