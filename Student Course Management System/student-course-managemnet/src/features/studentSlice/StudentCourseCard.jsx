import React, { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import CourseList from "./CourseList";
import FormalDate from "../../Component/FormalDate";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getCoursesByIds,
  getCourseStatus,
  getCourseError,
} from "../courseSlice/courseSlice";
import FetchStudentRecords from "../../Component/FetchStudentRecords";
import { createSelector } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

const getStudentCourseProfile = async (state, studentId) => {
  if (!studentId) {
    return new Error("ValueError: Student id is required");
  }

  return fetch(
    `http://localhost:4000/students/${studentId}/api/?get=courseProfile`
  )
    .then((response) => response.json())
    .then((data) => {
      let profiles = data.map((course) => {
        course.courseTemplate = state.courses.entities[course.courseId];
        return course;
      });
      return profiles;
    })
    .catch((error) =>
      console.error("CourseProfileFetchError:: ", error.message)
    );
};

// @Component
const StudentCourseCard = ({ student, displayCourses = false }) => {
  const [profile, setProfile] = useState({ status: false, data: null });

  // here we need to first retrieve the studentCourseProfiles and then
  // get the course Templates data to show the full details.
  const courseProfile = useSelector(
    (state) =>
      // here we will pass the student id by using that we will get the individual
      // course details.
      getStudentCourseProfile(state, student._id),
    shallowEqual
  );

  useEffect(() => {
    courseProfile.then((data) =>
      setProfile({ status: data ? true : false, data })
    );
  }, [courseProfile]);
  return (
    <>
      <article
        key={student?._id}
        style={{ width: "300px" }}
        className="border shadow p-2 rounded"
      >
        <header className="d-flex justify-content-between align-items-center">
          <span>{student.Name}</span>
          <Dropdown drop="start">
            <Dropdown.Toggle id={`-options`} bsPrefix="none" variant="light">
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as="button" onClick={() => {}}>
                delete
              </Dropdown.Item>

              <Dropdown.Item href={`/students`}>Update</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </header>

        <div className="text-center py-2">
          {profile.status ? (
            <>
              {displayCourses ? (
                <>
                  {profile && (
                    <CourseList
                      listItems={profile.data.map(
                        (course) => course.courseTemplate
                      )}
                    />
                  )}
                </>
              ) : (
                <>
                  <span className="fs-5">{student.courseName}</span> <br />
                  <span>{student.status}</span>
                </>
              )}
            </>
          ) : (
            <h3>Loading...</h3>
          )}
        </div>

        <div>
          Progress <br />
          <progress value={10} max={100} style={{ width: "100%" }}></progress>
        </div>
        <hr />
        <footer className="d-flex justify-content-between align-items-center">
          <FormalDate dateString={student.RegistrationDate} />
          <div>
            <Link to={`/students/${student._id}`}>details</Link>
          </div>
        </footer>
      </article>
    </>
  );
};

export default StudentCourseCard;
