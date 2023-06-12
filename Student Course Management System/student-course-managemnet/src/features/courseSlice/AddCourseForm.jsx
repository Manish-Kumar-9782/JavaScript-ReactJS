import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCourse, getCourseError, getCourseStatus } from "./courseSlice";
import { selectAllCourseCategories } from "../courseCategory/courseCategorySlice";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
const AddCourseForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [regularDuration, setRegularDuration] = useState(0);
  const [extendedDuration, setExtendedDuration] = useState(0);
  const [domain, setDomain] = useState("");
  const [courseLevel, setCourseLevel] = useState(null);

  const status = useSelector(getCourseStatus);
  const error = useSelector(getCourseError);
  const courseCategories = useSelector(selectAllCourseCategories);

  const canSave = [
    name,
    category,
    regularDuration,
    extendedDuration,
    domain,
    courseLevel,
  ].every((value) => Boolean(value));

  const handleCourseCheckLevel = (e) => {
    console.log("selected course level: ", e.target.value);
    setCourseLevel(e.target.value);
  };

  const onSaveCourseForm = (e) => {
    // this callback will be used to save the course details.
    let course_level = null;
    if (courseLevel && courseLevel === "basic") {
      course_level = ["basic"];
    } else if (courseLevel && courseLevel === "intermediate") {
      course_level = ["basic", "intermediate"];
    } else if (courseLevel && courseLevel === "advance") {
      course_level = ["basic", "intermediate", "advance"];
    }

    let domains = domain.split(",").map((value) => value.trim());

    let data = {
      name,
      category,
      regularDuration,
      extendedDuration,
      courseLevels: course_level,
      domains,
    };
    console.log(data);
    dispatch(addCourse(data));
  };

  return (
    <Form className="container p-4 mt-4 card shadow">
      <h4 className="text-center mb-5">Add A New Course</h4>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="CourseName">
            <Form.Label>Course Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Course Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="CourseCategory">
            <Form.Label>Course Category</Form.Label>
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {courseCategories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="CourseDuration">
            <Form.Label>Course Regular Duration</Form.Label>
            <Form.Control
              type="number"
              placeholder="Course Regular Duration Days"
              value={regularDuration}
              onChange={(e) => setRegularDuration(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="CourseDurationExtended">
            <Form.Label>Course Extended Duration Days</Form.Label>
            <Form.Control
              type="number"
              placeholder="Course Extended Duration"
              value={extendedDuration}
              onChange={(e) => setExtendedDuration(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      <div>
        <Form.Group className="mb-3" controlId="courseDomains">
          <Form.Label>Course Domains</Form.Label>
          <Form.Control
            type="text"
            placeholder="Course Domains"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />
        </Form.Group>
      </div>

      <div className="d-flex gap-5 mb-5">
        <span>Course Level: </span>
        <Form.Check
          onChange={handleCourseCheckLevel}
          type="radio"
          id="level-basic"
          label="Basic"
          name="course-level"
          value="basic"
        />
        <Form.Check
          onChange={handleCourseCheckLevel}
          type="radio"
          id="level-intermediate"
          label="Intermediate"
          name="course-level"
          value="intermediate"
        />
        <Form.Check
          onChange={handleCourseCheckLevel}
          type="radio"
          id="level-advance"
          label="Advance"
          name="course-level"
          value="advance"
        />
      </div>

      <Button
        type="button"
        className="btn btn-success text-light"
        onClick={onSaveCourseForm}
        disabled={canSave ? false : true}
      >
        Register Course
      </Button>
    </Form>
  );
};

export default AddCourseForm;
