import React, { useEffect, useState } from "react";
import Card from "../Utility/Card";
import Table from "../Utility/Table/Table";
import { Book as bk } from "../Utility/Utility";
import IssuePopup from "../Utility/Popups/IssuePopup";
import OptGroup from "../Utility/OptGroup";
import Modal from "react-bootstrap/Modal";
import { Student, Teacher } from "../Utility/Utility";

// npm install react-bootstrap bootstrap

const Book = () => {
  const [showModal, setModalVisibility] = useState(false);

  // if (Teacher.Records.length === 0) {
  //   Teacher.load();
  // }

  // if (bk.Records.length === 0) {
  //   bk.load();
  // }

  // if (Student.Records.length === 0) {
  //   Student.load();
  // }

  useEffect(() => {
    console.log("modal visibility changed: ", showModal);
  }, [showModal]);

  useEffect(function () {
    console.log("loading data from localStorage.");

    bk.load();
    Teacher.load();
    Student.load();
  }, []);

  bk.showIssueModal = (visibility) => setModalVisibility(visibility);

  const saveEntry = () => {};

  bk.TableFields = [
    "id",
    "title",
    "author",
    "subject",
    "pages",
    "price",
    "issue",
  ];
  return (
    <div>
      <header>
        <h2 className="text-start px-5">Book Section</h2>
      </header>

      <div className="row mb-5">
        <div className="col-5">
          <Card title="Total Books" />
        </div>
        <div className="col-5">
          <Card title="Issued" />
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-5">
          <Card title="Most Issued" />
        </div>
        <div className="col-5">
          <Card title="Recent" />
        </div>
      </div>

      <div className="container">
        <IssuePopup
          show={showModal}
          handleVisibility={bk.showIssueModal}
          handleSave={null}
          options={[
            <OptGroup
              label="Students"
              optionList={Teacher.getOptionList("id", "name")}
            />,
            <OptGroup
              label="Teachers"
              optionList={Student.getOptionList("id", "name")}
            />,
          ]}
        />
        <Table
          title="Admin Section"
          fields={bk.TableFields}
          data={bk.getRecordByFields()}
        />
      </div>
    </div>
  );
};

export default Book;
