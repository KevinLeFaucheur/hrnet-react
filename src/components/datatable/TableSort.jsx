import { styled } from "styled-components"
import sortUp from "./assets/sort-up.svg" 
import sortDown from  "./assets/sort-down.svg" 
import { useState } from "react"

const Sort = styled.div`
  float: right;

  img {
    opacity: ${ props => props.opacity === 'up' ? 0.5 : 0.1 };
  }

  img:last-child {
    position: absolute;
    right: 1px;
    opacity: ${ props => props.opacity !== 'down' ? 0.1 : 0.5 };
  }
`

export const TableSort = ({ name }) => {
  const [sorting, setSorting] = useState('none');

  const toggleSort = () => {
    if(sorting === 'none' || sorting === 'down') {
      setSorting('up');
    } else setSorting('down');
  }

  return (
    <Sort onClick={() => toggleSort()} opacity={sorting} >
      <img src={sortUp} alt={`sort up ${name}`} />
      <img src={sortDown} alt={`sort down ${name}`} />
    </Sort>
  )
}
