import { Link } from "react-router-dom"
import { DataTable } from "../components/datatable/DataTable";

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

  const table = {
    data: employees,
    columns: [
        { title: 'First Name', data: 'firstName' },
        { title: 'Last Name', data: 'lastName' },
        { title: 'Start Date', data: 'startDate' },
        { title: 'Department', data: 'department' },
        { title: 'Date of Birth', data: 'dateOfBirth' },
        { title: 'Street', data: 'street' },
        { title: 'City', data: 'city' },
        { title: 'State', data: 'state' },
        { title: 'Zip Code', data: 'zipCode' },
    ]
  };

  return (
    <main>
      <div id="employee-div" className="container">
        <h1>Current Employees</h1>

        {/** Temporary Table */}
        <DataTable table={table} />
        {/** Temporary Table */}

        <Link to='/'>Home</Link>
      </div>
    </main>
  )
}