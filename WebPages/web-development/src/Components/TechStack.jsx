import React from "react";

const TechStack = (props) => {


  return (
    <div
      className="container d-flex shadow rounded jc-center stack"
      style={{
        position: "relative",
        transform: "translateY(+50%)",
      }}
    >
      {props.items.map((item, index) => {
        return (
          <div
            className={"stack-item text-center p-3 popup".concat(
              index === 2 ? " selected" : ""
            )}
          >
            <p className="fs-5 title">{item.title}</p>
            <p className="text-left description">
              <small>{item.description}</small>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default TechStack;
