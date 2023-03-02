import React from "react";
import TableRow from "./TableRow";
const Table = (props) => {
  return (
    <table className="table">
      <caption
        style={{
          captionSide: "top",
          textAlign: "center",
        }}
      >
        {props.title}
      </caption>
      <thead>
        <TableRow type="head" data={props.fields} />
      </thead>

      <tbody>
        {props.data.map((item, index) => {
          return <TableRow key={index} type="body" data={item} />;
        })}
      </tbody>
    </table>
  );
};

export default Table;

Table.defaultProps = {
  data: [],
  fields: [],
};
