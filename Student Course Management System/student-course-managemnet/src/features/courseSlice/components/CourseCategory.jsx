import React from "react";
import { selectCourseCategoryById } from "../../courseCategory/courseCategorySlice";
import { useSelector } from "react-redux";
const CourseCategory = ({ courseCategoryId, display = "inline" }) => {
  const category = useSelector((state) =>
    selectCourseCategoryById(state, courseCategoryId)
  );
  console.log("CourseCategory: ", category);
  const catName = category?.name;

  let content = null;

  if (display === "inline") {
    content = <span>{catName}</span>;
  } else if (display === "block") {
    content = <div>{catName}</div>;
  }

  return content;
};

export default CourseCategory;
