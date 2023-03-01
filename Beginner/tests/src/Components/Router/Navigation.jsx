import React from "react";
import { Link } from "react-router-dom";
const Navigation = () => {
  return (
    <nav>
      <ul className="flex-column">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Books">Books</Link>
        </li>
        <li>
          <Link to="/Student">Student</Link>
        </li>
        <li>
          <Link to="/Teacher">Teacher</Link>
        </li>
        <li>
          <Link to="/RegisterBook">RegisterBook</Link>
        </li>
        <li>
          <Link to="/Register">Register</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
