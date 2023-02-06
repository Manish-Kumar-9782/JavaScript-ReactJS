import React from 'react'





const Block = (props) => {

    let blockStyles = {
        width: `${props.size}%`,
        height: `${props.blockStyles.height}px`,
        ...props.blockStyles
    }

    return (
        <div className={"block".concat(" ", props.Styles)}
            style={blockStyles}
        >
            {props.item}
        </div>
    )
}


const BlockStack = (props) => {

    /**
     * @props {
     *  
     *  row: number, number of row to display inside the blockStack.
     *  col: number, number of column to display inside the blockStack.
     *  style: object, an css style properties object for <BlockStack/> component.
     *  Styles: string,  css styles classes string for <Block/> Component.
     *  className: string,  css classes string for <BlockStack/> Component.
     *  blockColGap: number, number in pixels to generate the gap b/w the <Block/> Components.
     *  blockStyles: object, an object containing the css styles properties for <Block /> Component.
     * }
     *  
     *  
     */

    const size = Math.round(100 / props.col) + props.blockSizeOffset
    let items = null;
    if (props.col && props.row) {
        items = props.row * props.col
    }
    else {
        items = props.col;
    }
    const blocks = []

    console.log(props, blocks, items, size, props.blockSizeOffset)
    const Styles = props.Styles !== undefined ? props.Styles : null;

    if (props.children) {
        for (let i = 0; i < items; i++) {
            blocks.push(<Block size={size}
                Styles={Styles !== null ? Styles[i] : ""}
                item={props.children[i]}
                blockStyles={props.blockStyles}
            />)
        }
    }

    return (
        <div className={'block-stack container d-flex jc-between'.concat(" ", props.classNames)}
            style={{
                ...props.style,
                columnGap: `${props.blockColGap}px`,
                rowGap: `${props.blockRowGap}px`,
            }}>
            {blocks}
        </div>
    )
}


BlockStack.defaultProps = {
    col: 0,
    row: 0,
    blockSizeOffset: 0,
    children: [],
    classNames: "",
    blockColGap: 0,
    blockRowGap: 0,
    blockStyles: { height: 300 },
}

Block.defaultProps = {
    height: 300,
    minHeight: 300,
    maxHeight: 300,
}



export default BlockStack
