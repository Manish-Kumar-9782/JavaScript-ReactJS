import React, { useEffect, useState, useRef } from "react";
import Card from "../Utility/Card";
import Table from "../Utility/Table/Table";
import { Book as bk } from "../Utility/Utility";
import IssuePopup from "../Utility/Popups/IssuePopup";
import { OptGroup } from "../Utility/Select";
import Modal from "react-bootstrap/Modal";
import { Student, Teacher, DateTime, Const } from "../Utility/Utility";
import { IssueEntry, getUser } from "../Issue/Issue";

import { IssueContext } from "../Index/Routing";
const Book = () => {
  const [showModal, setModalVisibility] = useState(false);
  const [Record, SetRecord] = useState({});
  // disableModal will tell Issue Modal, which select option
  // should be disabled.
  const [disabledModal, setDisalbeModal] = useState(Const.BOOK_MODAL);

  // optionSelected will tell Issue Modal, which option is selected.
  const [optionSelected, setOptionSelected] = useState(null);
  let [currentBook, setCurrentBook] = useState(null);

  useEffect(function () {
    bk.load();
    Teacher.load();
    Student.load();
    IssueEntry.load();
  }, []);

  useEffect(() => {
    console.log("Saving issue Record Effect", Record);
    if (Record.save) {
      const user = getUser(Record.userModal, Record.userId);
      console.log("issuing book to user:", user);
      const entry = new IssueEntry({
        bookTitleId: `${Record.book.title}(${Record.book.id})`,
        issuedToId: `${user.name}(${user.id})`,
        issuedDate: new DateTime().toISOString(),
        finned: false,
        finnedAmount: 0,
        returnDate: new DateTime().addTime({ days: 15 }).toISOString(),
        userModal: Record.userModal,
        returnStatus: false,
      });
      entry.save();
      console.log(IssueEntry.Records);
      SetRecord({});
    }
  }, [Record]);

  bk.showIssueModal = (visibility) => {
    setModalVisibility(visibility);
  };

  bk.setCurrentIssueBook = (book) => {
    setCurrentBook(book);
  };

  useEffect(() => {
    if (currentBook) {
      setOptionSelected({
        id: currentBook.id,
        value: currentBook.title,
      });
    }
    console.log("select book: ", currentBook);
  }, [currentBook]);

  const saveEntry = (record) => {
    SetRecord({ ...record, book: currentBook, save: true });
    bk.showIssueModal(false);
    console.log("Saving issue Record", Record);
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
        <IssueContext.Provider value={{ optionSelected }}>
          <IssuePopup
            show={showModal}
            handleVisibility={bk.showIssueModal}
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
                optionList={Teacher.getOptionList("id", "name")}
              />,
            ]}
            bookOptions={[
              <OptGroup
                key="bookModal"
                label="Books"
                optionList={bk.getOptionList("id", "title")}
              />,
            ]}
          />
        </IssueContext.Provider>
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
