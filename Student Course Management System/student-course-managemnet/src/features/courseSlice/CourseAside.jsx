import React from "react";
import { NavLink } from "react-router-dom";
const CourseAside = () => {
  return (
    <div className="col-2 nav">
      <ul className="list-group">
        <li className="list-group-item">
          <NavLink to="/courses">All Courses</NavLink>
        </li>
        <li className="list-group-item">
          <NavLink to="/courses/addCourse">Add Course</NavLink>
        </li>
        <li className="list-group-item">
          <NavLink to="/courses/updateCourse">Update Course</NavLink>
        </li>
        <li className="list-group-item">
          <NavLink to="/courses/addCourseCategory">Add Course Category</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default CourseAside;
