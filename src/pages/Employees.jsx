import { Link } from "react-router-dom"
import { styled } from "styled-components"


const Table = styled.div`
  width: 890px;
`

const TableSeparator = styled.div`
  height: 1px;
  width: 100%;
  background-color: black;
`

const TableHeader = styled.header`
  display: flex;
  justify-content: space-between;
  height: 30px;

  label, p {
    margin: 0;
  }  
`

const TableShow = styled.div`
  display: flex;
  justify-content: space-between;
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

const TableNav = styled.nav`
  display: flex;
  justify-content: space-between;
`

export const Employees = () => {
  return (
    <main>
      <div id="employee-div" className="container">
        <h1>Current Employees</h1>
        <table id="employee-table" className="display" />

        {/** Temporary Table */}
        <Table>
          <TableHeader>
            <TableShow>
              <label htmlFor="entries">Show</label>
              <select name="entries" id="entries">
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
              <p>entries</p>
            </TableShow>
            <TableSearch>
              <label>Search:</label>
              <input />
            </TableSearch>
          </TableHeader>


          {/** Header */}
          <TableSeparator />
          {/** Table Row */}

          <TableSeparator />
          <TableFooter className="table-footer">
            <TableShowResults>Showing 1 to 1 of 1 entries</TableShowResults>
            <TableNav>
              <div>Previous</div>
              <button>1</button>
              <button>1</button>
              <div>Next</div>
            </TableNav>
          </TableFooter>
        </Table>
        {/** Temporary Table */}

        <Link to='/'>Home</Link>
      </div>
    </main>
  )
}