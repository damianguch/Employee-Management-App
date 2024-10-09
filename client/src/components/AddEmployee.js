import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
  // const [name, setName] = useState('');
  //const [email, setEmail] = useState('');
  //const [salary, setSalary] = useState('');
  //const [address, setAddress] = useState('');
  const [registerStatus, setRegisterStatus] = useState('');

  const [employeeData, setEmployeeData] = useState({
    name: '',
    email: '',
    address: '',
    salary: ''
  });

  const navigate = useNavigate();

  // Using the Functional Form of State Setter function provided by useState
  /**
   * When setEmployeeData is called with a function, React automatically
   * passes the current state (before the update) as an argument to this
   * function. This current state is what "prev" refers to.
   */
  const handleChange = (e) => {
    const value = e.target.value;
    setEmployeeData((prev) => ({
      ...prev,
      [e.target.name]: value
    }));
  };

  const create = (e) => {
    e.preventDefault();

    const employeeInfo = {
      name: employeeData.name,
      email: employeeData.email,
      address: employeeData.address,
      salary: employeeData.salary
    };

    axios
      .post('http://localhost:1337/employees', employeeInfo)
      .then((res) => {
        console.log(res);
        if (res.data.message) {
          setRegisterStatus(res.data.message);
        } else {
          navigate('/employees');
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h4>Add Employee</h4>
      <form className="row g-3 w-50">
        <h1
          style={{
            color: 'red',
            fontSize: '15px',
            textAlign: 'center',
            marginTop: '20px'
          }}>
          {registerStatus}
        </h1>
        <div className="col-12">
          <label className="form-label" htmlFor="name">
            Name
          </label>
          <input
            onChange={handleChange}
            className="form-control"
            type="text"
            id="name"
            name="name"
            placeholder="Enter name"
            autoComplete="off"
          />
        </div>

        <div className="col-12">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            onChange={handleChange}
            className="form-control"
            type="text"
            id="email"
            name="email"
            placeholder="Enter email"
            autoComplete="off"
          />
        </div>

        <div className="col-12">
          <label className="form-label" htmlFor="salary">
            Salary
          </label>
          <input
            onChange={handleChange}
            className="form-control"
            type="number"
            id="salary"
            name="salary"
            placeholder="Enter salary"
            autoComplete="off"
          />
        </div>
        <div className="col-12">
          <label className="form-label" htmlFor="address">
            Address
          </label>
          <input
            onChange={handleChange}
            className="form-control"
            type="text"
            id="address"
            name="address"
            placeholder="123 Main St"
            autoComplete="off"
          />
        </div>
        <div className="col-12">
          <button onClick={create} className="btn btn-dark" type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
