import React, { useEffect } from "react";
import Table from "../Utility/Table/Table";
import { LocalDatabase, Student, Teacher, Book } from "../Utility/Utility";

const UserModals = {
  STUDENT: "Student",
  TEACHER: "Teacher",
  OTHER: "Other",
};

export function getUser(userModal, userId) {
  switch (userModal) {
    case UserModals.STUDENT:
      return Student.get(userId);

    case UserModals.TEACHER:
      return Teacher.get(userId);

    default:
      return -1;
  }
}

export function getBook(bookId) {
  Book.load();
  for (let book of Book.Records) {
    if (book.id == bookId) {
      return book;
    }
  }
  return -1;
}

export class IssueEntry extends LocalDatabase {
  static {
    super.Fields = super.Fields.concat([
      "bookTitleId",
      "issuedToId",
      "returnedDate",
      "returnDate",
      "returnStatus",
      "finned",
      "finnedAmount",
      "finnedDate",
      "issuedDate",
      "userModal",
    ]);
    super.DatabaseKey = "IssueEntries";
  }

  constructor({
    id,
    regDate,
    updateDate,
    bookTitleId,
    issuedToId,
    returnedDate,
    returnDate,
    returnStatus,
    finned,
    finnedAmount,
    issuedDate,
    finnedDate,
    userModal,
  }) {
    super({ id, regDate, updateDate });
    this.bookTitleId = bookTitleId;
    this.issuedToId = issuedToId;
    this.returnedDate = returnedDate;
    this.finnedAmount = finnedAmount;
    this.issuedDate = issuedDate;
    this.finned = finned;
    this.finnedDate = finnedDate;
    this.userModal = userModal;
    this.returnDate = returnDate;
    this.returnStatus = returnStatus;
  }
}

const Issue = () => {
  useEffect(() => {
    IssueEntry.load();
  }, []);
  IssueEntry.TableFields = [
    "bookTitleId",
    "issuedToId",
    "finned",
    "returnStatus",
    "issuedDate",
    "returnDate",
  ];
  return (
    <div id="issue-books-section">
      <Table
        title="Book Issue Entries"
        data={IssueEntry.getRecordByFields()}
        fields={IssueEntry.TableFields}
      />
    </div>
  );
};

export default Issue;
