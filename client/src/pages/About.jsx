import React from "react";
import Navbar from "../components/navbar";
import "../styles/index.css";
import about1 from "../assets/about1.svg";
import aboutus from "../assets/aboutimg.png";
import Footer from "../components/Footer";
import Navbar2 from "../components/Navbar2";

export default function About() {
  return (
    <>
      <Navbar />

      <div className="aboutbg h-screen p-16">
        {/* <img className="imgabout" src={about1} /> */}
        <div className="flex justify-center items-center flex-col title text-left pt-16 text-5xl font-semibold text-white">
          <h1 className="m-2 p-2 emph">About Us</h1>
          <img className="m-5 rounded-md w-1/4" src={aboutus} alt="" />
          <div className="about-text rounded-lg w-3/4 mt-4">
            <p className="text-3xl m-2 p-2">
              ETWOT is a one roof solution for your technical requirements. We
              have a methodical team which caters all your needs form web
              development to logo designing and will also support you throughout
              with digital marketing and much more. us our team of technical
              experts will provide you a personalized experience available
              nowhere else within the limits of your pocket.
            </p>
          </div>
        </div>
      </div>
      <div className="position-fixed bottom-0"></div>
      <Footer />
    </>
  );
}
