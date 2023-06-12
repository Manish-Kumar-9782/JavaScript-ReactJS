import React, { useEffect, useState } from "react";
import StudentCourseCard from "./StudentCourseCard";
import { useSelector } from "react-redux";
import { selectAllStudents } from "./studentSlice";

const STUDENTS_URL = "http://localhost:4000/students";

const Students = () => {
  // const students = useSelector(selectAllStudents);
  const [students, setState] = useState();
  // console.log("All Student Profiles: ", students);

  // here on loading the students Component we will fetch the student record from the server.
  useEffect(() => {
    fetch(STUDENTS_URL)
      .then((response) => response.json())
      .then((data) => setState(data));
  }, []);

  console.log("All Student Profiles: ", students);

  const content = students?.map((student) => (
    <StudentCourseCard
      key={student._id}
      student={student}
      displayCourses={true}
    />
  ));
  return (
    <>
      <div style={{ flex: "8.5" }} className="d-flex gap-5 flex-wrap">
        {content}
      </div>
    </>
  );
};

export default Students;
