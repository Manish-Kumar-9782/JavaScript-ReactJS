import React, { useEffect, useRef, useState } from "react";

const images = process.env.PUBLIC_URL + "/Images/Remnant Glyphs";
const imagesArray = [
  "/glyphs 1.png",
  "/glyphs 2.png",
  "/glyphs 3.png",
  "/glyphs 4.png",
  "/glyphs 5.png",
];

const GlyphButton = (props) => {
  const [imgIndex, setImg] = useState(props.glyphValue);
  const ref_state = useRef();
  const btn_ref = useRef();
  console.log(`rendering : `, props.id);
  function onClickHandler() {
    console.log("selected image: " + imgIndex);

    if (ref_state !== null) {
      ref_state.current.style.filter = "hue-rotate(200deg)";
    }

    // testing for ending position for imagesArray.
    if ((imgIndex + 1) % imagesArray.length === 0) {
      // this condition is true it means we have reached the end of the imagesArray.
      setImg(0);
    } else {
      setImg(imgIndex + 1);
    }
  }

  // Now we will update our glyph matrix in which we have all glyphs record.
  useEffect(() => {
    let newMatrix = new Array(...props.glyphMatrix);
    newMatrix[props.id] = imgIndex;
    props.setGlyphMatrix(newMatrix);
  }, [imgIndex]);

  return (
    <button ref={btn_ref} type="button" onClick={onClickHandler}>
      {imgIndex != null ? (
        <img
          ref={ref_state}
          className="glyph-button"
          src={images + imagesArray[imgIndex]}
          alt=""
          // here src image will be set by using the 'images' value which string and
          // we will pass the index number to the 'imagesArray' to get the current image
          // for this button, imagesArray[imgIndex] will give us th image name which is added
          // to the images variable to get the final src value.
        />
      ) : (
        <img
          ref={ref_state}
          className="glyph-button"
          src={images + "/white.png"}
          alt=""
        />
      )}
    </button>
  );
};

export default GlyphButton;
