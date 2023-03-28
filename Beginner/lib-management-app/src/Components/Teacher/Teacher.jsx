import React, { useEffect, useReducer, useState } from "react";
import Card from "../Utility/Card";
import Table from "../Utility/Table/Table";
import StudentBarChart from "../Student/StudentBarChart";
import {
  Teacher as Guru,
  Book,
  Student,
  Const,
  DateTime,
} from "../Utility/Utility";
import { OptGroup } from "../Utility/Select";
import { IssueEntry, getBook } from "../Issue/Issue";
import { IssueContext } from "../Index/Routing";
import IssuePopup from "../Utility/Popups/IssuePopup";

const Teacher = () => {
  const [showModal, setModalVisibility] = useState(false);
  const [Record, SetRecord] = useState({});
  const [disabledModal, setDisableModal] = useState(Const.BOOK_MODAL);
  const [optionSelected, setOptionSelected] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(function () {
    Student.load();
    Book.load();
    Guru.load();
    Guru.showIssueModal = (visibility) => setModalVisibility(visibility);
    Guru.setCurrentIssueBook = (teacher) => setCurrentUser(teacher);
    setDisableModal(Const.USER_MODAL);
  }, []);

  useEffect(() => {
    console.log("Saving issue Record Effect", Record);
    if (Record.save) {
      // const user = getUser(Record.userModal, Record.userId);4
      let book = getBook(Record.bookId);
      // console.log("issuing book to user:", user);
      const entry = new IssueEntry({
        bookTitleId: `${book.title}(${book.id})`,
        issuedToId: `${Record.userName}(${Record.userId})`,
        issuedDate: new DateTime().toISOString(),
        finned: false,
        finnedAmount: 0,
        returnDate: new DateTime().addTime({ days: 15 }).toISOString(),
        userModal: "Teacher",
        returnStatus: false,
      });
      entry.save();
      console.log("Saving:", IssueEntry.Records);
      SetRecord({});
    }
  }, [Record]);

  useEffect(() => {
    console.log("current User Selected.", currentUser);
    setOptionSelected({ id: currentUser?.id, value: currentUser?.name });
  }, [currentUser]);

  const saveEntry = (record) => {
    SetRecord({
      ...record,
      userId: currentUser?.id,
      userName: currentUser?.name,
      save: true,
    });
    Guru.showIssueModal(false);
    console.log("Saving issue Record", Record);
  };

  Guru.TableFields = [
    "id",
    "name",
    "email",
    "contact",
    "address",
    "stream",
    "issue_book",
  ];
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
          <IssueContext.Provider value={{ optionSelected }}>
            <IssuePopup
              show={showModal}
              handleVisibility={Guru.showIssueModal}
              handleSave={saveEntry}
              disableModal={disabledModal}
              disableModalSelected={optionSelected}
              userOptions={[
                <OptGroup
                  key="userModal-1"
                  label="Students"
                  userModal="Student"
                  optionList={Student.getOptionList("id", "name")}
                />,
                <OptGroup
                  key="userModal-2"
                  label="Teachers"
                  userModal="Teacher"
                  optionList={Guru.getOptionList("id", "name")}
                />,
              ]}
              bookOptions={[
                <OptGroup
                  key="bookModal"
                  label="Books"
                  optionList={Book.getOptionList("id", "title")}
                />,
              ]}
            />
          </IssueContext.Provider>

          <Table
            title="Registered Teachers"
            fields={Guru.TableFields}
            data={Guru.getRecordByFields()}
          />
        </div>
      </div>
    </div>
  );
};

export default Teacher;
