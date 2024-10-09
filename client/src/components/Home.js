import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [adminCount, setAdminCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [salary, setSalary] = useState(0);

  useEffect(() => {
    //Fetching data from external source(Side Effect)
    axios
      .get('http://localhost:1337/adminCount')
      .then((res) => {
        setAdminCount(res.data[0].admins);
      })
      .catch((err) => console.log(err));

    axios
      .get('http://localhost:1337/employeeCount')
      .then((res) => {
        setEmployeeCount(res.data[0].employees);
      })
      .catch((err) => console.log(err));

    axios
      .get('http://localhost:1337/salary')
      .then((res) => {
        console.log(res);
        setSalary(res.data[0].sumOfSalary);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container-fluid h-custom">
      <div className="row p-3 d-flex justify-content-around mt-3">
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="px-3 pt-2 pb-3 border shadow-sm bg-light h-100 mx-lg-2 custom-card">
            <div className="text-center pb-1">
              <h4>Admins</h4>
            </div>
            <hr />
            <div>
              <h5>Total: {adminCount}</h5>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="px-3 pt-2 pb-3 border shadow-sm bg-light h-100 mx-lg-2 custom-card">
            <div className="text-center pb-1">
              <h4>Employees</h4>
            </div>
            <hr />
            <div>
              <h5>Total: {employeeCount}</h5>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="px-3 pt-2 pb-3 border shadow-sm bg-light h-100 mx-lg-2 custom-card">
            <div className="text-center pb-1">
              <h4>Salary</h4>
            </div>
            <hr />
            <div>
              <h5>Total: {salary}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
