import { styled } from "styled-components"

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

export const TableNav = () => {
  return (
    <TableFooter className="table-footer">
      <TableShowResults>Showing 1 to 1 of 1 entries</TableShowResults>
      <Nav>
        <div>Previous</div>
        <TableNavButton className="current">1</TableNavButton>
        <TableNavButton>2</TableNavButton>
        <div>Next</div>
      </Nav>
    </TableFooter>
  )
}
