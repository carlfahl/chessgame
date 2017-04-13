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
      updatingPos: null,
      peiceTypes: [
        'rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook',
        'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn',
        'rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook',
        'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn',
      ],
      green: [
        false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false,
      ],
      ownership: [
        0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,
        1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,
      ],
      squares: [
        0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,
        null, null, null, null, null, null, null,  null,
        null, null, null, null, null, null, null,  null,
        null, null, null, null, null, null, null,  null,
        null, null, null, null, null, null, null,  null,
        1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,
      ],
      turn: 0
    };
  }

  peiceCanMove = (toX, toY) => {
    const locations = this.state.kpos.map((item) => {
      return JSON.stringify(item);
    });
    const [x, y] = this.state.kpos[this.state.updatingPos];
    const dx = Math.abs(toX - x);
    const dy = Math.abs(toY - y);
    switch (this.state.peiceTypes[this.state.updatingPos]) {
      case 'knight':
        return (
          (dx === 2 && dy === 1) || (dx === 1 && dy === 2)
        );
      case 'rook':
        return ( dx === 0 || dy === 0);
      case 'bishop':
        // find blocking pieces
        // for (let i=0; i<8; i++) {
          // for (let j in [-1,1]) {
            // for (let k in [-1,1]) {
              // if (locations.indexOf(JSON.stringify([x+i*j, y+i*k])) !== -1) {
                // console.log("Blocking peice at ", x+i*j, ', ', y+i*k);
              // }
            // }
          // }
        // }
        // if no blocking pieces
        return (dx === dy);
      case 'king':
        return ((dx === 1 && dy === 0) || (dy === 1 && dx === 0) || (dx === 1 && dy === 1));
      case 'queen':
        return (dx === dy || dx === 0 || dy === 0);
      case 'pawn':
        return (dy === 1 && dx === 0);
      default:
        return false;
    }
  }

  highlightBoard = () => {
    var tmp = this.state.green;
    for (let i=0; i<64; i++) {
      const x = i % 8;
      const y = Math.floor(i / 8);
      if (this.peiceCanMove(x,y) && this.state.squares[i] !== this.state.turn) {
        tmp[i] = true;
      }
    }
    this.setState({green: tmp});
  }

  clearHighLight = () => {
    let tmp = Array(64);
    tmp.fill(false);
    this.setState({green: tmp});
  }

  updatePos = (newIndex) => {
    console.log(newIndex);
    if (this.state.turn === this.state.ownership[newIndex]) {
      this.setState({updatingPos: newIndex});
      this.highlightBoard();
    }
  }

  onClickHandler = (toX,toY) => {
    const i = toY*8 + toX;
    if (this.peiceCanMove(toX,toY) && this.state.squares[i] !== this.state.turn) {
      const locations = this.state.kpos.map((item) => {
        return JSON.stringify(item);
      });
      const index = locations.indexOf(JSON.stringify([toX,toY]));
      let newPos = this.state.kpos;
      const [x,y] = newPos[this.state.updatingPos];
      console.log(newPos[this.state.updatingPos]);
      newPos[this.state.updatingPos] = [toX,toY];
      const prevI = y*8 + x;
      let newSquares = this.state.squares;
      newSquares[prevI] = null;
      newSquares[i] = this.state.turn;
      let newTurn = this.state.turn;
      newTurn = newTurn === 0? 1:0;
      let newOwn = this.state.ownership;
      let newPieces = this.state.peices;
      let newTypes = this.state.peiceTypes;
      if (index !== -1) {
        // taking opponents peice.
        console.log('Deleting opponents peice');
        newPos = newPos.slice(0,index).concat(newPos.slice(index+1));
        newOwn = newOwn.slice(0,index).concat(newOwn.slice(index+1));
        newPieces = newPieces.slice(0,index).concat(newPieces.slice(index+1));
        newTypes = newTypes.slice(0,index).concat(newTypes.slice(index+1));
      }
      this.setState({turn:newTurn, squares: newSquares, kpos:newPos, updatingPos: null,
      ownership: newOwn, peices:newPieces, peiceTypes: newTypes});
    }
    this.clearHighLight();
  }

  render = () => {
    return (
    <div>
      <Board onClickHandler={this.onClickHandler}
        peices={this.state.peices}
        updatePos={this.updatePos}
        kpos={this.state.kpos}
        green={this.state.green} />
    </div>
    )
  }
}

export default Game;
