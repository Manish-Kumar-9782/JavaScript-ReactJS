import React from "react";
import { Link } from "react-router-dom";
const Navigation = () => {
  return (
    <div className="border col-2">
      <ul
        style={{
          listStyleType: "none",
        }}
        className="d-flex flex-column list-group"
      >
        <li className="list-group-item border">
          <Link to="/">
            <i class="bi bi-pie-chart-fill"></i> Dashboard
          </Link>
        </li>

        <li className="list-group-item border">
          <Link to="/student">
            <i class="bi bi-pie-chart-fill"></i> Student
          </Link>
        </li>

        <li className="list-group-item border">
          <Link to="/teacher">
            <i class="bi bi-pie-chart-fill"></i> Teacher
          </Link>
        </li>

        <li className="list-group-item border">
          <Link to="/books">
            <i class="bi bi-pie-chart-fill"></i> Books
          </Link>
        </li>

        <li className="list-group-item border">
          <Link to="/issue">
            <i class="bi bi-pie-chart-fill"></i> Issue
          </Link>
        </li>

        <li className="list-group-item border">
          <Link to="/registrations">
            <i class="bi bi-pie-chart-fill"></i> Registrations
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
