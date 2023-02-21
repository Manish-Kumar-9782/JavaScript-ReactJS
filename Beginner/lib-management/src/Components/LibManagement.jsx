import React, { useState } from "react";
import BookForm from "./BookForm/BookForm";
import RecordTable from "./RecordTable/RecordTable";
const LibManagement = () => {
  const [record, setRecord] = useState([
    ["HTML", "Ravi Kumar", "How to learn HTML", 4, 12],
  ]);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Library Management</h1>
      <div className="container">
        <BookForm record={record} setRecord={setRecord} />
        <RecordTable data={record} />
      </div>
    </>
  );
};

export default LibManagement;
