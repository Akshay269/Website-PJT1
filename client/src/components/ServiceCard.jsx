import React from "react";
import "../styles/services.css";
const ServiceCard = (props) => {
  return (
    <>
      <div class="cardtemp m-5">
        <a href="#" class="card education p-2">
          <div class="overlay"></div>
          <div class="circle"></div>
          <h4 className="emph text-2xl text-white font-bold">{props.title}</h4>
          <p className="text-sm">{props.body}</p>
        </a>
      </div>
    </>
  );
};

export default ServiceCard;
