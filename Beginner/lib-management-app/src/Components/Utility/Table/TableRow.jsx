import React from "react";
import HeadingCell from "./HeadingCell";
import DataCell from "./DataCell";
const TableRow = (props) => {
  let data = null;

  if (props.type === "head") {
    data = props.data.map((item, index) => {
      return <HeadingCell key={index} data={item} />;
    });
  } else if (props.type === "body") {
    data = props.data.map((item, index) => {
      return <DataCell key={index} data={item} />;
    });
  } else {
    console.error("Invalid type: " + props.type);
  }

  return <tr>{data}</tr>;
};

export default TableRow;
