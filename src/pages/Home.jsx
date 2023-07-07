import { Link } from "react-router-dom"
import { styled } from "styled-components"
import { states } from "../data/States"
import { Modal } from "../components/modal/Modal"
import { useState } from "react"
import { Select } from "../components/select/Select"
import { DatePicker } from "../components/datepicker/DatePicker"

const HomeWrapper = styled.main`
  button {
    margin-top: 1rem;
  }
`

/**
 * TODO:
 *  - When modal opens, selects are not occluded
 *  - When modal opens, isolate modal accessibility (tabindex) 
 */

export const Home = () => {

  const saveEmployee = () => {
    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const dateOfBirth = document.getElementById('date-of-birth');
    const startDate = document.getElementById('start-date');
    // const department = document.getElementById('department');
    const street = document.getElementById('street');
    const city = document.getElementById('city');
    // const state = document.getElementById('state');
    const zipCode = document.getElementById('zip-code');

    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const employee = {
        firstName: firstName.value,
        lastName: lastName.value,
        dateOfBirth: dateOfBirth.value,
        startDate: startDate.value,
        department: departmentValue /*department.value*/,
        street: street.value,
        city: city.value,
        state: stateValue /*state.value*/,
        zipCode: zipCode.value
    };
    employees.push(employee);
    localStorage.setItem('employees', JSON.stringify(employees));
    // document.getElementById('confirmation').showModal();
    setShow(true);
  }

  const [show, setShow] = useState(false);
  const [departmentValue, setDepartmentValue] = useState(null);
  const [stateValue, setStateValue] = useState(null);

  const options = [
    { value: 'Sales', label: 'Sales' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Human Resources', label: 'Human Resources' },
    { value: 'Legal', label: 'Legal' }
  ]

  return (
    <HomeWrapper>
      <div className="title">
          <h1>HRnet</h1>
      </div>
      <div className="container">
        <Link to='/employees'>View Current Employees</Link>
        <h2>Create Employee</h2>
        <form action="#" id="create-employee">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" />

          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" />

          <label htmlFor="date-of-birth">Date of Birth</label>
          <input id="date-of-birth" type="text" onFocus={(e) => e.target.type='date'} onBlur={(e) => e.target.type='text'} />

          <label htmlFor="start-date">Start Date</label>
          <input id="start-date" type="text" onFocus={(e) => e.target.type='date'} onBlur={(e) => e.target.type='text'} />

          <DatePicker />

          <fieldset className="address">
            <legend>Address</legend>

            <label htmlFor="street">Street</label>
            <input id="street" type="text" />

            <label htmlFor="city">City</label>
            <input id="city" type="text" />

            <label htmlFor="state">State</label>
            <Select
              options={states} 
              onChange={(value) => setStateValue(value)}
            />

            <label htmlFor="zip-code">Zip Code</label>
            <input id="zip-code" type="number" />
          </fieldset>

          <label htmlFor="department">Department</label>
          <Select
            options={options} 
            onChange={(value) => setDepartmentValue(value)}
          />
        </form>

        <button onClick={() => saveEmployee()}>Save</button>
      </div>
      <Modal /*header='Hello World' footer={<button onClick={() => setShow(false)}>Close</button>}*/ onClose={() => setShow(false)} show={show}>
        Employee Created!
      </Modal>

    </HomeWrapper>
  )
}