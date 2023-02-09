import React, { useState } from 'react'

const images = process.env.PUBLIC_URL + "/Images/Remnant Glyphs";
const imagesArray = [
    "/glyphs 1.png",
    "/glyphs 2.png",
    "/glyphs 3.png",
    "/glyphs 4.png",
    "/glyphs 5.png",
];

const GlyphButton = (props) => {

    const [imgIndex, setImg] = useState(props.glyphValue)

    function onClickHandler() {

        console.log("selected image: " + imgIndex);
        // testing for ending position for imagesArray.
        if ((imgIndex + 1) % (imagesArray.length) === 0) {
            // this condition is true it means we have reached the end of the imagesArray.
            setImg(0);
        }
        else {
            setImg(imgIndex + 1);
        }
    }

    return (
        <button type='button'>
            <img className='glyph-button' src={images + imagesArray[imgIndex]} alt=""
                // here src image will be set by using the 'images' value which string and 
                // we will pass the index number to the 'imagesArray' to get the current image 
                // for this button, imagesArray[imgIndex] will give us th image name which is added
                // to the images variable to get the final src value.
                onClick={onClickHandler}
            />
        </button>
    )
}

export default GlyphButton
