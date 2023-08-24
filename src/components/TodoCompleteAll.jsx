import React from 'react'
import PropTypes from 'prop-types';

TodoCompleteAll.propTypes = {
    completeAllTodos: PropTypes.func.isRequired,
}

function TodoCompleteAll(props) {
  return (
    <div>
        <div className="button" onClick={props.completeAllTodos}>Check All</div>
    </div>
  )
}

export default TodoCompleteAll