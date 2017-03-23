import React, { PropTypes } from 'react'

const Square = (props) => {
  var black = props.black? ' black': '';
  return (
    <div className={`Square${black}`}>
      {props.children}
    </div>
  )
}

Square.propTypes = {
  black: PropTypes.bool
}

export default Square;
