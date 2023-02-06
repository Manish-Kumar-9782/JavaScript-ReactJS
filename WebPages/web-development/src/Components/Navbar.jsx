import React from "react";

const Navbar = (props) => {
  return (
    <nav className="d-flex py-4 jc-center">
      <ul className="d-flex nav-list column-gap-5">
        <li>Home</li>
        <li>Trends</li>
        <li>Technologies</li>
        <li>Future</li>
        <li>AI Technologies</li>
        <li className="active">Web Development</li>
        <li>Contact Us</li>
      </ul>
    </nav>
  );
};

export default Navbar;
