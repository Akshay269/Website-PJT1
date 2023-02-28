import React from "react";
import "../styles/footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <div class="footer mt-auto">
        <div class="inner-footer">
          <div class="footer-items">
            <h1>ETWOT</h1>
            <p>Description of any product or motto of the company.</p>
          </div>

          <div class="footer-items">
            <h3 className="text-2xl">Quick Links</h3>
            <div class="border1"></div>
            <ul className="footer-ul text-xl">
              <a href="#">
                <li>Home</li>
              </a>
              <a href="#">
                <li>Search</li>
              </a>
              <a href="#">
                <li>Contact</li>
              </a>
              <a href="#">
                <li>About</li>
              </a>
            </ul>
          </div>

          <div class="footer-items">
            <h3 className="text-2xl">Services</h3>
            <div class="border1"></div>
            <ul className="footer-ul text-xl">
              <a href="/services">
                <li>
                  <Link to="/services">Digital Marketing</Link>
                </li>
              </a>
              <a href="/services">
                <li>
                  <Link to="/services">Content Creation</Link>
                </li>
              </a>
              <a href="/services">
                <li>
                  <Link to="/services">Logo Designing</Link>
                </li>
              </a>
              <a href="/services">
                <li>
                  <Link to="/services">Web Development</Link>
                </li>
              </a>
              <a href="/services">
                <li>
                  <Link to="/services">Graphic Designing</Link>
                </li>
              </a>
            </ul>
          </div>

          <div class="footer-items">
            <h2 className="text-2xl">Contact us</h2>
            <div class="border1"></div>
            <ul className="footer-ul text-xl">
              <li className="flex items-center">
                <i class="fa fa-envelope" aria-hidden="true"></i>
                <a href="mailto:support@etwot.com">support@etwot.com</a>
              </li>
            </ul>

          </div>
        </div>

        <div class="footer-bottom">Copyright &copy; ETWOT</div>
      </div>
    </>
  );
};

export default Footer;
