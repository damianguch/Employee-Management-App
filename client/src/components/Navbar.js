import { fetchToken } from './Auth.js';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-gray">
      <div className="container">
        <a className="navbar-brand" href="/">
          CairoCoders
        </a>
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
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/company-profile">
                Company Profile
              </a>
            </li>
          </ul>
          <div className="d-flex">
            {fetchToken() ? (
              <p>
                Welcome
                <span className="h4">
                  <i className="bi bi-person"></i>
                </span>
              </p>
            ) : (
              <a href="/signup" className="btn btn-outline-primary">
                Sign Up
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
