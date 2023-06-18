import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpLong, faDownLong } from "@fortawesome/free-solid-svg-icons";

const TopicPoints = ({ onIncrement, onDecrement, value }) => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <button className="btn" onClick={onIncrement}>
        <FontAwesomeIcon icon={faUpLong} />
      </button>
      {value}
      <button className="btn" onClick={onDecrement}>
        <FontAwesomeIcon icon={faDownLong} />
      </button>
    </div>
  );
};

export default TopicPoints;
