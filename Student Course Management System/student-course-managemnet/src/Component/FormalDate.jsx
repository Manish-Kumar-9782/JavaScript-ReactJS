import React from "react";

const FormalDate = ({ dateString }) => {
  const date = new Date(dateString).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return <span>{date}</span>;
};

FormalDate.defaultProps = {
  dateString: new Date().toISOString(),
};

export default FormalDate;
