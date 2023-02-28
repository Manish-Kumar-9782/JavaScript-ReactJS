import React from "react";
import { useState } from "react";
import ContainerA from "./ContainerA";
import { createContext } from "react";

// now we will create a new context
export const MyContext = createContext(null);

const ContextApp = () => {
  const [propValue, setPropValue] = useState("my prop value");
  const [contextValue, setContextValue] = useState("my context value");

  return (
    <MyContext.Provider value={contextValue}>
      <div>
        <h1>Top Level Container App</h1>
        <ContainerA value={propValue} />
      </div>
    </MyContext.Provider>
  );
};

export default ContextApp;
