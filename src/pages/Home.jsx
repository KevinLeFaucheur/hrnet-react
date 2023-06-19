import { Link } from "react-router-dom"
import { styled } from "styled-components"
import { states } from "../data/States"

const HomeWrapper = styled.main`

  button {
    margin-top: 1rem;
  }

  dialog {
    position: relative;
    border: none;
    border-radius: 8px;
    max-width: 500px;
    width: 90%;
    padding: 15px 30px;
    vertical-align: middle;
    overflow: hidden;

    &::backdrop {
      background: rgba(0, 0, 0, 0.75);
    }

    .close-modal {
      position: absolute;
      /* top: -12.5px; */
      right: 25px;
      color: black;

      i {
        font-size: 1.5rem;
      }
    }
  }
`

export const Home = () => {

  const saveEmployee = () => {
    document.getElementById('confirmation').showModal();
  }

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
          <input id="date-of-birth" type="text" />

          <label htmlFor="start-date">Start Date</label>
          <input id="start-date" type="text" />

          <fieldset className="address">
            <legend>Address</legend>

            <label htmlFor="street">Street</label>
            <input id="street" type="text" />

            <label htmlFor="city">City</label>
            <input id="city" type="text" />

            <label htmlFor="state">State</label>
            <select name="state" id="state">
              {states.map(state => <option key={state.abbreviation} >{state.name}</option>)}
            </select>

            <label htmlFor="zip-code">Zip Code</label>
            <input id="zip-code" type="number" />
          </fieldset>

          <label htmlFor="department">Department</label>
          <select name="department" id="department">
            <option>Sales</option>
            <option>Marketing</option>
            <option>Engineering</option>
            <option>Human Resources</option>
            <option>Legal</option>
          </select>
        </form>

        <button onClick={() => saveEmployee()}>Save</button>
      </div>
      <dialog id="confirmation" className="modal">
        Employee Created!
        <a 
          aria-label="Close"
          onClick={() => document.getElementById('confirmation').close()} 
          href="#close-modal" 
          rel="modal:close" 
          className="close-modal">
            <i className="fa-solid fa-circle-xmark" aria-hidden="true" />
        </a>
      </dialog>
    </HomeWrapper>
  )
}