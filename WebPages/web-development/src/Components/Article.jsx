import React from "react";

const Article = (props) => {
  return (
    <div
      className={"article p-3".concat(" ", props.classNames)}
      style={{
        height: `${props.height}`,
        overflow: "hidden",
        backgroundImage: props.bgImage,
        borderStyle: props.borderStyle,
        ...props.style,
      }}
    >
      <h3 className="title" style={props.titleStyle}>
        {props.title}
      </h3>
      <p className="description" style={props.descStyle}>
        {props.description}
      </p>
    </div>
  );
};

Article.defaultProps = {
  title: "Title",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam architecto quidem esse quam, ",
  classNames: "",
  height: "100%",
  bgImage: "none",
  borderStyle: "none",
};

export default Article;
