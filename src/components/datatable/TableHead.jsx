import { styled } from "styled-components"
import sortUp from "./assets/sort-up.svg" 
import sortDown from  "./assets/sort-down.svg" 

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

  img {
    opacity: 0.1;
  }

  img:last-child {
    position: absolute;
    right: 1px;
  }
`

const Sort = styled.div`
  float: right;
`

export const TableHead = ({ columns }) => {
  return (
    <thead>
      <TR>
        {columns.map(column => {
          return <TH key={column.data}>
                    {column.title}
                    <Sort>
                      <img src={sortUp} alt={`sort up ${column.title}`} />
                      <img src={sortDown} alt={`sort down ${column.title}`} />
                    </Sort>
                  </TH>
        })}
      </TR>
    </thead>
  )
}
