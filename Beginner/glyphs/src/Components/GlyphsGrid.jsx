import React, { useState } from "react";
import GlyphButton from "./GlyphButton";

// Now we will add an array which will hold five images.

const glyphMatrix = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];

const GlyphsGrid = () => {
  const [glyphs, setGlyphs] = useState(glyphMatrix);

  return (
    <div className="glyph-grid">
      {glyphs.map((value) => (
        <GlyphButton glyphValue={value} />
      ))}
    </div>
  );
};

export default GlyphsGrid;
