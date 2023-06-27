import { styled } from "styled-components"

const TR = styled.tr`
  height: 34px; // must be fitting font instead
  width: 100%;
  padding: 8px 10px;
  background: #f9f9f9;

  &:nth-child(even) {
    background: #fff;
  }

  .selected {
    background: #f1f1f1;
  }
`

const TD = styled.td`
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
