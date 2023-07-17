import { useContext } from "react"
import { styled } from "styled-components"
import { PaginationContext } from "./DataTable"
import { TableShowResults } from "./TableEntriesSelect"
import { Pagination } from "./Pagination"

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

export const TableNav = ({ entries, totalEntries }) => {
  const { pageIndex, setPageIndex, pageCount } = useContext(PaginationContext);

  return (
    <TableFooter className="table-footer">
      <TableShowResults pageIndex={pageIndex} entries={entries} totalEntries={totalEntries} />

      <Nav>
        <Pagination pageIndex={pageIndex} pageCount={pageCount} setPageIndex={setPageIndex} />
      </Nav>
    </TableFooter>
  )
}