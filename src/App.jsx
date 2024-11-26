
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App() {

  const [employees,setEmployees] = useState([])

  const handleSubmit = e =>{
    e.preventDefault()
    const email = e.target.email.value;
    const name = e.target.name.value;
    const users = {email,name}
    console.log(users);
    fetch('http://localhost:5000/employee',{
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(users)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const newEmployee = [...employees, data]
      setEmployees(newEmployee)
    })
  }

  useEffect(()=>{
    fetch('http://localhost:5000/employee')
    .then(res => res.json())
    .then(data => setEmployees(data))
  },[])

  return (
    <>
      <h1>User Management System</h1>
      <h1>{employees.length}</h1>

      <form onSubmit={handleSubmit}>
        <input type="email" name="email" id="" />
        <br />
        <input type="text" name="name" id="" />
        <br />
        <input type="submit" value="Add User" />
      </form>

      {
        employees.map(employee => <> <h1> {employee.employee_id} : {employee.name}</h1> </>)
      }
    </>
  )
}

export default App
