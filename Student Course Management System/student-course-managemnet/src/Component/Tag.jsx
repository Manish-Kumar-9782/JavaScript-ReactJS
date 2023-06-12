import React from "react";

const Tag = ({ text, bgColor = "#ccc", textColor = "#fff" }) => {
  return <span className="rounded p-1 border mx-1">{text}</span>;
};

export default Tag;
