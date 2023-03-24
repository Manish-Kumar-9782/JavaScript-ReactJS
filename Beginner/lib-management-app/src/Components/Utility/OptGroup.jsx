import React from "react";
import Option from "./Option";
const OptGroup = (props) => {
  return (
    <optgroup label={props.label}>
      {props.optionList.map((option) => {
        return <Option key={option.key} value={option.value} />;
      })}
    </optgroup>
  );
};

export default OptGroup;

OptGroup.defaultProps = {
  optionList: [],
  label: "Unknown",
};
