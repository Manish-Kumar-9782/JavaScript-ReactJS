import React, { useRef } from "react";

const Input = (props) => {
  const input = useRef();

  return (
    <div className="input-group" hidden={props.hidden === true ? true : false}>
      <label htmlFor={props.title}>{props.label}</label> <br />
      <input
        ref={input}
        id={props.title}
        type="text"
        name={props.title}
        onKeyDownCapture={(e) => {
          input.value = e.target.value;
        }}
      />
    </div>
  );
};

export default Input;

Input.defaultProps = {
  id: null,
  action: "add",
  hidden: false,
};

// knows action:
// add:  to add a new entry
// change: to edit the existing entry.
