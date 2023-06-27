import { styled } from "styled-components"
import { ShowEntriesSelect } from "./ShowEntriesSelect"

const Table = styled.div`
  width: 890px;
`

const TableSeparator = styled.div`
  height: 1px;
  width: 100%;
  background-color: #111;
`

const TableHeader = styled.header`
  display: flex;
  justify-content: space-between;
  height: 30px;

  label, p {
    margin: 0;
  }  
`

const TableShowResults = styled.div`
  display: flex;
  justify-content: space-between;
`

const TableSearch = styled.div`
  display: flex;
  justify-content: space-between;
`

const TableFooter = styled.footer`
  display: flex;
  justify-content: space-between;
`

const TableWrapper = styled.table`
  width: 100%;
  background: #DDD;
  border-spacing: 0 1px;
`

const TableRow = styled.tr`
  height: 34px; // must be fitting font instead
  width: 100%;
  padding: 8px 10px;
  background: #f9f9f9;

  &:nth-child(even) {
    background: #fff;
  }

  .selected {
    background: #f1f1f1;
  }
`

const TD = styled.td`
`

const TableNav = styled.nav`
  display: flex;
  justify-content: space-between;

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

export const DataTable = ({ data }) => {

  return (
    <Table>
      <TableHeader>

        <ShowEntriesSelect />
        <TableSearch><label>Search:&nbsp;<input /></label></TableSearch>

      </TableHeader>

      {/** Table Header */}
      <TableSeparator />
      {/** Table Row */}
      <TableWrapper>
        {data.map((row, index) => <TableRow key={`row-${index}`}><TD>{row.state}</TD><TD>{row.state}</TD><TD>{row.state}</TD><TD>{row.state}</TD></TableRow>)}
      </TableWrapper>
        

      <TableSeparator />
      <TableFooter className="table-footer">
        <TableShowResults>Showing 1 to 1 of 1 entries</TableShowResults>
        <TableNav>
          <div>Previous</div>
          <TableNavButton className="current">1</TableNavButton>
          <TableNavButton>2</TableNavButton>
          <div>Next</div>
        </TableNav>
      </TableFooter>
    </Table>
  )
}
