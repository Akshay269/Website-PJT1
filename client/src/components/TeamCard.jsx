import React from "react";
import "../styles/team.css";
const Team = (props) => {
  return (
    <>
      <div class="team-container m-5 w-1/5">
        <div class="row vh-100">
          <div class="col-sm-6 col-lg-3 my-auto">
            <div class="teamBox shadow-sm p-4">
              <div class="image-wrapper mb-3">
                <img class="img-fluid h-44" src={props.img} alt="..." />
              </div>
              <div class="teamBox-desc">
                <h5>{props.title}</h5>
                <p>{props.body}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Team;
