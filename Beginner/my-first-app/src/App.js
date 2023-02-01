import "./App.css";
import img from "../src/Bangalo.jpg";
import img2 from "../src/WitcherWall2.jpg";
import HouseCard from "./Components/HouseCard";

const App = () => {
  return (
    <div>
      <HouseCard image={img} dealerImage={img2} />
    </div>
    // we ca not return multiple jsx elements.
  );
};

export default App;
