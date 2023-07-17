import { useContext } from "react"
import { styled } from "styled-components"
import { PaginationContext } from "./DataTable"

const TableShowResults = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
`

const TableFooter = styled.footer`
  display: flex;
  justify-content: space-between;
`

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  padding-top: 4px;

  div {
    padding: 0.5em 1em;
  }
`

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

const buildPagination = (i, max) => {
  let pagination = [];
  
  if(max > 2) pagination[0] = (i < 5) ? 2  : (i > (max - 5)) ? '...'    : '...';
  if(max > 3) pagination[1] = (i < 5) ? 3  : (i > (max - 5)) ? max - 4 : i; 
  if(max > 4) pagination[2] = (i < 5) ? 4  : (i > (max - 5)) ? max - 3 : i + 1;
  if(max > 5) pagination[3] = (i < 5) ? 5  : (i > (max - 5)) ? max - 2 : i + 2;
  if(max > 6) pagination[4] = (i < 5) ? '...' : (i > (max - 5)) ? max - 1 : '...';

  return pagination;
};

/**
 * TODO:
 * - Pagination to be tested
 * - Showing 1 to 10 of 7 entries (calculate correct amount of entries if less)
 * - Pagination [1] [1] (second button should disappear)
 * - Update on search if out of bounds
*/

export const TableNav = ({ entries, totalEntries }) => {
  const { pageIndex, setPageIndex, pageCount } = useContext(PaginationContext);
  const start = (pageIndex * entries) + 1;
  const end = (pageIndex * entries) + entries;

  return (
    <TableFooter className="table-footer">
      <TableShowResults>Showing {start} to {end} of {totalEntries} entries</TableShowResults>
      <Nav>

        <TableNavButton onClick={() => pageIndex >= 1 ? setPageIndex(pageIndex - 1) : null} >Previous</TableNavButton>

        <TableNavButton onClick={() => setPageIndex(0)} className={`${pageIndex === 0 ? "current" : ""}`}>1</TableNavButton>

        {buildPagination(pageIndex, pageCount).map(index => {
          return ['...'].includes(index) ? 
            <div key={index} >{index}</div> : 
            <TableNavButton key={index-1} onClick={() => setPageIndex(index-1)} className={`${index-1 === pageIndex ? "current" : ""}`}>{index}</TableNavButton>;
        })}

        <TableNavButton onClick={() => setPageIndex(pageCount - 1)} className={`${pageIndex === (pageCount - 1) ? "current" : ""}`}>{pageCount}</TableNavButton>

        <TableNavButton onClick={() => pageIndex < (pageCount - 1) ? setPageIndex(pageIndex + 1) : null} >Next</TableNavButton>

      </Nav>
    </TableFooter>
  )
}