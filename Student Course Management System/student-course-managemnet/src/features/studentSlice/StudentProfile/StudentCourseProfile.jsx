import React from "react";
import { getCourseProfileById } from "./CourseProfileSlice";
import { getCourseById } from "../../courseSlice/courseSlice";
import { shallowEqual, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { ProgressBar } from "react-bootstrap";
import FormalDate from "../../../Component/FormalDate";
import { Link } from "react-router-dom";

const getCourseProfile = createSelector(
  (state, obj) => {
    return getCourseById(state, obj.courseTemplateId);
  },
  (state, obj) => {
    return getCourseProfileById(state, obj.courseProfileId);
  },
  (courseTemplate, courseProfile) => {
    return { courseTemplate, courseProfile };
  }
);

const StudentCourseProfile = ({ courseProfileId, courseTemplateId }) => {
  const courseProfile = useSelector(
    (state) => getCourseProfile(state, { courseTemplateId, courseProfileId }),
    shallowEqual
  );

  console.log("Course Profile: ", courseProfile);

  return (
    <div>
      {!courseProfile && (
        <h4>Unable to load Course Profile for: {courseTemplateId}</h4>
      )}
      {courseProfile && (
        <article className="border my-4">
          <p className="p-3">
            <span className="me-3">Course Name:</span>{" "}
            {courseProfile.courseTemplate?.name} <br />
            <span className="me-3">Course Id:</span>{" "}
            {courseProfile.courseTemplate?._id} <br />
            <span className="me-3">Course Registration Date:</span>
            <FormalDate
              dateString={courseProfile.courseTemplate?.registrationDate}
            />{" "}
            <br />
          </p>
          <ProgressBar
            className="mx-3"
            variant="success"
            label={`${courseProfile.courseProfile?.completion}%`}
            now={courseProfile.courseProfile?.completion}
            max={100}
            min={0}
          />

          <div className="d-flex justify-content-end my-2 px-3 gap-4">
            <button
              type="button"
              className="text-gray-300 btn btn-success btn-sm"
            >
              {courseProfile.courseProfile?.status}
            </button>
            <button type="button" className="btn btn-secondary btn-sm">
              <Link
                className="text-decoration-none text-white"
                to={`course/${courseProfile.courseProfile?._id}`}
              >
                view
              </Link>
            </button>
          </div>
        </article>
      )}
    </div>
  );
};

export default StudentCourseProfile;
