import { useState } from "react";

const GameButton = (prop) => {
  return (
    <div>
      <button
        type="button"
        className="game-button"
        onClick={(e) => prop.onClick(e)}
      >
        {prop.value}
      </button>
    </div>
  );
};

export default GameButton;
