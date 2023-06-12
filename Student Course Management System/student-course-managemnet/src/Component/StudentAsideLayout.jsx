import React from "react";
import StudentAside from "../features/studentSlice/StudentAside";
import { Outlet } from "react-router-dom";
/**
 *
 * Here also we will dispatch all the action to load the student data.
 */

const StudentAsideLayout = () => {
  return (
    <div className="d-flex gap-3 pt-3">
      <StudentAside />
      <Outlet />
    </div>
  );
};

export default StudentAsideLayout;
