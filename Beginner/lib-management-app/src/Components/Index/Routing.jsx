import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Dashboard from "../Admin/Dashboard";
import Student from "../Student/Student";
import Teacher from "../Teacher/Teacher";
import Book from "../Book/Book";
import Registrations from "../Registrations/Registrations";
const Routing = () => {
  return (
    <div className="col-10 border">
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/student" element={<Student />} />

        <Route path="/teacher" element={<Teacher />} />

        <Route path="/books" element={<Book />} />

        <Route path="/registrations/*" element={<Registrations />} />
      </Routes>
    </div>
  );
};

export default Routing;