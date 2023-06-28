import { styled } from "styled-components"
import { TableSort } from "./TableSort"
import { useState } from "react"

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
  user-select: none;
`

export const TableHead = ({ columns }) => {
  const [sorting, setSorting] = useState('none');

  const toggleSort = (name) => {
    document.querySelectorAll('.sort > img').forEach(element => element.style.opacity = '0.1');
    document.querySelectorAll('th, td').forEach(cell => cell.classList.remove('selected'));
    document.querySelectorAll(`#th-${name}, #td-${name}`).forEach(cell => cell.classList.add('selected'));

    if(sorting === 'none' || sorting === 'down') {
      setSorting('up');
      document.querySelector(`#sorting-${name} > img`).style.opacity = '0.5';
    } else {
      setSorting('down');
      document.querySelector(`#sorting-${name} > img:last-child`).style.opacity = '0.5';
    }
  }

  return (
    <thead>
      <TR>
        {columns.map(column => {
          return <TH key={column.data} id={`th-${column.data}`} onClick={() => toggleSort(column.data)}>{column.title}<TableSort name={column.data} /></TH>
        })}
      </TR>
    </thead>
  )
}
