import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Dashboard from "../Admin/Dashboard";
const Routing = () => {
  return (
    <div className="col-10 border">
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default Routing;
