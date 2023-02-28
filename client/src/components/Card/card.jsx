import React from "react";
import useState from "react-dom";
import cardbg from "../../assets/cardbg.jpg";

import "./style.css";
const Card = (props) => {
  return (
    <>
      <div className="col">
        <div
          className="container"
          onMouseEnter={props.mouseEnter}
          onMouseLeave={props.mouseLeave}
        >
          <div
            className="front"
            style={{
              color: "#fff",
              background: `url(${props.img}) bottom right 15% no-repeat #46B6AC`,
            }}
          >
            <div className="inner">
              <p>{props.title}</p>
            </div>
          </div>
          <div
            className="back"
            style={{
              color: "#fff",
              background: `url(${props.img}) bottom right 15% no-repeat #46B6AC`,
            }}
          >
            <div className="inner">
              <p>{props.body}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
