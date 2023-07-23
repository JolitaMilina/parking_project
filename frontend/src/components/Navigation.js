import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a class="navbar-brand" href="/">
            <span class="fs-4">PARKING</span>
            <span class="fw-light fst-italic text-danger">track</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/administration">
                  Administration
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/entries">
                  Entries
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/upload">
                  Upload
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
