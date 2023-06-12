import React from "react";
import { NavLink } from "react-router-dom";
const StudentAside = () => {
  return (
    <aside className="nav">
      <ul className="list-group">
        <li className="list-group-item">
          <NavLink to="/students">Student Courses</NavLink>
        </li>
        <li className="list-group-item">
          <NavLink to="/students/addStudent">Add Student</NavLink>
        </li>
        <li className="list-group-item">
          <NavLink to="/students/dropStudent">Drop Student</NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default StudentAside;
