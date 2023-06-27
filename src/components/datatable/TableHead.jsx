import { styled } from "styled-components"
import { TableSort } from "./TableSort"

const TR = styled.tr`
  cursor: pointer;
  background: #FFF;
  height: 34px;
  font-weight: bold;
`

const TH = styled.th`
  border-bottom: 1px solid #111;
  position: relative;
  padding: 10px 8px;
`

export const TableHead = ({ columns }) => {
  return (
    <thead>
      <TR>
        {columns.map(column => {
          return <TH key={column.data}>{column.title}<TableSort name={column.title} /></TH>
        })}
      </TR>
    </thead>
  )
}
