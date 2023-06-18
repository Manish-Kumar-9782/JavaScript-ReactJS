import React, { useState, useRef, useEffect, useDeferredValue } from "react";
import { useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DifficultyLevel from "../TopicActionComponents/DifficultyLevel";
import TopicPoints from "../TopicActionComponents/TopicPoints";
import { useDispatch } from "react-redux";
import { patchCourseTopic } from "../../courseContentTemplate/courseTopicSlice";
import { useDelayCallback } from "../../../Hooks/DelayHooks";
// import { useBootstrapBreakpoints } from "react-bootstrap/esm/ThemeProvider";

const TopicTemplateActions = ({ topic, onEditClick }) => {
  const [points, setPoints] = useState(topic?.points);
  const [level, setLevel] = useState(topic?.difficultyLevel);
  const [isOptional, setOptional] = useState(topic?.isOptional);
  const [isAdditional, setAdditional] = useState(topic?.isAdditional);

  const { id: courseId } = useParams();
  const dispatch = useDispatch();
  const update = useRef(false);

  useDelayCallback([points, level, isAdditional, isOptional], 400, () => {
    if (update.current) {
      dispatch(
        patchCourseTopic({
          courseId,
          sectionId: topic?.sectionId,
          topicId: topic?._id,
          topic: {
            ...topic,
            points,
            difficultyLevel: level,
            isAdditional,
            isOptional,
          },
        })
      );
    }

    update.current = false;
  });

  const increment = () => {
    if (points < 20) setPoints(points + 1);
    update.current = true;
  };

  const decrement = () => {
    if (points > 0) setPoints(points - 1);
    update.current = true;
  };

  return (
    <div className="d-flex align-items-center show:hover gap-2">
      <button className="btn" onClick={() => onEditClick(true)}>
        <FontAwesomeIcon icon={faPencil} />
      </button>

      <Form.Check
        type="checkbox"
        id="isAdditional"
        label="Additional"
        checked={isAdditional}
        onChange={(e) => {
          setAdditional(!isAdditional);
          update.current = true;
        }}
      />

      <Form.Check
        type="checkbox"
        id="isOptional"
        label="Optional"
        checked={isOptional}
        onChange={(e) => {
          setOptional(!isOptional);
          update.current = true;
        }}
      />

      <TopicPoints
        value={points}
        onDecrement={decrement}
        onIncrement={increment}
      />
      <DifficultyLevel
        value={level}
        onLevelChange={(value) => {
          if (value === 5) setLevel(1);
          else if (value < 5) setLevel(value + 1);
          update.current = true;
        }}
      />
    </div>
  );
};

export default TopicTemplateActions;
