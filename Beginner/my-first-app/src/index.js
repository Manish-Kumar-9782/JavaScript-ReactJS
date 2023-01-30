// first we will import react and react-dom/client.
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Now we will get the root element.

const root = document.getElementById("root");

// Now we will pass this root into the createRoot method.
const ReactRoot = ReactDOM.createRoot(root);

ReactRoot.render(<App />);
