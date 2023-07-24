import { Link } from "react-router-dom"
import { useContext } from "react";
import { DataTable } from "../components/datatable/DataTable";
import { DataContext } from "../App";

export const Employees = () => {
  const employees = useContext(DataContext);

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

        <DataTable table={table} />

        <Link to='/'>Home</Link>
      </div>
    </main>
  )
}