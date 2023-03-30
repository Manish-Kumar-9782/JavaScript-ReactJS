import React, { useEffect, useState } from "react";
import Table from "../Utility/Table/Table";
import Card from "../Utility/Card";
import StudentBarChart from "./StudentBarChart";
import {
  Student as St,
  Book,
  Teacher,
  Const,
  DateTime,
} from "../Utility/Utility";
import IssuePopup from "../Utility/Popups/IssuePopup";
import { IssueContext } from "../Index/Routing";
import { OptGroup } from "../Utility/Select";
import { IssueEntry, getBook } from "../Issue/Issue";
import StudentLineChart from "./StudentLineChart";
import StudentDoughnutChart from "./StudentDoughnutChart";
function studentRegRecordByMonths() {
  let record = {};
  let labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  St.Records.forEach((rec) => {
    let date = new Date(rec.regDate);
    if (record[labels[date.getMonth()]]) record[labels[date.getMonth()]] += 1;
    else record[labels[date.getMonth()]] = 1;
  });
  // console.log(record);
  // console.log(labels.map((rec) => record[rec]));
  return labels.map((rec) => record[rec]);
}

const Student = () => {
  const [showModal, setModalVisibility] = useState(false);
  const [Record, SetRecord] = useState({});
  const [disabledModal, setDisableModal] = useState(Const.BOOK_MODAL);
  const [optionSelected, setOptionSelected] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(function () {
    St.load();
    Book.load();
    St.showIssueModal = (visibility) => setModalVisibility(visibility);
    St.setCurrentStudent = (student) => setCurrentUser(student);
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
        userModal: "Student",
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
    St.showIssueModal(false);
    console.log("Saving issue Record", Record);
  };

  St.TableFields = [
    "id",
    "name",
    "std",
    "email",
    "contact",
    "address",
    "issue_book",
  ];
  return (
    <div>
      <header>
        <h2 className="text-start px-5">Student Section</h2>
      </header>

      <div className="row mb-5">
        <div className="col-5">
          <Card
            title="Students"
            counterModal={Const.STUDENT}
            counterField="name"
            showCounterField={true}
            body={[
              <StudentBarChart Records={St.getTop(5, "totalBookIssued")} />,
              <StudentDoughnutChart
                Records={St.getTop(5, "totalBookIssued")}
              />,
            ]}
            footer={<StudentLineChart Records={studentRegRecordByMonths()} />}
          />
        </div>
        <div className="col-5">
          <Card
            title="Finned"
            counterModal={Const.STUDENT}
            counterField="name"
            showCounterField={true}
            countCallback={() => {
              let amount = 0;
              // Student.load();
              St.Records.forEach((rec) => {
                amount += rec.finned_amount ?? 0;
              });
              return amount;
            }}
          />
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
              handleVisibility={St.showIssueModal}
              handleSave={saveEntry}
              disableModal={disabledModal}
              disableModalSelected={optionSelected}
              userOptions={[
                <OptGroup
                  key="userModal-1"
                  label="Students"
                  userModal="Student"
                  optionList={St.getOptionList("id", "name")}
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
                  optionList={Book.getOptionList("id", "title")}
                />,
              ]}
            />
          </IssueContext.Provider>
          <Table
            title="Registered Students"
            fields={St.TableFields}
            data={St.getRecordByFields()}
          />
        </div>
      </div>
    </div>
  );
};

export default Student;
