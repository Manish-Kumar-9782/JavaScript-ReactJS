import "./houseCard.css";

import HouseCardImage from "./houseCardImage";
import HouseCardBhk from "./HouseCardBhk";
import HouseCardDelar from "./HouseCardDelar";
import HouseCardDescription from "./HouseCardDescription";

const HouseCard = (props) => {
  return (
    <div className="houseCard">
      <HouseCardImage image={props.image} />
      <HouseCardDescription />
      <HouseCardBhk />
      <HouseCardDelar dealerImage={props.dealerImage} />
    </div>
  );
};

export default HouseCard;
