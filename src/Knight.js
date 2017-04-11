import React from 'react';
import './Chess.css';
import { ItemTypes } from './Constants';
import { DragSource } from 'react-dnd';

const knightSource = {
  beginDrag(props) {
    props.updatePos(props.peiceIndex);
    return {};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

const Knight = (props) => {
  const peice = props.peice;
  return props.connectDragSource(
    <div>
      <span className="peice">{peice}</span>
    </div>
  );
}

export default DragSource(ItemTypes.KNIGHT, knightSource, collect)(Knight);
