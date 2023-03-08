import React, { useState } from "react";
import "../styles/signup.css";
import Navbar from "../components/navbar";
import about1 from "../assets/about1.svg";
import Footer from "../components/Footer";
import {  useNavigate } from "react-router-dom";
import { login_admin } from "../controllers/admin";
import { login_user } from "../controllers/user";
import { register_admin } from "../controllers/admin";
import { register_user } from "../controllers/user";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  let [userType, setUserType] = useState("admin");

  const handleChange = async (e) => {
    e.preventDefault();

    if (userType === "admin") {
      let obj = {
        admin_name: name,
        admin_email: email,
        admin_password: password,
      };
      register_admin(obj).then((data) => alert(data.message));
      // console.log(obj);
    } else if (userType === "user") {
      let obj = {
        user_name: name,
        user_email: email,
        user_password: password,
        user_contact: contact,
      };
      register_user(obj).then((data) => {
        alert(data.message);
        console.log(data);
      });
    }
    setEmail("");
    setName("");
    setPassword("");
  };

  const login_handleChange = async (e) => {
    e.preventDefault();
    let login_userType = document.getElementById("login_type").value;
    if (login_userType === "admin") {
      let obj = {
        admin_email: email,
        admin_password: password,
      };
      login_admin(obj).then((data) => {
        console.log(data);
        if (data.tag) {
          localStorage.setItem("admin_token", data.token);
          navigate("/admindashboard");
        } else {
          alert("Invalid login");
        }
        window.location.reload();
      });
    } else if (login_userType === "user") {
      let obj = {
        user_email: email,
        user_password: password,
      };
      login_user(obj).then((data) => {
        if (data.tag === true) {
          localStorage.setItem("user_token", data.token);
          navigate("/userdashboard");
        } else {
          alert("Invalid login");
        }
        window.location.reload();
      });
    }
  };


  return (
    <>
      <Navbar />
      <img className="imgabout absolute" alt="signup" src={about1} />
      <div className="w-full h-screen bg-cover bg-center flex justify-center items-center px-4 bg-[#c7cacd]">
        <div className="main z-1 mt-32">
          <input
            className="input"
            type="checkbox"
            id="chk"
            aria-hidden="true"
          />

          <div class="signup">
            <form method="POST">
              <label className="label" for="chk" aria-hidden="true">
                Sign up
              </label>
              <select
                onChange={(e) => setUserType(e.target.value)}
                className="dropdown"
                name="user_type"
                required
              >
                <option value="" disabled selected hidden>
                  Admin/User
                </option>
                {/* <option value="admin">Admin</option> */}
                <option value="user">User</option>
              </select>
              <input
                className="input"
                type="text"
                name="txt"
                placeholder="User name"
                required=""
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <input
                className="input"
                type="email"
                name="email"
                placeholder="Email"
                required=""
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />

              {userType === "user" && (
                <PhoneInput
                  className="input"
                  id="contact"
                  placeholder="Contact"
                  required=""
                  value={contact}
                  onChange={setContact}
                />
              )}

              <input
                className="input"
                type="password"
                name="pswd"
                placeholder="Password"
                required=""
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button
                className="signup-btn"
                value="Register"
                onClick={handleChange}
              >
                Sign up
              </button>
            </form>
          </div>

          <div class="login">
            <form>
              <label className="label" for="chk" aria-hidden="true">
                Login
              </label>
              <select
                className="dropdown"
                name="user_type"
                id="login_type"
                required
              >
                <option value="" disabled selected hidden>
                  Admin/User
                </option>
                {/* <option value="admin">Admin</option> */}
                <option value="user">User</option>
              </select>
              <input
                className="input"
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required=""
              />
              <input
                className="input"
                type="password"
                name="pswd"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required=""
              />
              <button className="signup-btn" onClick={login_handleChange}>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
