import React from "react";

const FancyBorder = (props) => {
  /** @private
   *
   * FancyBorder: a border with legend icon or text , we can place the text or icon on top of the border
   * it has three position top-left, top-right anc top-center.
   *
   * @props :: borderStyle ::Component FancyBorder's Container Border style.
   * @props :: borderColor ::Component FancyBorder's Container Border color.
   * @props :: borderWidth ::Component FancyBorder's Container Border width.
   * @props :: legendIcon ::Component FancyBorder's legend as Icon which will be displayed over the border.
   * @props :: legendText ::Component FancyBorder's legend as Text which will be displayed over the border.
   */
  return (
    <fieldset
      className="FancyBorder"
      style={{
        borderStyle: props.borderStyle,
        borderColor: props.borderColor,
        borderWidth: props.borderWidth,
        ...props.style,
      }}
    >
      <legend className="legend">
        {props.legendIcon}
        {props.legendText}
      </legend>
      {props.element}
    </fieldset>
  );
};

FancyBorder.defaultProps = {
  borderStyle: "solid",
  borderColor: "lightGray",
  borderWidth: "10px",
};

export default FancyBorder;
