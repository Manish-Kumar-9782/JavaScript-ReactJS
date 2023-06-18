import React, { useState } from "react";
import { Dispatch } from "@reduxjs/toolkit";

import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getTopicById } from "./courseTopicSlice";
import TopicTemplateActions from "../courseSlice/components/TopicTemplateActions";
import EditMode from "../courseSlice/TopicActionComponents/EditMode";
import { updateCourseTopic } from "./courseTopicSlice";

// Course Template Topic
const CourseTemplateTopic = ({ topicId, onAddClick }) => {
  const dispatch = useDispatch();
  const [isEdit, setEdit] = useState(false);

  const topic = useSelector(
    (state) => getTopicById(state, topicId),
    shallowEqual
  );

  const editValue = (value) => {
    dispatch(updateCourseTopic({ ...topic, title: value }));
    setEdit(false);
  };

  return (
    <>
      {/* here we are verifying that if the we have found the topic data then only
    we will render the list item.*/}
      {topic && (
        <li className="list-group-item">
          <div className="d-flex justify-content-between align-items-center">
            {isEdit ? (
              <EditMode value={topic.title} onChangeValue={editValue} />
            ) : (
              <span>{topic.title}</span>
            )}

            <div className="d-flex gap-3">
              <TopicTemplateActions topic={topic} onEditClick={setEdit} />
              <button
                data-id={topic._id}
                data-is-section={false}
                type="button"
                className="btn"
                onClick={(e) => {
                  onAddClick(e);
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>
          <ul type="none" className="list-group list-group-flush p-0">
            {topic?.topics?.map((_topic_id) => (
              <CourseTemplateTopic key={_topic_id} topicId={_topic_id} />
            ))}
          </ul>
        </li>
      )}
    </>
  );
};

export default CourseTemplateTopic;
