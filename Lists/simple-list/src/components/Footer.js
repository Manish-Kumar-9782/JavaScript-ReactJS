import { useState } from "react";
import FooterNote from "./FooterNote";
import Navigator from "./Navigator";

const points = {
  "Simplest List": ["Simplest List"],
};

const Footer = ({ onLeftClick, onRightClick }) => {
  const [footNotes, setFootNotes] = useState(points["Simplest List"]);

  return (
    <div>
      <Navigator onLeftClick={onLeftClick} onRightClick={onRightClick} />
      {/* // This section will show the Properties defined to show the list box
      effect. */}

      <FooterNote points={footNotes} />
    </div>
  );
};

export default Footer;
