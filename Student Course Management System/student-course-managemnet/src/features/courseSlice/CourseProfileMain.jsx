import React, { useState, useEffect, useDebugValue } from "react";
import CourseProfileSection from "./components/CourseProfileSections";
import CourseProfileHeader from "./components/CourseProfileHeader";
import { useSelector, useDispatch } from "react-redux";
import { selectCourseTemplateById } from "../courseContentTemplate/courseContentTemplateSlice";
import { selectAllSections } from "../courseContentTemplate/courseSectionsSlice";

import {
  getCourseTopicStatus,
  fetchCourseTopics,
  getAllTopics,
} from "../courseContentTemplate/courseTopicSlice";

const CourseProfileMain = ({ course }) => {
  const courseTemplate = useSelector((state) =>
    selectCourseTemplateById(state, course?._id)
  );
  const dispatch = useDispatch();
  const topicStatus = useSelector(getCourseTopicStatus);
  const allTopics = useSelector(getAllTopics);

  useEffect(() => {
    if (topicStatus === "idle") {
      dispatch(fetchCourseTopics(course._id));
    }
  }, []);

  const sections = useSelector(selectAllSections);

  console.log("All sections for current course: ", sections);
  // console.log("CourseTemplate: ", courseTemplate);
  // console.log("course: ", course);

  return (
    <main className="border my-4 p-4">
      <CourseProfileHeader course={course} />

      {sections?.map((section) => (
        <CourseProfileSection
          key={section._id}
          section={section}
          courseId={course._id}
        />
      ))}
    </main>
  );
};

export default CourseProfileMain;
