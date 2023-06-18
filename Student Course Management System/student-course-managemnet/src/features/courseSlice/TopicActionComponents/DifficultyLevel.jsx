import React from "react";

const COLORS = ["#116D6E", "#F2BE22", "#F29727", "#9B6DE5", "#9336B4"];

const DifficultyLevel = ({ value, onLevelChange }) => {
  const styles = { width: "5px" };

  const colorMap = () =>
    COLORS.map((color, index) => (index < value ? color : "transparent"));

  const vbars = colorMap().map((color, index) => (
    <li
      key={index}
      style={{
        ...styles,
        backgroundColor: color,
        height: `${20 + 20 * index}%`,
      }}
    ></li>
  ));

  return (
    <ul
      onClick={() => {
        onLevelChange(value);
      }}
      className="d-flex align-items-end gap-1"
      style={{ height: "20px", listStyleType: "none" }}
    >
      {vbars}
    </ul>
  );
};

export default DifficultyLevel;
