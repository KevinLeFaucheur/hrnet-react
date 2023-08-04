import { useContext } from "react"
import { styled } from "styled-components"
import { EntriesContext } from "./DataTable"

const Select = styled.div`
  display: flex;
  justify-content: space-between;
  color: rgba(103, 113, 139, 1);

  select {
    background-color: #F8F9FD;
    color: rgba(103, 113, 139, 1);
    box-sizing: border-box;
    padding-left: 26px;
    border: none;
    border-radius: 5px;
    height: 24px;
  }

  select:focus {
    outline-color: #2C71E1;
  }
`

/**
 * TODO:
*/

/**
 * Options: array of integers as values for option of the select
 * @param {Array of number} options 
 * @renders a select component with numbers of entries as options 
 */
export const TableEntriesSelect = ({ options }) => {
  const setEntries = useContext(EntriesContext);
  const defaultOptions = [10, 25, 60, 75, 100, 150];
  const selectOptions = options ? options : defaultOptions;
  
  return (
    <Select>
      <label htmlFor="entries">
        Show&nbsp;
        <select name="entries" id="entries" onChange={(e) => setEntries(parseInt(e.currentTarget.value))} >
          {selectOptions.map(option => <option key={option} value={option}>{option}</option>)}
        </select>
        &nbsp;Entries
      </label>
    </Select>
  )
}

///

///

const ShowResults = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
`
/**
 * 
 * @param {*} param0 
 * @returns 
 */
export const TableShowResults = ({ pageIndex, entries, totalEntries }) => {
  const start = totalEntries !== 0 ? (pageIndex * entries) + 1 : 0;
  const end = ((pageIndex * entries) + entries) <= totalEntries ? (pageIndex * entries) + entries : totalEntries;

  return (
    <ShowResults>Showing {start} to {end} of {totalEntries} entries</ShowResults>
  )
}
