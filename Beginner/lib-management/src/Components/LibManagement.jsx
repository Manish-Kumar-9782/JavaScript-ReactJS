import React, { useState } from "react";
import BookForm from "./BookForm/BookForm";
import RecordTable from "./RecordTable/RecordTable";
const LibManagement = () => {
  let value = new Map();
  value.set(0, ["HTML", "Abhishek", "Learn HTML", 20, 30]);
  const [record, setRecord] = useState(value);

  function deleteRecord(id) {
    console.log("deleting record for id: ", id);
    let newData = new Map();

    record.forEach((value, key) => {
      if (id != key) {
        newData.set(key, value);
      }
    });

    setRecord(newData);
  }

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Library Management</h1>
      <div className="container">
        <BookForm record={record} setRecord={setRecord} />
        <RecordTable data={record} setData={setRecord} delete={deleteRecord} />
      </div>
    </>
  );
};

export default LibManagement;
