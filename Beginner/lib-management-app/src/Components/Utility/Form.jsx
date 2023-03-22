import React, { useRef } from "react";
import InputGroup from "./Input/InputGroup";
import { FormModel } from "./Utility";
/**
 * inputs: [
 * {title: "title", label: "Title"}]
 */

const Form = (props) => {
  const form = useRef();
  const formModel = new FormModel(
    form,
    props.formName,
    props.database,
    props.inputs,
    props.input_names,
    props.model
  );

  return (
    <div
      className="border p-4 shadow"
      style={{
        width: props.width,
      }}
    >
      <form action="#" ref={form}>
        {props.inputs.map((input, index) => {
          return <InputGroup title={input.title} label={input.label} />;
        })}
      </form>
      <button onClick={(e) => formModel.saveEntry()}>Submit</button>
    </div>
  );
};

export default Form;
