import React, { useState } from "react";

const Input = (props) => {

  const [input, setInput] = useState("");
  // a State to manage the input state of the component.

  function changeState(e) {
    setInput(e.target.value);
  }

  return (
    <div>
      <input type="text" onChange={changeState} value={input}

        onKeyUp={(e) => {
          if (e.key === "Enter") {
            props.onSave(input)
            setInput("");
          }
        }}

      />
      <button type="button" onClick={(e) => {
        props.onSave(input);
        setInput("");
      }}>Add</button>
    </div>
  );
};

export default Input;
