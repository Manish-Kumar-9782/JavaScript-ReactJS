import "./houseCard.css";

import HouseCardImage from "./houseCardImage";

const HouseCard = (props) => {
  return (
    <div className="houseCard">
      <HouseCardImage image={props.image} />
      {/* 
            1. Image
            2. Description
            3. BHK Details
            4. Dealer
         */}

      <div className="card-description"></div>
      <div className="card-bhk_details"></div>
      <div className="card-dealer"></div>
    </div>
  );
};

export default HouseCard;
