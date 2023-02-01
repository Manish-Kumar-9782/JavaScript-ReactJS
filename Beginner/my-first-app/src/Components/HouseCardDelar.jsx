const HouseCardDelar = (props) => {
  return (
    <div className="card-dealer p-4">
      <span>RETAILER</span>
      <div className="flex-row">
        <img src={props.dealerImage} alt="User avatar" className="user-img" />
        <p>
          <span>User Name</span> <br />
          <span>+91-9784561239</span>
        </p>
      </div>
    </div>
  );
};

export default HouseCardDelar;
