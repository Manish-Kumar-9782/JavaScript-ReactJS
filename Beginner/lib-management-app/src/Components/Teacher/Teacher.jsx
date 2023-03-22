import React, { useEffect, useReducer } from "react";
import Card from "../Utility/Card";
import Table from "../Utility/Table/Table";
import { Teacher as Guru } from "../Utility/Utility";

const Teacher = () => {
  useEffect(function () {
    Guru.load();
  }, []);
  Guru.TableFields = ["id", "name", "email", "contact", "address", "stream"];
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
