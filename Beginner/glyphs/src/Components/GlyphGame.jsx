import React, { useState } from 'react'
import GlyphButton from './GlyphButton';
import GlyphsGrid from './GlyphsGrid'
import SubmitGlyph from './SubmitGlyph';

const glyphMatrix = [
    0, null, 1, null, 4,
    null, 2, null, 1, null,
    null, null, 3, null, null,
    null, 4, null, 0, null,
    1, null, 4, null, 2,
];

/**
 * 1 n 2 n 5
 * n 3 n 2 n
 * n n 4 n n
 * n 5 n 1 n 
 * 2 n 5 n 3
 * 
 * 
 */

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
