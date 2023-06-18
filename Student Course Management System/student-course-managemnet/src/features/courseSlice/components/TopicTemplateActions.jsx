import React, { useState, useRef, useEffect, useDeferredValue } from "react";
import { useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Dispatch } from "@reduxjs/toolkit";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DifficultyLevel from "../TopicActionComponents/DifficultyLevel";
import TopicPoints from "../TopicActionComponents/TopicPoints";
import { useDispatch } from "react-redux";
import { patchCourseTopic } from "../../courseContentTemplate/courseTopicSlice";
import { useDelayCallback } from "../../../Hooks/DelayHooks";
// import { useBootstrapBreakpoints } from "react-bootstrap/esm/ThemeProvider";

const TopicTemplateActions = ({ topic, onEditClick }) => {
  const [points, setPoints] = useState(1);
  const [level, setLevel] = useState(1);
  const [isOptional, setOptional] = useState(false);
  const [isAdditional, setAdditional] = useState(false);
  const dispatch = useDispatch();
  const { courseId, sectionId } = useParams();
  const update = useRef(false);

  useDelayCallback(points, 400, () => {
    console.log("updating the points.");
    if (update.current)
      dispatch(
        patchCourseTopic({
          courseId,
          sectionId,
          topicId: topic?._id,
          topic: { ...topic, points },
        })
      );

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
        onChange={(e) => setAdditional(!isAdditional)}
      />

      <Form.Check
        type="checkbox"
        id="isOptional"
        label="Optional"
        checked={isOptional}
        onChange={(e) => setOptional(!isOptional)}
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
        }}
      />
    </div>
  );
};

export default TopicTemplateActions;
