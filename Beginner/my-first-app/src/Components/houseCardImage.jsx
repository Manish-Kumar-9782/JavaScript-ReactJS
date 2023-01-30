const HouseCardImage = (props) => {
  return (
    <div className="card-image">
      <img src={props.image} alt="card-header" />
    </div>
  );
};

export default HouseCardImage;
