import React from "react";
import { MyContext } from "./ContextApp";
import { useContext } from "react";
const ContainerC = ({ value }) => {
  const context = useContext(MyContext);

  return (
    <div
      style={{
        width: "100%",
        height: "50vh",
        backgroundColor: "green",
        color: "white",
        padding: "50px",
      }}
    >
      ContainerC
      <h1>Value passed with Context: {context} </h1>
      <h1>Value passed with props: {value}</h1>
    </div>
  );
};

export default ContainerC;
