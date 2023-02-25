import React from "react";
import CellData from "./CellData";
import CellHeading from "./CellHeading";
import Edit from "./Edit";
import Delete from "./Delete";

const Row = (props) => {
  return (
    <tr>
      {props.type === "heading"
        ? // for heading row
          props.data.map((cell_data, index) => {
            return <CellHeading key={index} data={cell_data} />;
          })
        : // for normal data row
          props.data.map((cell_data, index) => {
            return <CellData key={index} data={cell_data} />;
          })}

      <CellData
        key={-1}
        data={
          props.type !== "heading"
            ? [
                <Edit id={props.id} update={props.update} />,
                <Delete id={props.id} delete={props.delete} />,
              ]
            : null
        }
      />
    </tr>
  );
};

export default Row;
