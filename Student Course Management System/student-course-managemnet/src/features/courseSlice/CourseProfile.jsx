import React from "react";
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { Container, Card } from "react-bootstrap";
import { selectCourseById } from "./courseSlice";
import FormalDate from "../../Component/FormalDate";
import Tag from "../../Component/Tag";
import CourseCategory from "./components/CourseCategory";
import CourseProfileMain from "./CourseProfileMain";

const CourseProfile = () => {
  const { id } = useParams();
  const course = useSelector((state) => selectCourseById(state, id));

  console.log("CourseProfile object: ", course, id);
  return (
    <div>
      <Card className="px-4 pt-2">
        <div className="d-flex justify-content-between align-items-center">
          <span className="d-block mb-3 fs-4">
            {course?.name}:{" "}
            <CourseCategory courseCategoryId={course?.category} />{" "}
          </span>
          <p>
            Registration Data: &nbsp;
            <FormalDate dateString={course?.registrationDate} />
          </p>
        </div>

        <p>Regular Course Duration : {course?.regularDuration} Days</p>
        <p>Extended Course Duration : {course?.extendedDuration} Days</p>
        <p>
          Extended Course Duration :{" "}
          {course?.courseLevels.map((text, index) => (
            <Tag key={index} text={text} />
          ))}{" "}
        </p>
      </Card>

      {/* {course ? <CourseProfileMain course={course} /> : null} */}
      {course && <CourseProfileMain course={course} />}
    </div>
  );
};

export default CourseProfile;
