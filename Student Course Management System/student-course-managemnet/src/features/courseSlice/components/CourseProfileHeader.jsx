import React, { useState, useRef, useEffect } from "react";
import BootModal from "../../../Component/BootModal";
import { Form } from "react-bootstrap";
import { addCourseSection } from "../../courseContentTemplate/courseSectionsSlice";
import { useDispatch } from "react-redux";
import { postCourseTemplate } from "../../courseContentTemplate/courseContentTemplateSlice";
import { fetchCourseSections } from "../../courseContentTemplate/courseSectionsSlice";

const CourseProfileHeader = ({ course }) => {
  const [showModal, setShowModal] = useState(false);
  const [sectionName, sectSectionName] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCourseSections({ courseId: course._id }));
  }, []);

  const handleHideModal = () => {
    console.log("hiding a modal");
    setShowModal(false);
  };

  const handleSubmit = () => {
    // handle submit call for creating a new section inside the current course.
    setShowModal(false); // hide the modal
    dispatch(addCourseSection({ title: sectionName, courseId: course._id }));
    // dispatch the addCourseSection reducer.
    // dispatch(postCourseTemplate(course._id));
    sectSectionName("");
  };

  return (
    <header className="d-flex justify-content-between align-items-center">
      <span>{course?.name}</span>
      <button
        type="button"
        className="btn btn-info"
        onClick={() => setShowModal(true)}
      >
        ADD SECTION
      </button>
      <BootModal
        visibility={showModal}
        title="Adding New Section"
        onClose={handleHideModal}
        onSubmit={handleSubmit}
        body={
          <Form.Group className="mb-3" controlId="sectionName">
            <Form.Label>Section Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Section Name"
              value={sectionName}
              onChange={(e) => sectSectionName(e.target.value)}
            />
          </Form.Group>
        }
      />
    </header>
  );
};

export default CourseProfileHeader;
