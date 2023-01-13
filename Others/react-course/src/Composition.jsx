import React from "react";
import WelcomeDialog from "./Sections/ComponentInheritance/CompositionIntro";
import FancyCardComposition from "./Sections/ComponentInheritance/FancyCardComposition";

const Composition = () => {
  return (
    <div>
      <div className="form-block">
        <p className="heading-mark heading">
          Passing a Component into another Component
        </p>
        <WelcomeDialog />
      </div>

      <div className="form-block">
        <p className="heading-mark heading">
          A Fancy Card with Another components.
        </p>
        <FancyCardComposition />
      </div>
    </div>
  );
};

export default Composition;
