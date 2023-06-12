import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { selectStudentById } from "./studentSlice";
import { getCoursesByIds } from "../courseSlice/courseSlice";
import CourseList from "./CourseList";
import StudentCourseProfile from "./StudentProfile/StudentCourseProfile";
import { useFetchStudentRecord } from "../../Hooks/record-loader";
/**
 * In this we will create a StudentProfile Component which
 */

const StudentProfile = () => {
  const { student_id } = useParams();

  // Now we need to fetch the studentCourseProfile Record
  useFetchStudentRecord({ studentId: student_id, fetchStudentCourses: true });

  const studentProfile = useSelector(
    (state) => selectStudentById(state, student_id),
    shallowEqual
  );

  return (
    <>
      {studentProfile && (
        <section className="w-100 mx-3">
          <header className="border p-3">
            <p>
              <span className="me-3">Student Name:</span> {studentProfile.Name}
            </p>

            <p>
              <span className="me-3">Student Phone Number:</span>{" "}
              {studentProfile.Number}
            </p>

            <p>
              <span className="me-3">Student Father's Name:</span>{" "}
              {studentProfile.FatherName}
            </p>

            <p>
              <span className="me-3">Student Father's Number:</span>{" "}
              {studentProfile.FatherNumber}
            </p>

            <p>
              <span className="me-3">Student Email:</span>{" "}
              {studentProfile.Email}
            </p>

            <div className="d-flex align-items-center ">
              <span className="me-3">Student Courses:</span>{" "}
              {/* {courses && <CourseList listItems={courses} contentLength={30} />} */}
            </div>
          </header>

          {/* here we will show all the StudentCourseProfile content */}
          <section>
            {studentProfile &&
              studentProfile?.Courses?.map((course) => (
                <StudentCourseProfile
                  key={course.courseProfileId}
                  courseProfileId={course.courseProfileId}
                  courseTemplateId={course.courseTemplateId}
                />
              ))}
          </section>
        </section>
      )}
    </>
  );
};

export default StudentProfile;
