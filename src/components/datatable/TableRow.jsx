import { styled } from "styled-components"

const TR = styled.tr`
  height: 34px; // must be fitting font instead
  width: 100%;
  background: #fff;

  .selected {
    background: #fafafa;
  }
  
  &:nth-child(odd) {
    /* background: #f9f9f9; */
    
    .selected {
      background: #f1f1f1;
    }
  }

  &:last-child > td {
    border-bottom: none;
  }

  &:hover {
    background-color: #f6f6f6;
    .selected {
      background-color: #eaeaea;
    }
  }
`

const TD = styled.td`
  border-bottom: 2px solid #F8F9FD;
  padding: 8px 8px;
  user-select: none;
`

export const TableRow = ({ rowData, columns }) => {

  return (
    <TR>
      {columns.map(column => <TD key={`${column.title}`} id={`td-${column.data}`} >{rowData[column.data]}</TD>)}
    </TR>
  )
}
