import MenuOutlined from "@mui/icons-material/Menu";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logopic from "../assets/logo.jpeg";
import MenuItems from "./MenuItems";

const Header = () => {
  const [active, setActive] = useState(false);
  const [navbar, setNavbar] = useState(false);

  const navigate = useNavigate();

  const showMenu = () => {
    setActive(!active);
  };
  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else setNavbar(false);
  };
  window.addEventListener("scroll", changeBackground);
  return (
    <div
      className={`fixed w-full text-white flex justify-between p-4 items-center z-10 ${
        navbar ? "navbar-active" : "bg-transparent"
      }`}
    >
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={logopic} alt="logo" className="w-16 cursor-pointer" />
      </div>

      <nav>
        <div className="absolute right-6 md:hidden top-6 scale-150">
          <MenuOutlined
            onClick={showMenu}
            className="scale-150 cursor-pointer"
          />
        </div>

        <ul className="hidden text-xl md:flex gap-8 p-6 uppercase bg-transparent">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/services">Services</Link>
          </li>
          <li>
            <Link to="/privacy">Terms</Link>
          </li>
          {localStorage.getItem("user_token") ||
          localStorage.getItem("admin_token") ? (
            localStorage.getItem("user_token") ? (
              <>
                <li>
                  <button
                    className="uppercase"
                    onClick={() => {
                      navigate("/userdashboard");
                    }}
                  >
                    Dashboard
                  </button>
                </li>
                <li>
                  <button
                    className="uppercase"
                    onClick={() => {
                      localStorage.removeItem("user_token");
                      navigate("/");
                      window.location.reload();
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button
                    className="uppercase"
                    onClick={() => {
                      navigate("/admindashboard");
                    }}
                  >
                    Dashboard
                  </button>
                </li>
                <li>
                  <button
                    className="uppercase"
                    onClick={() => {
                      localStorage.removeItem("admin_token");
                      navigate("/");
                      window.location.reload();
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            )
          ) : (
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          )}
        </ul>
        <MenuItems showMenu={showMenu} active={active} />
      </nav>
    </div>
  );
};

export default Header;
