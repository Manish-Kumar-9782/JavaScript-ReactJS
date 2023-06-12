import React from "react";
import { Outlet } from "react-router-dom";
import CourseAside from "../features/courseSlice/CourseAside";
const CourseAsideLayout = () => {
  return (
    <div className="row">
      <CourseAside />
      <div className="col">
        <Outlet />
      </div>
    </div>
  );
};

export default CourseAsideLayout;
