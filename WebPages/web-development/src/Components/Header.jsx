import React from "react";
import Navbar from "./Navbar";
const logo = process.env.PUBLIC_URL + "./technology.png";
const Header = (props) => {
  return (
    <header>
      <div className="d-flex jc-between w-100 pt-3">
        <div className="flex-row">
          {/* logo */}
          <img className="logo-64" src={logo} alt="logo" />
          <div className="text-left px-2">
            <b>Web Development</b> <br />
            <span>A Roadmap in future Technology</span>
          </div>
        </div>

        <div className="d-flex column-gap-4 al-center">
          <div className="icon-text">
            <i class="bi bi-telephone icon"></i>
            <span>
              <b>+91-9785641235</b>
              <br />
              Contact Number
            </span>
          </div>

          <div className="icon-text">
            <i class="bi bi-cpu icon"></i>
            <span>
              <b>Self Placed Training</b>
              <br />
              Become Master
            </span>
          </div>
        </div>
      </div>

      <Navbar />
    </header>
  );
};

export default Header;
