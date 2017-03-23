import React, { Component, PropTypes } from 'react';
import './App.css';
import {DragSource} from 'react-dnd';
import {ItemTypes} from './Constants';

/**
 * Implements the drag source contract.
 */
var cardSource = {
  beginDrag: function (props) {
    return {
      text: props.text
    };
  }
}

/**
 * Specifies the props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class Card extends Component {
  render() {
    var isDragging = this.props.isDragging;
    var connectDragSource = this.props.connectDragSource;
    var text = this.props.text;

    return connectDragSource(
      <div style={{ opacity: isDragging ? 0.5 : 1 }}>
        {text}
      </div>
    );
  }
}

Card.propTypes = {
  text: PropTypes.string.isRequired,
  // Injected by React DnD:
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired
}

export default DragSource(ItemTypes.CARD, cardSource, collect)(Card);
