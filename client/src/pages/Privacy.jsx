import React from "react";
import Navbar from "../components/navbar";
import about1 from "../assets/about1.svg";
import Footer from "../components/Footer";
import Navbar2 from "../components/Navbar2";

export default function Privacy() {
  return (
    <div className="h-screen ">
      <Navbar />
      {/* <img className="imgabout" src={about1} /> */}
      <div className="policybg about flex flex-col justify-center items-center">
        <div className="bg-[#f3f4f5] about-text title text-left p-3 mt-32 rounded text-3xl font-semibold text-white w-3/4 ">
          <h1 className="text-5xl text-center font-bold emph">
            Terms and Conditions
          </h1>
          <h2 className="m-5 p-5">CODE OF HONOR</h2>
          <div className="text-xl m-5 pl-5">
            These Terms of Use (the “Terms”) are a binding contract between you
            and ETWOT(“ETWOT,” “we” and “us”). If you have any questions,
            comments, or concerns regarding these terms or the Services, please
            contact us.
          </div>
          <p className="text-xl m-5 pl-5">
            In these Terms, “User” means anyone who accesses and/or registers
            for our Services, including without limitation can extract services
            within our policies. violation of which will lead to blacklisting of
            the client.
          </p>
          <p className="text-xl m-5 pl-5">
            The client must respect the conditions asked by our members. once
            the amount is quoted by our employee and you agreed to it, it will
            be finalised . Further no alterations or changes will be made from
            any side ( yours and ours ), once we starts working on it. If the
            user faces any inappropriate behavior or actions by employees from
            our side he/she is adviced and has the freedom to report to us.
          </p>
          <h2 className="m-5 p-5">DEALING RULES</h2>
          <p className="text-xl m-5 pl-5">
            The users are striclty advised not provide any personal information
            to the employee other than what is asked. The privacy of the user is
            our top most priority. We keep your data safe and advice you to do
            the same.
          </p>
          <h2 className="m-5 p-5">PAYMENT POLICIES</h2>
          <p className="text-xl m-5 pl-5">
            The client hereby should pay the entire amount of the services
            required before hand. We ensure to provide best of our services
            within specified time. failing of which we ensure to return the
            amount with in 20-30 business days.
          </p>
          <h2 className="m-5 p-5">USE OF SERVICES</h2>
          <p className="text-xl m-5 pl-5">
            ETWOT only authorizes you to use the Services and Content for your
            own personal use in compliance with all applicable laws. You may not
            resell or make any commercial use of the Services or any Content
            therein (other than your own Submissions). Any Content you access
            through the Services is licensed through your purchase of the
            Services personally to you to view and use the Content. “Content”
            means any information or materials displayed on the Services, such
            as, text, graphics, data, articles, photos, images, illustrations,
            codes, website structure, logos, content answers, and so forth.
            “Submissions” means any Content you post, upload, share, store, or
            otherwise provide through the Services
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
