import { styled } from "styled-components"
import sortUp from "./assets/sort-up.svg" 
import sortDown from  "./assets/sort-down.svg" 

const Sort = styled.div`
  float: right;

  img {
  }

  img:last-child {
    position: absolute;
    right: 1px;
  }
`

export const TableSort = ({ name }) => {

  return (
    <Sort className='sort' id={`sorting-${name}`} >
      <img src={sortUp} alt={`sort up ${name}`} />
      <img src={sortDown} alt={`sort down ${name}`} />
    </Sort>
  )
}
