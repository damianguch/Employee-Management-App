import { useState } from 'react';
import img_log from './img-log.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setData({ ...data, [e.target.name]: value });
  };

  const login = (e) => {
    e.preventDefault();

    const userData = {
      email: data.email,
      password: data.password
    };

    axios
      .post('http://localhost:1337/login', userData)
      .then((response) => {
        console.log(response);
        if (response.data.Status === 'Success') {
          navigate('/');
        } else {
          setError(response.data.Error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="container" style={{ paddingTop: 60 }}>
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-4 col-lg-6 col-xl-5">
            <img src={img_log} alt="login-logo" className="img-fluid rounded" />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={login}>
              <div className="d-flex flex-row align-content-center justify-content-center justify-content-lg-start">
                <p className="lead fw-normal me-2">Login to your account</p>
              </div>
              <p
                style={{
                  color: 'red',
                  fontSize: '20px',
                  textAlign: 'center',
                  marginTop: '20px'
                }}>
                {error && error}
              </p>
              <div className="form-outline mb-4">
                <input
                  onChange={handleChange}
                  className="form-control form-control-lg"
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  required
                />
                <label className="form-label" htmlFor="email">
                  Email Address
                </label>
              </div>
              <div className="form-outline mb-3">
                <input
                  onChange={handleChange}
                  className="form-control form-control-lg"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  required
                />
                <label className="form-label" htmlFor="password">
                  Password
                </label>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    name="remember"
                    id="remember"
                  />
                  <label className="form-check-label" htmlFor="remember">
                    Remember Me
                  </label>
                </div>
                <a className="text-body" href="/forget-password">
                  Forgot Password
                </a>
              </div>
              <div className="text-center text-lg-start mt-4 pt2">
                <button className="btn btn-primary" type="submit">
                  Login
                </button>
                <p className="small fw-bold mt-2 pt-1">
                  Don't Have an Account Yet?{' '}
                  <a className="link-danger" href="/signup">
                    Sign Up
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
