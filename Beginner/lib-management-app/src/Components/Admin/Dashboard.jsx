import React from "react";
import Table from "../Utility/Table/Table";

let admins = [
  [
    "Manish",
    "manishkumar9782@gamil.com",
    "mera address pta nhi hai",
    "78945461237",
    "02-03-2023",
  ],
  [
    "Abhishek",
    "abhishek420@gamil.com",
    "Purani haveli ke pechi jhopdi me",
    "78945461237",
    "01-03-2023",
  ],
  [
    "Ravi Kumar",
    "ravikumar007@gamil.com",
    "Abhishek 420 ki bagal wali jhopdi",
    "78945461237",
    "13-02-2023",
  ],
];

const Dashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div className="container">
        <Table
          title="Admin Section"
          fields={["Name", "Email", "Address", "PhoneNumber", "Reg Date"]}
          data={admins}
        />
      </div>
    </div>
  );
};

export default Dashboard;
