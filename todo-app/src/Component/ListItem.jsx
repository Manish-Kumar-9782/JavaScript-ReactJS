import React from "react";
import { useState } from "react";
import Edit from "./Edit";

const ListItem = (props) => {
  const [textInput, setTextInput] = useState(null);

  function removeTextEdit() {
    setTextInput(null);
  }

  function updateText() {
    setTextInput(
      <Edit
        currentData={props.text}
        data={props.listData}
        id={props.id}
        setData={props.setTodoItems}
        removeEdit={removeTextEdit}
      />
    );
  }

  return (
    <li>
      <input type="checkbox" />
      <p
        style={{
          width: "150px",
          backgroundColor: "lightgray",
          display: "inline-block",
          margin: "5px 10px",
        }}
      >
        {props.text}
      </p>
      {textInput}
      <button onClick={updateText}>edit</button>
      <button onClick={() => props.onDelete(props.id)}>delete</button>
    </li>
  );
};

export default ListItem;
