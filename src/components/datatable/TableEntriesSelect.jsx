import { useContext, useEffect } from "react"
import { styled } from "styled-components"
import { EntriesContext } from "./DataTable"

const Select = styled.div`
  display: flex;
  justify-content: space-between;
`

/**
 * Options: array of integers as values for option of the select
 * @param {Array of number} options 
 * @renders a select component with numbers of entries as options 
 */
export const TableEntriesSelect = ({ options }) => {
  const setEntries = useContext(EntriesContext);
  const defaultOptions = [10, 25, 60, 75, 100, 150];
  const selectOptions = options ? options : defaultOptions;
  
  // useEffect(() => {
  //   setEntries(selectOptions[0]);
  // }, [selectOptions, setEntries])
  
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
