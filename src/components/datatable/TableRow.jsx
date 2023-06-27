import { styled } from "styled-components"

const TR = styled.tr`
  height: 34px; // must be fitting font instead
  width: 100%;
  background: #f9f9f9;

  &:nth-child(odd) {
    background: #fff;
  }

  .selected {
    background: #f1f1f1;
  }

  &:last-child > td {
    border-bottom: none;
  }
`

const TD = styled.td`
  border-bottom: 1px solid #DDD;
  padding: 8px 8px;
`

export const TableRow = ({ rowData, columns }) => {
  console.log(rowData);
  console.log(columns);

  return (
    <TR>
      {columns.map(column => <TD>{rowData[column.data]}</TD>)}
    </TR>
  )
}
