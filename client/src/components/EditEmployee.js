import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const EditEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    address: '',
    salary: ''
  });

  const location = useLocation();
  const navigate = useNavigate();
  const employeeId = location.pathname.split('/')[2];

  const handleChange = (e) => {
    const value = e.target.value;
    setEmployee((prev) => ({ ...prev, [e.target.name]: value }));
  };

  // useEffect is typically used for side effects like data fetching after the
  // component mounts.
  useEffect(() => {
    axios
      .get('http://localhost:1337/employees/' + id)
      .then((res) => {
        setEmployee(res.data.Result[0]);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:1337/employees/${employeeId}`,
        employee
      );
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h3>Edit Employee</h3>
      <form className="row g-3 w-50">
        <div className="col-12">
          <label className="form-label" htmlFor="name">
            Name
          </label>
          <input
            className="form-control"
            type="text"
            id="name"
            name="name"
            placeholder="Enter name"
            autoComplete="off"
            value={employee.name}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            className="form-control"
            type="text"
            id="email"
            name="email"
            placeholder="Enter email"
            autoComplete="off"
            value={employee.email}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <label className="form-label" htmlFor="salary">
            Address
          </label>
          <input
            className="form-control"
            type="text"
            id="address"
            name="address"
            placeholder="Enter salary"
            autoComplete="off"
            value={employee.address}
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <label className="form-label" htmlFor="address">
            Salary
          </label>
          <input
            className="form-control"
            type="number"
            id="salary"
            name="salary"
            placeholder="123 Main St"
            autoComplete="off"
            value={employee.salary}
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <button onClick={handleUpdate} className="btn btn-dark" type="submit">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;
