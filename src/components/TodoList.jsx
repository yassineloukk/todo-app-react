import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TodoItemsRemaining from './TodoItemsRemaining';
import TodoClearCompleted from './TodoClearCompleted';
import TodoCompleteAll from './TodoCompleteAll';
import TodoFilters from './TodoFilters';
import useToggle from '../hooks/useToggle';


TodoList.propTypes = {
    todos: PropTypes.array.isRequired,
    completeTodo: PropTypes.func.isRequired,
    markAsEditing: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired,
    cancelEdit: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    remaining: PropTypes.number.isRequired,
    clearCompleted: PropTypes.func.isRequired,
    completeAllTodos: PropTypes.func.isRequired,
    todosFiltered: PropTypes.func.isRequired,
}

function TodoList(props) {
    const [isFeaturesOneVisible, setFeaturesOneVisible] = useToggle();
    const [isFeaturesTwoVisible, setFeaturesTwoVisible] = useToggle(false);
    const [filter, setFilter] = useState('all');

    return (
        <>
            <ul className="todo-list">
                {props.todosFiltered(filter).map((todo, index) => (
                    <li className="todo-item-container" key={todo.id}>
                        <div className="todo-item">
                            <input type="checkbox" onChange={()=> props.completeTodo(todo.id)} checked={todo.isComplete ? true : false}/>
                            {!todo.isEditing ? (
                                <span onDoubleClick={()=> props.markAsEditing(todo.id)}
                                    className={`todo-item-label ${todo.isComplete
                                    ? 'line-through'
                                    : ''}`}>{todo.title}
                                </span>
                            )
                            : (
                                <input type="text" className="todo-item-input" defaultValue={todo.title} 
                                onBlur={(event)=>
                                props.updateTodo(event, todo.id)}
                                onKeyDown={event => {
                                    if (event.key === "Enter") {
                                        props.updateTodo(event, todo.id)
                                    } else if (event.key === 'Escape') {
                                        props.cancelEdit(event, todo.id)
                                    }
                                }} autoFocus/>
                            )}
                        </div>
                        <button className="x-button" onClick={()=> props.deleteTodo(todo.id)}>
                            <svg className="x-button-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </li>
                ))}
            </ul>

            <div className="toggles-container">
                <button className="button" onClick={setFeaturesOneVisible}>Features one toggle</button>
                <button className="button" onClick={setFeaturesTwoVisible}>Features two toggle</button>
            </div>

            {isFeaturesOneVisible && (
                <div className="check-all-container">
                    <TodoCompleteAll completeAllTodos = {props.completeAllTodos} />
                    
                    <TodoItemsRemaining remaining={props.remaining} />
                </div>
            )}

            {isFeaturesTwoVisible && (
                <div className="other-buttons-container">
                <TodoFilters todosFiltered = {props.todosFiltered} 
                    filter = {filter}
                    setFilter = {setFilter}
                />
                    <div>
                        <TodoClearCompleted clearCompleted = {props.clearCompleted} />
                    </div>
                </div>
            )}
        </>
    )
}

export default TodoList