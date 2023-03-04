import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import RegisterStudents from "./RegisterStudents";
const Registrations = () => {
  return (
    <div>
      <header>
        <h1 className="text-start px-5">Registration section</h1>
      </header>

      <div className="row">
        <div className="col-4">
          {/* link for each type registration. */}
          <ul
            style={{
              listStyleType: "none",
            }}
            className="d-flex flex-column list-group"
          >
            <li className="list-group-item border">
              <Link to="book">
                <i class="bi bi-pie-chart-fill"></i> Register Book
              </Link>
            </li>

            <li className="list-group-item border">
              <Link to="student">
                <i class="bi bi-pie-chart-fill"></i> Register Student
              </Link>
            </li>

            <li className="list-group-item border">
              <Link to="teacher">
                <i class="bi bi-pie-chart-fill"></i> Register Teacher
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-8">
          <Routes path="/registrations">
            <Route path="/book" element={<h1>register books</h1>} />
            <Route path="/student" element={<RegisterStudents />} />
            <Route path="/teacher" element={<h1>register teacher</h1>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Registrations;
