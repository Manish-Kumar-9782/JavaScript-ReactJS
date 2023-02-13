import React from 'react'
import Matrix from './Matrix'

const SubmitGlyph = (props) => {

    const onClickHandler = () => {
        console.log("submit called.")
        // now on click we will make a new Matrix with updated glyphs matrix.
        let matrix = new Matrix(props.glyphs)

        // now first resize into 5x5
        matrix.resize(5, 5);
        // now get the reach row sum.
        console.log(matrix);

        // for rows
        for (let i = 0; i < matrix.rows; i++) {
            console.log("sum of row " + i, " --> ", matrix.sumOf(matrix.getRow(i)))
        }

        // for coluns
        for (let i = 0; i < matrix.cols; i++) {
            console.log("sum of cols " + i, " --> ", matrix.sumOf(matrix.getColumn(i)))
        }

    }

    return (
        <button type='button' onClick={onClickHandler}>
            Submit
        </button>
    )
}

export default SubmitGlyph
