import React, {Component, PropTypes} from 'react';
import Board from './Board';

class Game extends Component {
  constructor (props) {
    super (props);
    this.state = {
      peices: [
        '\u2656', '\u2658', '\u2657', '\u2655', '\u2654', '\u2657', '\u2658', '\u2656',
        '\u2659', '\u2659', '\u2659', '\u2659', '\u2659', '\u2659', '\u2659', '\u2659',
        '\u265c', '\u265e', '\u265d', '\u265b', '\u265a', '\u265d', '\u265e', '\u265c',
        '\u265f', '\u265f', '\u265f', '\u265f', '\u265f', '\u265f', '\u265f', '\u265f'
      ],
      kpos: [
        [0,0], [1,0], [2,0], [3,0], [4,0], [5,0], [6,0], [7,0],
        [0,1], [1,1], [2,1], [3,1], [4,1], [5,1], [6,1], [7,1],
        [0,7], [1,7], [2,7], [3,7], [4,7], [5,7], [6,7], [7,7],
        [0,6], [1,6], [2,6], [3,6], [4,6], [5,6], [6,6], [7,6],
      ],
      updatingPos: null
    };
  }

  updatePos = (newIndex) => {
    this.setState({updatingPos: newIndex});
  }

  onClickHandler = (x,y) => {
    var newPos = this.state.kpos;
    newPos[this.state.updatingPos] = [x,y];
    this.setState({kpos: newPos});
  }

  render = () => {
    return (
    <div>
      <Board onClickHandler={this.onClickHandler}
        peices={this.state.peices}
        updatePos={this.updatePos}
        kpos={this.state.kpos}/>
    </div>
    )
  }
}

export default Game;
