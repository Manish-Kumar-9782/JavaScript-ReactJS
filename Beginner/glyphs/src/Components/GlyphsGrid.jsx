import React, { useState } from "react";
import GlyphButton from "./GlyphButton";

// Now we will add an array which will hold five images.

/**
 * function getcolumn(arr, col){
    let myarr = []
    let i = 0;
    for(ar of arr){
        myarr[i++] = ar[col];
    }
    return myarr
}
 */

const glyphMatrix = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
];

function Matrix() {

  let Matrix = [];
  let temp = [];
  for (let i = 0; i < glyphMatrix.length; i++) {

    if ((i + 1) % 5 !== 0) {
      // i+1
      temp[((i + 1) % 5)] = glyphMatrix[i]; // this will add four items
    }
    else {
      temp[((i + 1) % 5)] = glyphMatrix[i]; // this will add fifth item in an array
      Matrix.push([...temp]); // pushing our temp array into Matrix.
      temp = [];
    }

  }
  console.log(Matrix)
}

Matrix();

glyphMatrix.map((_, index) => {
  if (Math.random() > 0.5) {
    glyphMatrix[index] = 0;
  }
  else {
    glyphMatrix[index] = null;
  }
})

console.log("initial matrix: ", glyphMatrix);

const GlyphsGrid = () => {
  const [glyphs, setGlyphs] = useState(glyphMatrix);

  return (
    <div className="glyph-grid">
      {glyphs.map((value, index) => (
        <GlyphButton id={index}
          glyphValue={value}
          glyphMatrix={glyphs}
          setGlyphMatrix={setGlyphs} />
      ))}
    </div>
  );
};

export default GlyphsGrid;
