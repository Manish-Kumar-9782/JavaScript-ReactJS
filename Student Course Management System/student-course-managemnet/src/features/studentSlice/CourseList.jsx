import React from "react";
import CourseListItem from "./CourseListItem";

const CourseList = ({ listItems, contentLength = 10 }) => {
  console.log("Course List items: ", listItems);
  return (
    <ul type="none" className="d-flex gap-1 flex-wrap p-1 m-0">
      {listItems?.map((course) => (
        <CourseListItem
          key={course?._id}
          course={course}
          contentLength={contentLength}
        />
      ))}
    </ul>
  );
};
export default CourseList;
