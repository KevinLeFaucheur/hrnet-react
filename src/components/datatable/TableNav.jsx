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
    background: #333333;

  }
  padding: 0.5em 1em;
`

export const TableNav = ({ entries, totalEntries }) => {
  const { pageIndex, setPageIndex, pageCount } = useContext(PaginationContext);
  const start = (pageIndex * entries) + 1;
  const end = (pageIndex * entries) + entries;

  return (
    <TableFooter className="table-footer">
      <TableShowResults>Showing {start} to {end} of {totalEntries} entries</TableShowResults>
      <Nav>
        <div>Previous</div>
        <TableNavButton onClick={() => setPageIndex(pageIndex - 1)} className="current">{pageIndex + 1}</TableNavButton>
        {pageIndex <= pageCount ?
        <>
          <TableNavButton onClick={() => setPageIndex(pageIndex + 1)} >{pageIndex + 2}</TableNavButton>
          <div>Next</div>
        </> : ''}
      </Nav>
    </TableFooter>
  )
}
