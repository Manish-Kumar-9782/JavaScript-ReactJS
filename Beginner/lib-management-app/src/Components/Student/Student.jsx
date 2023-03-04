import React from "react";
import Table from "../Utility/Table/Table";
import Card from "../Utility/Card";
const Student = () => {
  return (
    <div>
      <header>
        <h2 className="text-start px-5">Student Section</h2>
      </header>

      <div className="row mb-5">
        <div className="col-5">
          <Card title="Students" />
        </div>
        <div className="col-5">
          <Card title="Finned" />
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-5">
          <Card title="Active" />
        </div>
        <div className="col-5">
          <Card title="Issued" />
        </div>
      </div>

      <div className="row">
        <div className="col-10">
          <Table
            title="Registered Students"
            fields={["id", "name", "email", "address", "contact", "class"]}
            data={[]}
          />
        </div>
      </div>
    </div>
  );
};

export default Student;
