import React from "react";

const Issue = (props) => {
  return (
    <button className="btn btn-info text-light btn-sm" onClick={props.onClick}>
      issue
    </button>
  );
};

export default Issue;
