import { useContext } from "react"
import { styled } from "styled-components"
import { EntriesContext } from "./DataTable"

const Select = styled.div`
  display: flex;
  justify-content: space-between;
`

export const TableEntriesSelect = () => {
  const setEntriesCtx = useContext(EntriesContext);

  return (
    <Select>
      <label htmlFor="entries">
        Show&nbsp;
        <select name="entries" id="entries" onChange={(e) => setEntriesCtx(parseInt(e.currentTarget.value))} >
          <option value={1}>1</option>
          <option value={3}>3</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
        &nbsp;Entries
      </label>
    </Select>
  )
}
