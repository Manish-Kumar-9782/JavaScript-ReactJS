import "./App.css";
import img from "./WitcherWall2.jpg";
import HouseCard from "./Components/HouseCard";

const App = () => {
  return (
    <div>
      <HouseCard image={img} />
    </div>
    // we ca not return multiple jsx elements.
  );
};

export default App;
