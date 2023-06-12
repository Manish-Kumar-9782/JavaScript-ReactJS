import React from "react";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <header className="d-flex justify-content-between bg-primary text-light p-3 align-items-center mb-3">
      <h1>Student Course Management System</h1>

      <nav>
        <ul type="none" className="d-flex gap-5 px-3 fs-4">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/students">Students</NavLink>
          </li>
          <li>
            <NavLink to="/courses">Courses</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
