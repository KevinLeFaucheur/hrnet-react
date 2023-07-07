import { useContext } from "react"
import { styled } from "styled-components"
import { EntriesContext } from "./DataTable"

const Select = styled.div`
  display: flex;
  justify-content: space-between;
`

export const TableEntriesSelect = ({ options }) => {
  const setEntriesCtx = useContext(EntriesContext);
  const defaultOptions = [10, 25, 60, 75, 100, 150];
  const selectOptions = options ? options : defaultOptions;

  return (
    <Select>
      <label htmlFor="entries">
        Show&nbsp;
        <select name="entries" id="entries" onChange={(e) => setEntriesCtx(parseInt(e.currentTarget.value))} >
          {selectOptions.map(option => <option key={option} value={option}>{option}</option>)}
        </select>
        &nbsp;Entries
      </label>
    </Select>
  )
}
