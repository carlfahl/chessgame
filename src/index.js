import React from 'react';
import ReactDOM from 'react-dom';
import Knight from './Knight';
import Square from './Square';
import './index.css';

ReactDOM.render(
  <div>
    <Square black>
      <Knight />
    </Square>
  </div>,
  document.getElementById('root')
);
