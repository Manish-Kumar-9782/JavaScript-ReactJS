import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPlugCircleBolt } from "@fortawesome/free-solid-svg-icons";
import { addCourseTopic } from "../../courseContentTemplate/courseTopicSlice";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import BootModal from "../../../Component/BootModal";
import CourseTemplateTopic from "../../courseContentTemplate/CourseTemplateTopic";

const toBool = (str) => {
  if (str === "true") return true;
  else if (str === "false") return false;
  else return new Error("Invalid boolean value: " + str);
};

const CourseProfileSections = ({ section, courseId, sectionId }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const activeTopic = useRef("");

  const handleHideModal = () => {
    setShowModal(false);
  };

  const handleSubmit = () => {
    dispatch(
      addCourseTopic({
        title,
        courseId,
        sectionId: section._id,
        parentId: activeTopic.topicId, // parent can be section or a topic
        isSection: activeTopic.isSection, // if true then parent is section else parent is topic
      })
    );
    setShowModal(false);
    setTitle("");
  };

  const handleAddClick = (e) => {
    setShowModal(true);
    activeTopic.current = e.currentTarget;
    activeTopic.topicId = e.currentTarget.dataset.id;
    activeTopic.isSection = toBool(e.currentTarget.dataset.isSection);
    console.log("current active topic id: ", activeTopic);
  };

  return (
    <section className="my-3">
      <header className="bg-secondary px-2 py-1 text-light rounded-top">
        <div className="d-flex justify-content-between align-items-center">
          <span>{section?.title}</span>
          <button
            data-id={section?._id}
            data-is-section={true}
            type="button"
            className="btn"
            title="add topic"
            onClick={handleAddClick}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </header>

      <div className="border ps-2">
        <ul type="none" className="list-group px-2 py-2">
          {section?.topics?.map((topic_id) => (
            <CourseTemplateTopic
              key={topic_id}
              topicId={topic_id}
              onAddClick={handleAddClick}
            />
          ))}
        </ul>
      </div>

      <BootModal
        visibility={showModal}
        onClose={handleHideModal}
        onSubmit={handleSubmit}
        body={
          <Form.Group className="mb-3" controlId="topicName">
            <Form.Label>Topic Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Topic Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
        }
      />
    </section>
  );
};

export default CourseProfileSections;
