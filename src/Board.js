import React, { PropTypes } from 'react'
import Knight from './Knight';
import Square from './Square';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

var Board = (props) => {
  var squares = [];
  for (let i=0; i<64; i++) {
    const x = i % 8;
    const y = Math.floor(i / 8);

    const [knightX, knightY] = props.kpos;
    const piece = (x === knightX && y === knightY) ?
      <Knight /> :
        null;
    squares.push(
      <Square key={i} onClickHandler={props.onClickHandler} x={x} y={y} >
        {piece}
      </Square>
    )
  }
  return (
    <div className="Board">
      {squares}
    </div>
  );
}

export default DragDropContext(HTML5Backend)(Board);
