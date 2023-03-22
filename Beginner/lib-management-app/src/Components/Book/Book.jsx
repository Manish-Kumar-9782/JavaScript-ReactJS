import React, { useEffect } from "react";
import Card from "../Utility/Card";
import Table from "../Utility/Table/Table";
import { Book as bk } from "../Utility/Utility";
const Book = () => {
  useEffect(function () {
    bk.load();
  });
  bk.TableFields = ["id", "title", "author", "subject", "pages", "price"];
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
