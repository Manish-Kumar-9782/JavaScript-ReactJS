import React from "react";
import Table from "../Utility/Table/Table";
import { admins } from "./data";
import Card from "../Utility/Card";
import { useEffect } from "react";
import { Student, Teacher, Book } from "../Utility/Utility";
const Dashboard = () => {
  useEffect(() => {
    Student.load();
    Teacher.load();
    Book.load();
  }, []);

  return (
    <div>
      <header>
        <h2 className="text-start px-5">Admin Section</h2>
      </header>

      <div className="row mb-5">
        <div className="col-5">
          <Card title="Total Books" />
        </div>
        <div className="col-5">
          <Card title="Visitors" />
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-5">
          <Card title="Students" />
        </div>
        <div className="col-5">
          <Card title="Teachers" />
        </div>
      </div>

      <div className="container">
        <Table
          title="Admin Section"
          fields={["Name", "Email", "Address", "PhoneNumber", "Reg Date"]}
          data={admins}
        />
      </div>
    </div>
  );
};

export default Dashboard;
