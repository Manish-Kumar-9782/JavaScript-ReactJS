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
  const [issueBook, setIssueBook] = useState({});

  useEffect(function () {
    bk.load();
    Teacher.load();
    Student.load();
  }, []);

  bk.showIssueModal = (visibility) => setModalVisibility(visibility);

  const saveEntry = (Record) => {
    console.log("saving record: ", Record);
  };

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
          handleSave={saveEntry}
          options={[
            <OptGroup
              label="Students"
              userModal="Student"
              optionList={Teacher.getOptionList("id", "name")}
            />,
            <OptGroup
              label="Teachers"
              userModal="Teacher"
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
