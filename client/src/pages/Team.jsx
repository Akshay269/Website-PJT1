import React from "react";
import Navbar from "../components/navbar";
import TeamCard from "../components/TeamCard";
import about1 from "../assets/about1.svg";

export default function Team() {
  return (
    <div>
      <Navbar />
      <img className="imgabout" src={about1} />
      <div className="title text-left absolute top-32 m-5 p-5 left-20 font-semibold text-white">
        <h2 className="text-5xl m-5 p-5">Our Team</h2>
        <p className="team-info text-3xl m-5 p-5">
          All of our services hinge around our promise of delivering brand
          awareness, traffic and leads by bringing content, marketing and sales
          together. Each of our Business Hubs feed into whichever digital
          marketing service that you require. Our innovative approach ensures
          that your business – whether small or large – receives perfectly
          tailored strategic insight and added value. They are the axis around
          which everything else revolves.
        </p>
      </div>
      <div className="flex flex-wrap w-full h-full justify-center items-center">
        <TeamCard name="Rangaade Patle" role="bknd" />
        <TeamCard name="Rangaade Patle" role="bknd" />
        <TeamCard name="Rangaade Patle" role="bknd" />
        <TeamCard name="Rangaade Patle" role="bknd" />
      </div>
    </div>
  );
}
