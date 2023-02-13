import React, { useState } from 'react'
import GlyphButton from './GlyphButton';
import GlyphsGrid from './GlyphsGrid'
import SubmitGlyph from './SubmitGlyph';

const glyphMatrix = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
];


const GlyphGame = () => {
    const [glyphs, setGlyphs] = useState(glyphMatrix);
    return (
        <div className='gameBox'>
            <GlyphsGrid glyphs={glyphs} setGlyphs={setGlyphs} />
            <SubmitGlyph glyphs={glyphs} />
        </div>
    )
}

export default GlyphGame
