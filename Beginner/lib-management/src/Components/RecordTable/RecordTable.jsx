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
        {/* props.data is the completed record of the tbody of table. in this we have n number of sub array as value of props.data array. 
      
        subarray: it contains the data of single row. */}

        {props.data.map(dArray => <Row data={dArray} />)}
      </tbody>
    </table>
  );
};

export default RecordTable;
