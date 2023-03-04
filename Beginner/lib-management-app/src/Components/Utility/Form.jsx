import React from "react";
import InputGroup from "./Input/InputGroup";

/**
 * inputs: [
 * {title: "title", label: "Title"}]
 */

const Form = (props) => {
  return (
    <div
      className="border p-4 shadow"
      style={{
        width: props.width,
      }}
    >
      <form action="#">
        {props.inputs.map((input, index) => {
          return <InputGroup title={input.title} label={input.label} />;
        })}
      </form>
    </div>
  );
};

export default Form;
