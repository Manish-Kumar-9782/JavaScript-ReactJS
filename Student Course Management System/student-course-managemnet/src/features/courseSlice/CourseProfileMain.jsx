import React, { useState, useEffect, useDebugValue } from "react";
import CourseProfileSection from "./components/CourseProfileSections";
import CourseProfileHeader from "./components/CourseProfileHeader";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { selectAllSectionIds } from "../../Selectors/course-selectors";

const CourseProfileMain = ({ course }) => {
  const sectionIds = useSelector(selectAllSectionIds, shallowEqual);
  console.log("All sections for current course: ", sectionIds);
  // console.log("CourseTemplate: ", courseTemplate);
  // console.log("course: ", course);

  return (
    <main className="border my-4 p-4">
      <CourseProfileHeader course={course} />

      {sectionIds &&
        sectionIds?.map((section_id) => (
          <CourseProfileSection
            key={section_id}
            sectionId={section_id}
            courseId={course._id}
          />
        ))}
    </main>
  );
};

export default CourseProfileMain;
