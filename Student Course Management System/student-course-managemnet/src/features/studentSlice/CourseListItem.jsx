import React from "react";
import { useSelector } from "react-redux";
import { selectCourseById } from "../courseSlice/courseSlice";

const CourseListItem = ({ course, contentLength = 10 }) => {
  const content =
    course?.name.length > contentLength
      ? course?.name.slice(0, contentLength).padEnd(contentLength + 3, ".")
      : course?.name;

  return <li className="border rounded p-1">{content}</li>;
};

export default CourseListItem;
