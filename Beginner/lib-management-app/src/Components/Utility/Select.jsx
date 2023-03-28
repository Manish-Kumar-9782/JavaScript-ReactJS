import React, { Children, useEffect } from "react";
import { IssueContext } from "../Index/Routing";
import { useContext } from "react";
const Select = ({ name, id, placeholder, onSelect, children, disabled }) => {
  return (
    <select
      name={name}
      id={id}
      placeholder={placeholder}
      onChange={(e) => onSelect(e)}
      disabled={disabled}
    >
      {children}
    </select>
  );
};

export const OptGroup = ({ label, optionList, userModal }) => {
  const context = useContext(IssueContext);
  // so: selected Option

  // useEffect(() => {
  //   console.log("new OptGroup context: ", context);
  // }, [context]);

  const so = context?.optionSelected;
  console.log("Rendering OptGroup Component", so);
  return (
    <optgroup label={label}>
      {(optionList ?? []).map((option) => {
        return (
          <Option
            key={option.key}
            keyId={option.key}
            value={option.value}
            userModal={userModal}
            selected={
              option.key === so?.id && option.value === so?.value ? true : false
            }
          />
        );
      })}
    </optgroup>
  );
};

export const Option = (props) => {
  console.log(`Book selected: ${props.keyId}:${props.value}`, props.selected);
  return (
    <option
      data-user-modal={props.userModal}
      value={props.keyId}
      selected={props.selected ? true : false}
    >
      {props.value}
    </option>
  );
};

export default Select;

OptGroup.defaultProps = {
  disabled: false,
};
