import React, { useEffect, useState } from "react";
import { addStudent } from "./studentSlice";
import { useDispatch, useSelector } from "react-redux";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import CourseCheckBox from "../courseSlice/CourseCheckBox";
// import { getCourseCategories } from "../courseSlice/courseSlice";
import { selectAllCourseCategories } from "../courseCategory/courseCategorySlice";

const AddStudentForm = () => {
  const dispatch = useDispatch();
  const courseCategories = useSelector(selectAllCourseCategories);
  console.log("Course Categories: ", courseCategories);

  const [Name, setName] = useState("");
  const [FatherName, setFatherName] = useState("");
  const [Number, setNumber] = useState("");
  const [FatherNumber, setFatherNumber] = useState("");
  const [Email, setEmail] = useState("");
  const [selectedCourses, setSelectCourses] = useState([]);
  const [courseCategory, setCourseCategory] = useState("");
  const [courseProfileName, setCourseProfileName] = useState("");

  const handleOnSave = () => {
    dispatch(
      addStudent({
        Name,
        FatherName,
        Number,
        FatherNumber,
        Courses: selectedCourses,
        Email,
        CourseCategories: courseCategory,
      })
    );
  };

  const handleCheckClick = (e) => {
    if (e.target.checked) {
      console.log("Checked", e.target.checked, e.target.id);
      setSelectCourses([...selectedCourses, e.target.id]);
    } else {
      console.log("Checked", e.target.checked);
      setSelectCourses(selectedCourses.filter((item) => item !== e.target.id));
    }
  };

  useEffect(() => {
    console.log("Selected Courses: ", selectedCourses);
  }, [selectedCourses]);

  const courseContent = [];
  for (let course of courseCategories) {
    console.log("course Category: ", course);
    const courseBlock = (
      <Col key={course._id}>
        {course.courses.map((course) => (
          <CourseCheckBox courseId={course} onChange={handleCheckClick} />
        ))}
      </Col>
    );
    courseContent.push(courseBlock);
  }

  return (
    <Form className="container card shadow my-4 w-50">
      <h3 className="text-center my-3">Register a New Student</h3>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="studentName">
            <Form.Label>Student Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Student Name"
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col>
          <Form.Group className="mb-3" controlId="fatherName">
            <Form.Label>Father Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Father Name"
              value={FatherName}
              onChange={(e) => setFatherName(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="studentNumber">
            <Form.Label>Student Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Student Phone Number"
              value={Number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="fatherNumber">
            <Form.Label>Father Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Father Phone Number"
              value={FatherNumber}
              onChange={(e) => setFatherNumber(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="studentEmail">
            <Form.Label>Student Email Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Student Email Address"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col>
          <Form.Group className="mb-3" controlId="courseCategory">
            <Form.Label>Course Category</Form.Label>
            <Form.Select
              defaultValue="0"
              onChange={(e) => setCourseCategory(e.target.value)}
            >
              <option value="0" disabled>
                Select Option
              </option>
              {courseCategories.map((cat) => (
                <option value={cat._id}>{cat.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="courseProfileName">
            <Form.Label>Course Profile Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Course Profile Name"
              value={courseProfileName}
              onChange={(e) => setCourseProfileName(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      <div className="mt-4">
        <Form.Group className="mb-5" controlId="studentCourses">
          <Form.Label>Select Student Courses</Form.Label>
          <br />
          <Container>
            <span>All Courses</span> <hr />
            <Row>{courseContent}</Row>
          </Container>
        </Form.Group>

        <Button type="button" className="mb-3" onClick={handleOnSave}>
          Register Student
        </Button>
      </div>
    </Form>
  );
};

export default AddStudentForm;
