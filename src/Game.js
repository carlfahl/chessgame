import React, {Component, PropTypes} from 'react';
import Board from './Board';

class Game extends Component {
  constructor (props) {
    super (props);
    this.state = {kpos: [0,0]};
  }

  onClickHandler = (x,y) => {
    this.setState({kpos: [x,y]});
  }

  render = () => {
    return (
    <div>
      <Board onClickHandler={this.onClickHandler} kpos={this.state.kpos}/>
    </div>
    )
  }
}

export default Game;
