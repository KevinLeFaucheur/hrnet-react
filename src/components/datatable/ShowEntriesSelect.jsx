import { styled } from "styled-components"

const TableShow = styled.div`
  display: flex;
  justify-content: space-between;
`

export const ShowEntriesSelect = () => {
  return (
    <TableShow>
      <label htmlFor="entries">
        Show&nbsp;
        <select name="entries" id="entries">
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        &nbsp;Entries
      </label>
    </TableShow>
  )
}
