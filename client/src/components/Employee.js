import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Employee = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:1337/employees')
      .then((res) => {
        if (res.data.Status === 'Success') {
          console.log(res);
          setData(res.data.Result);
        } else {
          alert('Error');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="px-5 py-3">
      <div className="d-flex justify-content-center mt-3">
        <h3>Employee List</h3>
      </div>
      <Link to="/create" className="btn btn-success">
        Add Employee
      </Link>
      <div className="mt-3">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((employee, index) => {
              return (
                <tr key={index}>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.address}</td>
                  <td>{employee.salary}</td>
                  <td>
                    <Link
                      to={'/edit-employee/' + employee.id}
                      className="btn btn-primary btn-sm me-2">
                      Edit
                    </Link>
                    <button className="btn btn-sm btn-danger">Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
