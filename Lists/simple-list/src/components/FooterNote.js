import ListBox from "./ListBox";
import { useState } from "react";

const FooterNote = ({ points }) => {
  const [Points, setPoint] = useState(points);

  return (
    <div>
      <ListBox dataPoints={Points} />
    </div>
  );
};

export default FooterNote;
