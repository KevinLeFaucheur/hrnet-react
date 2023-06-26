import { Link } from "react-router-dom"
import { styled } from "styled-components"


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

export const Employees = () => {

  const employees = JSON.parse(localStorage.getItem('employees'));

  // document.getElementById('#employee-table').DataTable({
  //     data: employees,
  //     columns: [
  //         { title: 'First Name', data: 'firstName' },
  //         { title: 'Last Name', data: 'lastName' },
  //         { title: 'Start Date', data: 'startDate' },
  //         { title: 'Department', data: 'department' },
  //         { title: 'Date of Birth', data: 'dateOfBirth' },
  //         { title: 'Street', data: 'street' },
  //         { title: 'City', data: 'city' },
  //         { title: 'State', data: 'state' },
  //         { title: 'Zip Code', data: 'zipCode' },
  //     ]
  // });

  return (
    <main>
      <div id="employee-div" className="container">
        <h1>Current Employees</h1>
        <table id="employee-table" className="display" />

        {/** Temporary Table */}
        <Table>
          <TableHeader>
            <TableShow>
              <label htmlFor="entries">
                Show&nbsp;
                <select name="entries" id="entries">
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                &nbsp;Entries
              </label>
            </TableShow>
            <TableSearch>
              <label>Search:&nbsp;<input /></label>
              
            </TableSearch>
          </TableHeader>


          {/** Table Header */}
          <TableSeparator />
          {/** Table Row */}
          <TableWrapper>
            <TableRow><TD>AL</TD><TD>AL</TD><TD>AL</TD><TD>AL</TD></TableRow>
            <TableRow><TD>AL</TD><TD>AL</TD><TD>AL</TD><TD>AL</TD></TableRow>
            <TableRow><TD>AL</TD><TD>AL</TD><TD>AL</TD><TD>AL</TD></TableRow>
            <TableRow><TD>AL</TD><TD>AL</TD><TD>AL</TD><TD>AL</TD></TableRow>
            <TableRow><TD>AL</TD><TD>AL</TD><TD>AL</TD><TD>AL</TD></TableRow>
            <TableRow><TD>AL</TD><TD>AL</TD><TD>AL</TD><TD>AL</TD></TableRow>
            <TableRow><TD>AL</TD><TD>AL</TD><TD>AL</TD><TD>AL</TD></TableRow>
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
        {/** Temporary Table */}

        <Link to='/'>Home</Link>
      </div>
    </main>
  )
}