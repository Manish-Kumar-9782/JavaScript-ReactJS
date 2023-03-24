import React from "react";
import Table from "../Utility/Table/Table";
import { LocalDatabase } from "../Utility/Utility";

export class IssueEntry extends LocalDatabase {
  static {
    super.Fields = super.Fields.concat([
      "bookTitleId",
      "issuedToId",
      "returnedDate",
      "finned",
      "finnedAmount",
      "finnedDate",
      "issuedDate",
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
    finned,
    finnedAmount,
    issuedDate,
    finnedDate,
  }) {
    super({ id, regDate, updateDate });
    this.bookTitleId = bookTitleId;
    this.issuedToId = issuedToId;
    this.returnedDate = returnedDate;
    this.finnedAmount = finnedAmount;
    this.issuedDate = issuedDate;
    this.finned = finned;
    this.finnedDate = finnedDate;
  }
}

const Issue = () => {
  return (
    <div id="issue-books-section">
      <Table
        data={[IssueEntry.getRecordByFields()]}
        fields={[
          "bookTitleId",
          "issuedToId",
          "finned",
          "finnedAmount",
          "issuedDate",
          "finnedDate",
        ]}
      />
    </div>
  );
};

export default Issue;
