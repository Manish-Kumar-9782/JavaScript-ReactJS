import React, { useEffect, useState } from "react";
import BookForm from "./BookForm/BookForm";
import RecordTable from "./RecordTable/RecordTable";

const LibManagement = () => {
  let value = new Map();
  value.set(0, ["HTML", "Abhishek", "Learn HTML", 20, 30]);
  const [record, setRecord] = useState(value);
  const [changeId, setChangeId] = useState({ change: false, changeId: null });

  // a function to delete the record from the Map data structure.
  // this function will be called from the delete Component.
  function deleteRecord(id) {
    let newData = new Map();

    record.forEach((value, key) => {
      if (parseInt(id) !== key) {
        newData.set(key, value);
      }
    });
    setRecord(newData);
  }

  // this function will tell the form which data to be inserted into the input fields
  // by using the changeId.
  function updateRecord(id) {
    setChangeId({ change: true, changeId: id });
    // as soon as the setChangeId function is called. a useEffect() hook will be
    // triggered inside the BookForm Component to fill the input data.
  }

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Library Management</h1>
      <div className="container">
        <BookForm record={record} setRecord={setRecord} changeId={changeId} />
        <RecordTable
          data={record} // for record table.
          delete={deleteRecord} // for delete component
          update={updateRecord} // for edit component
        />
      </div>
    </>
  );
};

export default LibManagement;
