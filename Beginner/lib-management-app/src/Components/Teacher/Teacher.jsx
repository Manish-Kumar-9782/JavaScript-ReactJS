import React from "react";
import Card from "../Utility/Card";
import Table from "../Utility/Table/Table";

const Teacher = () => {
  return (
    <div>
      <header>
        <h2 className="text-start px-5">Teacher Section</h2>
      </header>

      <div className="row mb-5">
        <div className="col-5">
          <Card title="Teachers" />
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
            title="Registered Teachers"
            fields={["id", "name", "email", "address", "contact", "stream"]}
            data={[]}
          />
        </div>
      </div>
    </div>
  );
};

export default Teacher;
