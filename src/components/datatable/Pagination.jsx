import { useEffect } from "react";
import { styled } from "styled-components"

/**
 * 
*/
export const Pagination = ({ pageIndex, pageCount, setPageIndex }) => {

  useEffect(() => {
    if(pageIndex + 1 > pageCount) setPageIndex(0);
  }, [pageCount, pageIndex, setPageIndex])

  return (
    <>
      <TableNavButton onClick={() => pageIndex >= 1 ? setPageIndex(pageIndex - 1) : null} >Previous</TableNavButton>

      <TableNavButton onClick={() => setPageIndex(0)} className={`${pageIndex === 0 ? "current" : ""}`}>1</TableNavButton>

      {buildPagination(pageIndex, pageCount).map(index => {
        return ['...'].includes(index) ? 
          <div key={index + Math.random(1)} >{index}</div> : 
          <TableNavButton key={index-1} onClick={() => setPageIndex(index-1)} className={`${index-1 === pageIndex ? "current" : ""}`}>{index}</TableNavButton>;
      })}

      {pageCount > 1 &&
        <TableNavButton onClick={() => setPageIndex(pageCount - 1)} className={`${pageIndex === (pageCount - 1) ? "current" : ""}`}>{pageCount}</TableNavButton>}

      <TableNavButton onClick={() => pageIndex < (pageCount - 1) ? setPageIndex(pageIndex + 1) : null} >Next</TableNavButton>
    </>
  )
}

const TableNavButton = styled.button`
  background: none;
  border: none;

  &.current {
    background: linear-gradient(to bottom, #fff 0%, #dcdcdc 100%);
    border: 1px solid #979797;
  }
    
  &:not(.current):hover {
    background: linear-gradient(to bottom, #585858 0%, #111 100%);
    color: white;

  }
  padding: 0.5em 1em;
`

/**
 * 
 * @param {*} i     // Page Index
 * @param {*} max   // Page Count
 * @returns 
 */
const buildPagination = (i, max) => {
  let pagination = [];

  if(max > 2) pagination[0] = (i < 5) ? 2  : (i > (max - 5)) ? '...'    : '...';
  if(max > 3) pagination[1] = (i < 5) ? 3  : (i > (max - 5)) ? max - 4 : i; 
  if(max > 4) pagination[2] = (i < 5) ? 4  : (i > (max - 5)) ? max - 3 : i + 1;
  if(max > 5) pagination[3] = (i < 5) ? 5  : (i > (max - 5)) ? max - 2 : i + 2;
  if(max > 6) pagination[4] = (i < 5) ? '...' : (i > (max - 5)) ? max - 1 : '...';

  return pagination;
};