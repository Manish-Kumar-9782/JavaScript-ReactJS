import React from "react";
import Row from "./Row";
const RecordTable = (props) => {

  let recordTable = [];
  console.log("props record: ", props.data)

  for (let [key, value] of props.data) {
    recordTable.push(<Row key={key} id={key} data={value} record={props.data}
      delete={props.delete}
      update={props.update}
    />)
  }

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
        {recordTable}
      </tbody>
    </table>
  );
};

export default RecordTable;
