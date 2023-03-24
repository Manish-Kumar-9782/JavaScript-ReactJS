import React from "react";
import Option from "./Option";
const OptGroup = (props) => {
  console.log("OptGroup props: ", props);
  return (
    <optgroup label={props.label}>
      {props.optionList.map((option) => {
        return (
          <Option
            keyId={option.key}
            value={option.value}
            userModal={props.userModal}
          />
        );
      })}
    </optgroup>
  );
};

export default OptGroup;

OptGroup.defaultProps = {
  optionList: [],
  label: "Unknown",
};
