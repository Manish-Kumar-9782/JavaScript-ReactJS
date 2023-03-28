import React from "react";
import Counter from "./Counter";
import { Const } from "./Utility";
const Card = (props) => {
  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between">
        <h3 className="card-title text-start">{props.title}</h3>
        <Counter
          modal={props.counterModal}
          showRecent={props.showCounterRecent}
          field={props.counterFiled}
        />
      </div>
      <div className="card-body d-flex align-items-center gap-5">
        {props.body}
      </div>
      <div className="footer">{props.footer}</div>
    </div>
  );
};

export default Card;
