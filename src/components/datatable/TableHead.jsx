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
  padding: 10px 8px;
  user-select: none;
  width: ${props => props.width + 'px'};

  img {
    float: right;
    height: 18px;
    margin-left: 0.5rem;
  }
`



// columns.forEach(column => console.log(column.data));
// columns.forEach(column => console.log(getMaxLengthString(column.data)));

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
    document.querySelectorAll(`th > img`).forEach(image => image.src = sortNone);
    document.querySelectorAll(`#th-${name}, #td-${name}`).forEach(cell => cell.classList.add('selected'));

    if(sorting === 'none' || sorting === 'down') {
      setSorting('up');
      sortByCtx({ col: name, desc: false});
      document.querySelector(`#sorting-${name}`).src = sortUp;
    } else {
      setSorting('down');
      sortByCtx({ col: name, desc: true});
      document.querySelector(`#sorting-${name}`).src = sortDown;
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
                      width={getMaxLengthString(column.data)}
                      tabIndex={0} 
                      onKeyDown={(e) => toggleSortKeyboard(column.data, e)}
                      onClick={() => toggleSort(column.data)}>
                      {column.title}
                      <img id={`sorting-${column.data}`} src={sortNone} alt={`sort ${column.data}`} />
                  </TH>
        })}
      </TR>
    </thead>
  )
}
