import { styled } from "styled-components"
import { useContext, useState } from "react"
import sortUp from "./assets/sort-up.svg"
import sortDown from "./assets/sort-down.svg"
import sortNone from "./assets/sort-none.svg"
import { DataContext, SortingContext } from "./DataTable"

const TR = styled.tr`
  cursor: pointer;
  background: #FFF;
  height: 34px;
  font-weight: bold;
`

const TH = styled.th`
  border-bottom: 1px solid #111;
  position: relative;
  padding: 10px 18px;
  user-select: none;
  width: ${props => props.width + 'px'};
  background-repeat: no-repeat;
  background-position: 100% 50%;

  /* .sorting-desc {
    background-image: ${sortUp};
  }

  .sorting-asc {
    background-image: ${sortDown};
  }

  .sorting {
    background-image: url("./assets/sort-none.svg");
  } */
`

/**
 * 
 * @param {*} param0 
 * @returns 
 */
export const TableHead = ({ columns }) => {
  const [sorting, setSorting] = useState('none');

  const data = useContext(DataContext);
  const sortByCtx = useContext(SortingContext);

  /** Get Max Length String for a single column */
  const getMaxLengthString = (columnData) => {
    return data.reduce((acc, data) => Math.max(acc, data[columnData].split('').length), -1);
  }

  const toggleSort = (name) => {
    document.querySelectorAll('th, td').forEach(cell => cell.classList.remove('selected'));
    console.log(document.querySelectorAll(`th`).forEach(th => th.style.backgroundImage = `url(${sortNone})`));
    document.querySelectorAll(`#th-${name}, #td-${name}`).forEach(cell => cell.classList.add('selected'));

    if(sorting === 'none' || sorting === 'down') {
      setSorting('up');
      sortByCtx({ col: name, desc: false});
      document.querySelector(`#th-${name}`).style.backgroundImage = `url(${sortDown})`;
    } else {
      setSorting('down');
      sortByCtx({ col: name, desc: true});
      document.querySelector(`#th-${name}`).style.backgroundImage = `url(${sortUp})`;
    }
  }

  const toggleSortKeyboard = (name, e) => {
    if([13, 27, 32].includes(e.keyCode)) toggleSort(name);
  }

  return (
    <thead>
      <TR>
        {columns.map(column => {
          return  <TH key={column.data} 
                      id={`th-${column.data}`} 
                      // className={sorting === 'down' ? 'sorting-desc' : sorting === 'up' ? 'sorting-asc' : 'sorting'}
                      width={getMaxLengthString(column.data)}
                      tabIndex={0} 
                      onKeyDown={(e) => toggleSortKeyboard(column.data, e)}
                      onClick={() => toggleSort(column.data)}>
                      {column.title}
                  </TH>
        })}
      </TR>
    </thead>
  )
}
