import { styled } from "styled-components"
import { Modal } from "../components/modal/Modal"
import { useContext, useState } from "react"
import { Select } from "../components/select/Select"
import { DatePicker } from "../components/datepicker/DatePicker"
import { DataContext } from "../App"
import { states } from "../data/States"

/**
 * TODO:
 */
export const CreateEmployee = () => {
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
        department: departmentValue ?? '-',
        street: street.value,
        city: city.value,
        state: stateValue ?? '-',
        zipCode: zipCode.value
    };
    employees.push(employee);
    setShow(true);
  }

  const [show, setShow] = useState(false);
  const [departmentValue, setDepartmentValue] = useState('-');
  const [stateValue, setStateValue] = useState('-');
  const [birthValue, setBirthValue] = useState('-');
  const [startValue, setStartValue] = useState('-');

  const options = [
    { value: 'Sales', label: 'Sales' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Human Resources', label: 'Human Resources' },
    { value: 'Legal', label: 'Legal' }
  ]

  return (
    <PageWrapper>
      <div className="container">
        <h1>Create Employee</h1>
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
                  ],
                  // allowTimes: ['21:26','10:05','11:00','13:06'],
                  yearStart: 1970,
                  yearEnd: 2030,
                  timepickerScrollbar: false,
                  inverseButton: true,
                  // todayButton: false,
                  weekends: ['08/09/2023']
                }}
              />
            </InputWrapper>
          </InputsRow>
 

          <fieldset className="address">
            <legend>Address</legend>

            <InputsRow>
              <InputWrapper>
                <label htmlFor="street">Street</label>
                <input id="street" type="text" />
              </InputWrapper>
              <InputWrapper><label htmlFor="city">City</label>
                <input id="city" type="text" />
              </InputWrapper>
            </InputsRow>

            <InputsRow>              
              <InputWrapper>
                <label htmlFor="state">State</label>
                <Select
                  options={states} 
                  onChange={(value) => setStateValue(value)}
                />      
                </InputWrapper>
                <InputWrapper>
                <label htmlFor="zip-code">Zip Code</label>
                <input id="zip-code" type="number" />
              </InputWrapper>
            </InputsRow>
          </fieldset>
        
          <InputsRow>
            <label htmlFor="department">Department</label>
            <Select
              options={options} 
              onChange={(value) => setDepartmentValue(value)}
            />
          </InputsRow>
        </Form>

        <SaveButton className="save" onClick={() => saveEmployee()}>Save</SaveButton>
      </div>
      <Modal onClose={() => setShow(false)} show={show}>
        Employee Created!
      </Modal>

    </PageWrapper>
  )
}


/**
 * Styled Components
 */
const PageWrapper = styled.main`
  font-family: 'Signika Negative', sans-serif;
  
  h1 {
    color: rgba(103, 113, 139, 1);
  }

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
  max-width: 400px;

  label {
    margin: 14px 0 8px;
  }
  fieldset
  {
    padding: 16px;	
    border-radius: 10px;
    border: 1px solid #2C71E1;
  }
  legend
  {
    color: #2C71E1;
    margin-left: 80%;
  }
`

const InputWrapper = styled.div`
`

const InputsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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