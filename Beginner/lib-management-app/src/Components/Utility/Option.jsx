import React from "react";

const Option = (props) => {
  return (
    <option data-user-modal={props.userModal} value={props.keyId}>
      {props.value}
    </option>
  );
};

export default Option;
