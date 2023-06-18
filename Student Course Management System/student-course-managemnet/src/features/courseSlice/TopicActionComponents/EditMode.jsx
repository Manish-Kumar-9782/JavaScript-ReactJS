import React, { useState } from "react";
import { Form } from "react-bootstrap";

const EditMode = ({ value, onChangeValue }) => {
  const [text, setText] = useState(value);
  const onChange = (e) => setText(e.target.value);

  const onHitEnter = (e) => {
    if (e.key === "Enter") onChangeValue(text);
  };

  return <Form.Control value={text} onChange={onChange} onKeyUp={onHitEnter} />;
};

export default EditMode;
