import React from "react";

const Option = ({ keyId, value, userModal, select }) => {
  return (
    <option
      data-user-modal={userModal}
      value={keyId}
      selected={select ? true : false}
    >
      {value}
    </option>
  );
};

export default Option;
