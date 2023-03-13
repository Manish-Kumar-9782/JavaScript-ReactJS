import React, { useRef } from "react";
import InputGroup from "./Input/InputGroup";

/**
 * inputs: [
 * {title: "title", label: "Title"}]
 */

const Form = (props) => {
  const form = useRef();

  return (
    <div
      className="border p-4 shadow"
      style={{
        width: props.width,
      }}
    >
      <form
        action="#"
        ref={form}
        data-database={props.database}
        data-form-name={props.formName}
      >
        {props.inputs.map((input, index) => {
          return <InputGroup title={input.title} label={input.label} />;
        })}
      </form>
      <button onClick={(e) => props.callback(e, form)}>Submit</button>
    </div>
  );
};

export default Form;
