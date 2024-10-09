import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Employee = () => {
  /**
   * useState([]) initializes 'data' with an empty array and returns an array
   * with the current state and a function to update it (setData).
   */
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch the list of employees when the component mounts
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

  /**
   * window.location.reload() will reload the entire page
   * To update a specific component without refreshing the entire page, you can
   * use state management to re-render the relevant component.
   *
   * 1. Use a state variable to hold the data.
   * 2. Update the state variable by removing the deleted item from the data
   * when the delete request is successful which causes the component to
   * re-render and display the updated list without a full page reload.
   */

  const handleDelete = (id) => {
    axios
      .delete('http://localhost:1337/employees/' + id)
      .then((res) => {
        if (res.data.Status === 'Success') {
          // Update the state to remove the deleted employee
          setData(data.filter((employee) => employee.id !== id));
          // window.location.reload(true);
        } else {
          alert('Error');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="px-5 py-3">
      <div className="d-flex justify-content-center mt-3">
        <h3>Employee List</h3>
      </div>
      <Link to="/create" className="btn btn-dark">
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
                      className="btn btn-dark btn-sm me-2">
                      Edit
                    </Link>
                    <button
                      onClick={(e) => handleDelete(employee.id)}
                      className="btn btn-sm btn-danger">
                      Delete
                    </button>
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
