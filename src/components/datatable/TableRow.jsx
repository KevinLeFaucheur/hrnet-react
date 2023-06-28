import { styled } from "styled-components"

const TR = styled.tr`
  height: 34px; // must be fitting font instead
  width: 100%;
  background: #fff;

  .selected {
    background: #fafafa;
  }
  
  &:nth-child(odd) {
    background: #f9f9f9;
    
    .selected {
      background: #f1f1f1;
    }
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

  return (
    <TR>
      {columns.map(column => <TD key={`${column.title}`} id={`td-${column.data}`} >{rowData[column.data]}</TD>)}
    </TR>
  )
}
