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
          props.data.map((cell_data) => {
            return <CellHeading data={cell_data} />;
          })
        : // for normal data row
          props.data.map((cell_data) => {
            return <CellData data={cell_data} />;
          })}

      <CellData
        data={
          props.type !== "heading"
            ? [
                <Edit id={props.id} />,
                <Delete id={props.id} delete={props.delete} />,
              ]
            : null
        }
      />
    </tr>
  );
};

export default Row;
