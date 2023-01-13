import React from "react";

/**
 * In this section we will define a FancyCard Component which will be used to display
 * card with a title and description. This component will have a theme with dark and
 * light colors.
 */
const FancyCard = (props) => {
  return (
    <div className="fancy-card theme-dark">
      <h1 className="border-bottom">{props.title}</h1>
      <p className="border-bottom">{props.description}</p>
      <p>
        <span>{props.author}</span> <span>{Date.now().toLocaleString()}</span>
      </p>
      {props.children}
    </div>
  );
};

export default FancyCard;
