import React, { useState } from 'react';
import axios from 'axios';

export const SignUp = () => {
  // const [email, setEmail] = useState('');
  // const [name, setName] = useState('');
  // const [password, setPassword] = useState('');
  const [registerStatus, setRegisterStatus] = useState('');

  /**
   * The approach below, the component's state remains in sync with the
   * input fields, allowing for controlled component behavior where the
   * state drives the form's UI and vice versa.
   */

  const [data, setData] = React.useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setData({ ...data, [e.target.name]: value });
  };

  const register = async (e) => {
    e.preventDefault();

    const userData = {
      name: data.name,
      email: data.email,
      password: data.password
    };

    try {
      const response = await axios.post(
        'http://localhost:1337/register',
        userData
      );

      if (response.data.message) {
        setRegisterStatus(response.data.message);
      } else {
        setRegisterStatus('Account Created Successfully');
      }
    } catch (err) {
      if (err.response) {
        console.error(err.response.data);
      } else if (err.request) {
        // The request was made but no response was received
        console.error(err.request);
      } else {
        console.error('Error message:', err.message);
      }
    }
  };

  let img_sign = [
    'https://as2.ftcdn.net/v2/jpg/03/39/70/91/1000_F_339709132_H9HSSTtTmayePcbARkTSB2qoZTubJ6bR.jpg'
  ];
  return (
    <div className="container" style={{ paddingTop: 60 }}>
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={register}>
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <p className="lead fw-normal me-3">Create Your Account</p>
              </div>
              <p>
                <h1
                  style={{
                    color: 'green',
                    fontSize: '20px',
                    textAlign: 'center',
                    marginTop: '20px'
                  }}>
                  {registerStatus}
                </h1>
              </p>

              <div className="form-outline mb-4">
                <input
                  onChange={handleChange}
                  type="text"
                  id="name"
                  name="name"
                  className="form-control form-control-lg"
                  placeholder="Enter your Name"
                  required
                />

                <label htmlFor="name">Name</label>
              </div>

              <div className="form-outline mb-4">
                <input
                  onChange={handleChange}
                  type="email"
                  id="email"
                  name="email"
                  className="form-control form-control-lg"
                  placeholder="Enter your Email Address"
                  required
                />

                <label htmlFor="email" className="form-label">
                  Email address
                </label>
              </div>

              <div className="form-outline mb-3">
                <input
                  onChange={handleChange}
                  type="password"
                  id="password"
                  name="password"
                  className="form-control form-control-lg"
                  placeholder="Enter your Password"
                  required
                />

                <label htmlFor="password" className="form-label">
                  Password
                </label>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check mb-0">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    id="remember"
                  />
                  <label className="form-check-label" htmlFor="remember">
                    Remember Me
                  </label>
                </div>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button type="submit" className="btn btn-primary">
                  Sign Up
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Already Have An Account?
                  <a href="/login" className="link-danger p-2">
                    Login
                  </a>
                </p>
              </div>
            </form>
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4">
            <img src={img_sign[0]} alt="logo" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
};
