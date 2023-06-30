import { Link } from "react-router-dom"
import { DataTable } from "../components/datatable/DataTable";
import dataMocks from "../employees.json"

export const Employees = () => {

  const employees = JSON.parse(localStorage.getItem('employees'));
  const useMocks = true;

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
    data: useMocks ? dataMocks : employees,
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