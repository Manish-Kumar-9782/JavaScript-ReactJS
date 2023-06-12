import React from "react";
import { useSelector } from "react-redux";
import { selectCourseById } from "./courseSlice";
import { Form } from "react-bootstrap";
const CourseCheckBox = ({ courseId, onChange }) => {
  const course = useSelector((state) => selectCourseById(state, courseId));
  console.log("Course By Id: ", courseId, course);
  return (
    <>
      <Form.Check
        key={courseId}
        id={courseId}
        label={course?.name}
        type="checkbox"
        onChange={onChange}
      />
    </>
  );
};

export default CourseCheckBox;
