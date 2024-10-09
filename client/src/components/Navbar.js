import { Link } from 'react-router-dom';
import { fetchToken } from './Auth';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthToken = () => {
      //reading from local storage(side effect)
      const token = fetchToken();
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    // As shown below, React uses 'useEffect' to register or add an event
    // listener to the window object.
    // The component listens for this registered event("authChange")
    // It handles the 'authChange'custom event dispatched whenever the
    // authentication status changes(During login or logout)

    // The Event listener performs actions(checkAuthToken) in response to changes
    // in the authentication status.

    // Registering and Deregistering event listeners(Side Effects)
    window.addEventListener('authChange', checkAuthToken);
    return () => {
      window.removeEventListener('authChange', checkAuthToken);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand text-white" to="/">
          CairoCoders
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link active text-white"
                aria-current="page"
                to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/company-profile">
                Company Profile
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            {isLoggedIn ? (
              <p className="text-white">
                Welcome Back
                <span className="h4 mx-2">
                  <i className="bi bi-person"></i>
                </span>
              </p>
            ) : (
              <Link to="/signup" className="btn btn-secondary">
                Sign Up
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
