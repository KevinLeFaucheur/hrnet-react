import { styled } from "styled-components"
import { states } from "../data/States"
import { Modal } from "../components/modal/Modal"
import { useContext, useState } from "react"
import { Select } from "../components/select/Select"
import { DatePicker } from "../components/datepicker/DatePicker"
import { DataContext } from "../App"

const HomeWrapper = styled.main`
  font-family: 'Signika Negative', sans-serif;

  input {
    background-color: #F8F9FD;
    border: none;
    border-radius: 3px;
    height: 30px;
  }
  input:focus {
    outline: 2px solid #1ebaf7;
  }
  
`

const Form = styled.form`
  width: 80%;

  fieldset
  {
    /* background-color:#CCC;
    max-width: 500px; */
    padding: 16px;	
    border-radius: 10px;
    border: 1px solid #2C71E1;
  }
  legend
  {
    margin-left: 80%;
  }
`

const InputWrapper = styled.div`
`

const InputsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  margin-bottom: 2.5rem;
`

const SaveButton = styled.button`
  margin: 1rem 0 10%;;
  appearance: none;
  border-radius: 25px;
  border: none;
  background-color: #2C71E1;
  color: #fff;
  padding: 10px;
  width: 120px;
`

/**
 * TODO:
 */
export const Home = () => {
  const employees = useContext(DataContext);

  const saveEmployee = () => {
    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const street = document.getElementById('street');
    const city = document.getElementById('city');
    const zipCode = document.getElementById('zip-code');

    const employee = {
        firstName: firstName.value,
        lastName: lastName.value,
        dateOfBirth: birthValue,
        startDate: startValue,
        department: departmentValue,
        street: street.value,
        city: city.value,
        state: stateValue,
        zipCode: zipCode.value
    };
    employees.push(employee);
    setShow(true);
  }

  const [show, setShow] = useState(false);
  const [departmentValue, setDepartmentValue] = useState(null);
  const [stateValue, setStateValue] = useState(null);
  const [birthValue, setBirthValue] = useState(null);
  const [startValue, setStartValue] = useState(null);

  const options = [
    { value: 'Sales', label: 'Sales' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Human Resources', label: 'Human Resources' },
    { value: 'Legal', label: 'Legal' }
  ]

  return (
    <HomeWrapper>
      {/* <div className="title">
          <h1>HRnet</h1>
      </div> */}
      <div className="container">
        {/* <Link to='/employees'>View Current Employees</Link> */}
        <h2>Create Employee</h2>
        <Form action="#" id="create-employee">
        <InputsRow>
          <InputWrapper>
            <label htmlFor="first-name">First Name</label>
            <input type="text" id="first-name" />
          </InputWrapper>

          <InputWrapper>
            <label htmlFor="last-name">Last Name</label>
            <input type="text" id="last-name" />
          </InputWrapper>
        </InputsRow>

          <InputsRow>
            <InputWrapper>              
              <label htmlFor="date-of-birth">Date of Birth</label>
              <DatePicker 
                id='birth' 
                onChange={(value) => setBirthValue(value)}
              />
            </InputWrapper>
            <InputWrapper>
              <label htmlFor="start-date">Start Date</label>
              <DatePicker 
                id='start'
                onChange={(value) => setStartValue(value)} 
                options={{ 
                  locale: 'fr', 
                  timepicker: true, 
                  highlightedDates: [
                    '06/30/2023, Test',
                    '07/2/2023, Birthday',
                    '07/7/2023, Exam',
                    '07/7/2023, Party',
                    '07/18/2023, Another Test, hlCyan',
                  ],
                  highlightedPeriods: [
                    '06/1/2023, 06/18/2023, holidays, hlGreen',
                    '07/1/2023, 07/8/2023, practice, hlGreen',
                    ['12/1/2023', '12/18/2023', 'winter', 'hlCyanPlain']
                  ]
                }}
              />
            </InputWrapper>
          </InputsRow>
 

          <fieldset className="address">
            <legend>Address</legend>
          {/* <InputsRow></InputsRow> */}
          {/* <InputWrapper></InputWrapper> */}

            <InputsRow>
              <InputWrapper>
                <label htmlFor="street">Street</label>
                <input id="street" type="text" />
              </InputWrapper>
              <InputWrapper><label htmlFor="city">City</label>
                <input id="city" type="text" />
              </InputWrapper>
            </InputsRow>

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
        </Form>

        <SaveButton className="save" onClick={() => saveEmployee()}>Save</SaveButton>
      </div>
      <Modal onClose={() => setShow(false)} show={show}>
        Employee Created!
      </Modal>

    </HomeWrapper>
  )
}