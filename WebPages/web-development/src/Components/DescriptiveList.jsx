import React from "react";

const DescriptiveList = (props) => {
  return (
    <dl
      className={"dl-list".concat(" ", props.classNames)}
      style={{
        overflow: "auto",
      }}
    >
      {props.items.map((item, index) => (
        <>
          <dt className="fs-6" style={{ color: "var(--theme-text-color-2)" }}>
            {index + 1 + ". " + item.title}
          </dt>
          <dd>{item.description}</dd>
        </>
      ))}
    </dl>
  );
};

DescriptiveList.defaultProps = {
  classNames: "",
};

export default DescriptiveList;
