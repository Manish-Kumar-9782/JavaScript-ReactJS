import React, { useState } from "react";
import GlyphButton from "./GlyphButton";
import Matrix from "./Matrix";



// creating a new Matrix object.


// console.log("initial matrix: ", glyphMatrix);

const GlyphsGrid = (props) => {

  return (
    <div className="glyph-grid">
      {props.glyphs.map((value, index) => (
        <GlyphButton id={index}
          glyphValue={value}
          glyphMatrix={props.glyphs}
          setGlyphMatrix={props.setGlyphs} />
      ))}
    </div>
  );
};

export default GlyphsGrid;
