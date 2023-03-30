import React, { useEffect, useState } from "react";
import { Const, Student, Teacher, Book } from "./Utility";

export function getCounts(modal) {
  switch (modal) {
    case Const.STUDENT:
      Student.load();
      return Student.Records.length;

    case Const.TEACHER:
      Teacher.load();
      return Teacher.Records.length;

    case Const.BOOK_MODAL:
      Book.load();
      return Book.Records.length;

    default:
      return 0;
  }
}

export function getRecent(modal) {
  switch (modal) {
    case Const.STUDENT:
      Student.load();
      return Student.getRecentRecord("regDate", "date");

    case Const.TEACHER:
      Teacher.load();
      return Teacher.getRecentRecord("regDate", "date");

    case Const.BOOK_MODAL:
      Book.load();
      return Book.getRecentRecord("regDate", "date");

    default:
      return 0;
  }
}

const Counter = ({
  modal,
  showRecent,
  field,
  countCallback,
  recentCallback,
}) => {
  // this will count the total number of item present in a modal
  const [count, setCount] = useState(
    countCallback ? countCallback() : getCounts(modal)
  );
  const [recent, setRecent] = useState(
    recentCallback ? recentCallback() : getRecent(modal)
  );

  useEffect(() => {
    console.log(modal, "recent : ", recent);
  }, [recent]);
  // loading all initial values
  const style = {
    padding: "4px 10px",
    margin: "auto",
  };

  const radius = "30px";
  return (
    <div className="d-flex justify-content-between align-items-center">
      <div
        title={`total`}
        className="counts border border-info"
        style={{
          borderTopLeftRadius: radius,
          borderBottomLeftRadius: radius,
          ...style,
        }}
      >
        {count}
      </div>
      {showRecent ? (
        <div
          title="recent"
          className="recent counts border border-info"
          style={{
            borderTopRightRadius: radius,
            borderBottomRightRadius: radius,
            ...style,
          }}
        >
          {recent[field]}
        </div>
      ) : null}
    </div>
  );
};

export default Counter;
