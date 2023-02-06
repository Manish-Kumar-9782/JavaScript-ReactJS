import React from "react";
// import "./style.css";
/**
 * This Container Component is used to contain many other components so it can have background
 * image, gradient color and also other Container as well with specified width.
 *
 */

const Container = (props) => {
  const CssClasses = [
    props.justifyContent, //justify content by passing justify-content values.
    props.ColorImage, // a linear gradient image class.
    props.bgImageOverlay, // a color overlay class that will overlay the background.
  ].join(" ");
  return (
    <div
      className={["container-fluid px-5", CssClasses].join(" ")}
      style={{
        backgroundImage:
          props.bgImage !== "none"
            ? `url(${props.bgImage})`
            : props.bgGradientColor,
        paddingTop: props.topGap,
        backgroundColor: props.bgColor,
        marginBottom: props.bottomGap,
      }}
    >
      {props.title && (
        <h2
          className={"text-center".concat(" ", props.gradientTitle)}
          style={{
            marginBottom: props.titleGap,
            ...props.titleStyle,
          }}
        >
          {props.title}
        </h2>
      )}

      {props.children}
    </div>
  );
};

Container.defaultProps = {
  bgColor: "none",
  bgImage: "none",
  justifyContent: "center",
  topGap: 15,
  bottomGap: 15,
  title: "",
  gradientTitle: "",
  children: [],
};

export default Container;
