import React from "react";
import Card from "../Utility/Card";
import Table from "../Utility/Table/Table";

const Book = () => {
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
          fields={["id", "title", "author", "subject", "pages", "price"]}
          data={[]}
        />
      </div>
    </div>
  );
};

export default Book;
