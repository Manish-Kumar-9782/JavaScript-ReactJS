import ListBox from "./components/ListBox";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { useState } from "react";

const data = [
  "This is item 1",
  "This is item 2",
  "This is item 3",
  "This is item 4",
  "This is item 5",
];

const list8_data = [
  "Work On the HTML Elements",
  "Work On List & Tables",
  "Introduction To Background Image",
  "Working with Semantic Layout",
  "Making An HTML Form",
];

const NumberOfLists = 8;
let currentPos = 8;

function App({ style }) {
  const [currentList, setList] = useState(currentPos);
  const [currentData, setData] = useState(list8_data);

  let onLeftShift = () => {
    if (currentList > 0) {
      setList(--currentPos);
    }
  };

  let onRightShift = () => {
    if (currentList < NumberOfLists && currentList >= 0) {
      setList(++currentPos);
    }
  };

  return (
    <div className="App" style={style}>
      <Header value={"List " + currentList} />
      <ListBox dataPoints={currentData} listPos={currentList} />
      <Footer onLeftClick={onLeftShift} onRightClick={onRightShift} />
    </div>
  );
}

App.defaultProps = {
  style: {
    border: "1px solid red",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    height: "100vh",
  },
};

export default App;
