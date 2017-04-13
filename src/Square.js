import React, { PropTypes } from 'react'
import { ItemTypes } from './Constants';
import { DropTarget } from 'react-dnd';

const squareTarget = {
  drop(props, monitor) {
    props.onClickHandler(props.x, props.y);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

const Square = (props) => {
  const black = ((props.x + props.y) % 2 === 1)? ' black' : '';
  const hover = props.isOver? ' hover' : '';
  const green = props.green? ' green': '';
  return props.connectDropTarget(
    <div onClick={() => props.onClickHandler(props.x,props.y)} className={`Square${black}${hover}${green}`}>
      {props.children}
    </div>
  )
}

Square.propTypes = {
  black: PropTypes.bool
}

export default DropTarget(ItemTypes.KNIGHT, squareTarget, collect)(Square);
