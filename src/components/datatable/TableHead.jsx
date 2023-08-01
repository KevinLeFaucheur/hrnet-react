import { styled } from "styled-components"
import { useContext, useState } from "react"
// import sortUp from "./assets/sort-up.svg"
// import sortDown from "./assets/sort-down.svg"
import sortUp from "./assets/sortUp.svg"
import sortDown from "./assets/sortDown.svg"
// import sortNone from "./assets/sort-none.svg"
import sortNone from "./assets/sortNone.svg"
import { SortingContext, TableContext } from "./DataTable"

const TR = styled.tr`
  cursor: pointer;
  background: #F8F9FD;
  height: 34px;
  font-weight: bold;
`

const TH = styled.th`
  color: rgba(103, 113, 139, 0.5);
  box-sizing: content-box;
  /* border-bottom: 1px solid #2C71E1; */
  position: relative;
  padding: 10px 18px;
  user-select: none;
  width: ${props => props.width + 'px'};
  background-image: url(${sortNone});
  background-repeat: no-repeat;
  background-position: 100% 50%;
`

/**
 * 
 * @param {*} param0 
 * @returns 
 */
export const TableHead = ({ columns }) => {
  const [sorting, setSorting] = useState('none');

  const data = useContext(TableContext);
  const sortByCtx = useContext(SortingContext);

  const getLongestString = (columnData) => {
    return data.sort((row1, row2) => row2[columnData].length - row1[columnData].length)[0][columnData];
  }

  const getStringLengthInPixels = (string) => {
    let textSpan = document.createElement('span');
    textSpan.textContent = string;
    textSpan.id = 'text';
    document.body.appendChild(textSpan);
    let width = Math.ceil(textSpan.getClientRects()[0].width);
    document.body.removeChild(textSpan);

    return width;
  }

  const toggleSort = (name) => {
    document.querySelectorAll('th, td').forEach(cell => cell.classList.remove('selected'));
    document.querySelectorAll(`th`).forEach(th => th.style.backgroundImage = `url(${sortNone})`);
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
                      width={getStringLengthInPixels(getLongestString(column.data))}
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
