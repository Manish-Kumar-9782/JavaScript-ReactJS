import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { getTopicById } from "./courseTopicSlice";

// Course Template Topic
const CourseTemplateTopic = ({ topicId, onAddClick }) => {
  const topic = useSelector((state) => getTopicById(state, topicId));

  // console.log(`topic ${topicId}: `, topic);

  return (
    <>
      {/* here we are verifying that if the we have found the topic data then only
    we will render the list item.*/}
      {topic && (
        <li className="list-group-item">
          <div className="d-flex justify-content-between align-items-center">
            <span>{topic.title}</span>
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
