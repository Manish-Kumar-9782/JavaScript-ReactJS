import React from "react";

const ListItem = (props) => {
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
      <button>edit</button>
      <button onClick={() => props.onDelete(props.id)}>delete</button>
    </li>
  );
};

export default ListItem;
