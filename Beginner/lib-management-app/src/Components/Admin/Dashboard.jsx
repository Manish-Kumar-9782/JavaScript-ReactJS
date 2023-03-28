import React from "react";
import Table from "../Utility/Table/Table";
import { admins } from "./data";
import Card from "../Utility/Card";
import { useEffect } from "react";
import { Student, Teacher, Book, Const } from "../Utility/Utility";
import Counter from "../Utility/Counter";
import BookChart from "./BookChart";
import LineChart from "../LineChart";
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
          <Card
            title="Total Books"
            counterModal={Const.BOOK_MODAL}
            counterFiled="title"
            showCounterRecent={true}
            body={
              <BookChart
                Records={Book.getTop(5, "IssuedCounts")}
                // footer={<LineChart Records/>}
              />
            }
          />
        </div>
        <div className="col-5">
          <Card
            title="Visitors"
            // counterModal={Const.BOOK_MODAL}
            // counterFiled="title"
            // showCounterRecent={true}
          />
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-5">
          <Card
            title="Students"
            counterModal={Const.STUDENT}
            counterFiled="name"
            showCounterRecent={true}
          />
        </div>
        <div className="col-5">
          <Card
            title="Teachers"
            counterModal={Const.TEACHER}
            counterFiled="name"
            showCounterRecent={true}
          />
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
