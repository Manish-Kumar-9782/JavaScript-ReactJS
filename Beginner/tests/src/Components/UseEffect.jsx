import React, { useEffect, useState } from "react";

const UseEffect = () => {
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);

  console.log("rendering");

  // mounting use effect
  useEffect(() => {
    console.log("Our Component has been mounted..");
  }, []);
  /**
   * Now this above useEffect will be run only on mounting our component.
   */

  useEffect(() => {
    console.log("Common useEffect running...");
  });

  // use effect monitoring our value2
  useEffect(() => {
    for (let i = 0; i < 1000000000; i++) {}
  }, [value2]);

  // use effect monitoring our value1
  useEffect(() => {
    console.log("again rendering");
  }, [value1]);

  console.log("\n------------------------------------------\n");

  function set_Value1() {
    console.log("setting value1");
    setValue1(value1 + 1);
  }

  function set_Value2() {
    console.log("setting value2");
    setValue2(value2 + 1);
  }

  return (
    <div>
      <button onClick={() => set_Value1()}>setValue1</button>
      <button onClick={() => set_Value2()}>setValue2</button>
    </div>
  );
};

export default UseEffect;
