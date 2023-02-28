import React from "react";
import Navbar from "../components/navbar";
import Card from "../components/Card/card";
import wave1 from "../assets/bg.jpg";
import "../components/Card/style.css";
import cardbg from "../assets/cardbg.jpg";
import InfoCard from "../components/InfoCard";
import Footer from "../components/Footer";
import Navbar2 from "../components/Navbar2";

export default function Home() {
  const img1 = () => {
    document.getElementById("hero").style.backgroundImage = `url(${wave1})`;
    document.getElementById("hero").style.transition = "ease-in-out 1s";
  };

  const img2 = () => {
    document.getElementById("hero").style.backgroundImage = `url(${wave1})`;
    document.getElementById("hero").style.transition = "ease-in-out 1s";
  };

  const originalImg = () => {
    document.getElementById("hero").style.backgroundImage = `url(${wave1})`;
    document.getElementById("hero").style.transition = "ease-in-out 1s";
  };

  return (
    <>
      <Navbar />
      <div
        className="w-full h-screen bg-cover bg-center flex flex-col items-center px-4"
        id="hero"
      >
        <div className="w-full h-screen bg-cover bg-center flex items-center justify-between px-4">
          <div className="w-1/2">
            <div className="hometext p-2 text-white text-5xl w-full font-bold">
              <p>
                ETWOT is a one stop interface connecting clients and technical
                experts of every field. <br /> Revolutionise the digital reach
                of your business with our experts.
              </p>
            </div>
          </div>
          <Card
            title="Expertise"
            img={cardbg}
            body="ETWOT has carefully vetted and picked technical experts from all around the globe."
            mouseEnter={img1}
            mouseLeave={originalImg}
          />
          <Card
            title="Experience"
            img={cardbg}
            body="Experience a hassle free interface and personalised experience with in your budget."
            mouseEnter={img2}
            mouseLeave={originalImg}
          />
        </div>
      </div>
      <div className="w-full h-screen bg-cover bg-center flex items-center justify-end px-4">
        <InfoCard />
      </div>
      <Footer />
    </>
  );
}
