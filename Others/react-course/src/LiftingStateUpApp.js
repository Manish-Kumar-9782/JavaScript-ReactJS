import React from "react";
import TempCalculator from "./Sections/LiftingStateUp/Temperature";
import TempCalculatorShared from "./Sections/LiftingStateUp/TempCalculatorSecondInput";

/** Lifting State Up
 *
 * In this section we will see that how to make sharable States.
 *
 * Often, Several components need to reflect the same changing data.
 * recommend lifting the shared state up to their closet common ancestor.
 *
 */

const LiftingStateUpApp = () => {
  return (
    <div>
      <h1 className="text-center ">Lifting State Up</h1>
      <hr />
      <div className="form-block">
        <p className="heading heading-mark">
          First Temperature in Celsius Example With Boiling water message.
        </p>
        <TempCalculator />
      </div>

      <div className="form-block">
        <p className="heading heading-mark">
          Temperature Conversion in Celsius to Fahrenheit or Vice Versa
        </p>
        <TempCalculatorShared />
      </div>
    </div>
  );
};

export default LiftingStateUpApp;
