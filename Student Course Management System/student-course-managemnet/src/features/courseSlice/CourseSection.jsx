import React from "react";
import CourseCard from "./CourseCard";
import { useSelector } from "react-redux";
import { selectAllCourses } from "./courseSlice";
const CourseSection = () => {
  const courses = useSelector(selectAllCourses);

  return (
    <div className="d-flex gap-4 flex-wrap">
      {courses.map((course) => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
  );
};

export default CourseSection;
