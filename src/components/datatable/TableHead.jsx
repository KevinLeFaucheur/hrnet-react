import { styled } from "styled-components"
import { useState } from "react"
import sortUp from "./assets/sort-up.svg"
import sortDown from "./assets/sort-down.svg"
import sortNone from "./assets/sort-none.svg"

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

  img {
    float: right;
    height: 18px;
  }
`

export const TableHead = ({ columns }) => {
  const [sorting, setSorting] = useState('none');

  const toggleSort = (name) => {
    document.querySelectorAll('th, td').forEach(cell => cell.classList.remove('selected'));
    document.querySelectorAll(`#th-${name}, #td-${name}`).forEach(cell => cell.classList.add('selected'));

    if(sorting === 'none' || sorting === 'down') {
      setSorting('up');
      document.querySelector(`#sorting-${name}`).src = sortUp;
    } else {
      setSorting('down');
      document.querySelector(`#sorting-${name}`).src = sortDown;
    }
  }

  return (
    <thead>
      <TR>
        {columns.map(column => {
          return  <TH key={column.data} id={`th-${column.data}`} tabIndex={0} onClick={() => toggleSort(column.data)}>
                      {column.title}
                      <img id={`sorting-${column.data}`} src={sortNone} alt={`sort ${column.data}`} />
                  </TH>
        })}
      </TR>
    </thead>
  )
}
