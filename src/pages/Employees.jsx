import { Link } from "react-router-dom"

export const Employees = () => {
  return (
    <body>
      <div id="employee-div" className="container">
        <h1>Current Employees</h1>
        <table id="employee-table" className="display" />
        <Link to='/'>Home</Link>
      </div>
    </body>
  )
}