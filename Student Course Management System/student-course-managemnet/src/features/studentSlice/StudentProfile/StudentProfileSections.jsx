import React from "react";
import { useParams } from "react-router-dom";
import { selectCourseProfileById } from "../../../Selectors/student-course-selector";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  useFetchStudentRecord,
  useFetchCourseTemplates,
} from "../../../Hooks/record-loader";
import StudentCourseSection from "./StudentCourseSection";
/**
 *  This component will select all the available section for the selected user and then it will load then one by one.
 *  We also need to course Profile data to display on it.
 *
 * // we need student id, student course section id, and student course sections topic id as well to update the section and its topics.
 */
const StudentProfileSections = () => {
  const { course_id, student_id } = useParams();
  /**
   * course_id: it is the course template id to fetch the course content from the template.
   * student_id: it is the id of the student to fetch the courseProfile content from its individual student
   * course entries.
   */
  useFetchStudentRecord({
    studentId: student_id,
    courseId: course_id,
    fetchStudentCourses: true,
    fetchStudentSection: true,
    fetchStudentTopics: true,
  }); // Now fetch all the records if not already fetched.

  // getting the course Profile from studentCourseProfileService
  const courseProfile = useSelector(
    (state) => selectCourseProfileById(state, course_id),
    shallowEqual
  );

  useFetchCourseTemplates({
    courseId: courseProfile?.courseId,
    courses: true,
    sections: true,
    topics: true,
  });
  // Now we will create an event handler which will path the student topic and section profile.

  console.log("CourseProfile: ", courseProfile);
  return (
    <div className="w-75 rounded p-2">
      <h1>{courseProfile?.name}</h1>
      <span className="badge bg-secondary">{courseProfile?._id}</span>
      <main>
        {courseProfile &&
          courseProfile.sections?.map((section) => (
            <StudentCourseSection
              key={section._id}
              section_id={section.sectionId}
            />
          ))}
      </main>
    </div>
  );
};

export default StudentProfileSections;
