import React from "react";
import Row from "./Row";
const RecordTable = (props) => {
  return (
    <table className="record-table">
      <thead>
        <Row
          type="heading"
          data={["Title", "Author", "Subject", "Pages", "Price"]}
        />
      </thead>

      <tbody>
        {props.data.map(dArray => <Row data={dArray} />)}
      </tbody>
    </table>
  );
};

export default RecordTable;
