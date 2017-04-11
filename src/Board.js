import React, { PropTypes } from 'react'
import Knight from './Knight';
import Square from './Square';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

var Board = (props) => {
  var locations = props.kpos.map((item) => {
    return JSON.stringify(item);
  });
  console.log(locations.includes(JSON.stringify([1,1])));
  var squares = [];
  for (let i=0; i<64; i++) {
    const x = i % 8;
    const y = Math.floor(i / 8);

    console.log(locations.includes(JSON.stringify([x,y])));
    console.log(typeof(props.peices[locations.indexOf(JSON.stringify([x,y]))]));
    const [knightX, knightY] = props.kpos;
    const index = locations.indexOf(JSON.stringify([x,y]));
    const piece = locations.includes(JSON.stringify([x,y])) ?
      <Knight peice={props.peices[index]} updatePos={props.updatePos} peiceIndex={index} /> :
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
