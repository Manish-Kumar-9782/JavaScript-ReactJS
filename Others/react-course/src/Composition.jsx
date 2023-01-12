import React from "react";
import WelcomeDialog from "./Sections/ComponentInheritance/CompositionIntro";

const Composition = () => {
  return (
    <div>
      <div className="form-block">
        <p className="heading-mark heading">
          Passing a Component into another Component
        </p>
        <WelcomeDialog />
      </div>
    </div>
  );
};

export default Composition;
