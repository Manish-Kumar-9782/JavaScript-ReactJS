import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";
import { selectCourseCategoryById } from "../courseCategory/courseCategorySlice";
import FormalDate from "../../Component/FormalDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { deleteCourse } from "./courseSlice";

const CourseCard = ({ course, showProgress = false }) => {
  const courseCategories = useSelector((state) =>
    selectCourseCategoryById(state, course.category)
  );

  const dispatch = useDispatch();
  return (
    <article style={{ width: "300px" }} className="border shadow p-2 rounded">
      <header className="d-flex justify-content-between align-items-center">
        <FormalDate dateString={course.RegistrationDate} />
        <Dropdown drop="start">
          <Dropdown.Toggle
            id={`${course?._id}-options`}
            bsPrefix="none"
            variant="light"
          >
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              as="button"
              onClick={() => {
                console.log("Deleting the course: ", course);
                dispatch(deleteCourse(course._id));
              }}
            >
              delete
            </Dropdown.Item>

            <Dropdown.Item href={`courses/${course._id}`}>Update</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </header>

      <div className="text-center py-2">
        <span className="fs-5">{course.name}</span> <br />
        <span>{courseCategories?.name}</span>
      </div>

      {showProgress ?? (
        <div>
          Progress <br />
          <progress value={10} max={100} style={{ width: "100%" }}></progress>
        </div>
      )}
      <hr />
      <footer className="d-flex justify-content-between align-items-center">
        <div className="d-flex gap-1 flex-wrap">
          {course.courseLevels.map((level) => (
            <span key={level} className="rounded p-1 border">
              {level}
            </span>
          ))}
        </div>
        <div>
          <button className="btn btn-secondary btn-sm">update</button>
        </div>
      </footer>
    </article>
  );
};

export default CourseCard;
