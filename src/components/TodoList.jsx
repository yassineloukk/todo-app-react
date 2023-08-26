import React, { useContext } from 'react';
import TodoItemsRemaining from './TodoItemsRemaining';
import TodoClearCompleted from './TodoClearCompleted';
import TodoCompleteAll from './TodoCompleteAll';
import TodoFilters from './TodoFilters';
import useToggle from '../hooks/useToggle';
import { TodosContext } from '../context/TodosContext';
import { FilterContext } from '../context/FilterContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';


function TodoList(props) {
    const [isFeaturesOneVisible, setFeaturesOneVisible] = useToggle();
    const [isFeaturesTwoVisible, setFeaturesTwoVisible] = useToggle();
    const { todos, setTodos } = useContext(TodosContext);
    const { todosFiltered } = useContext(FilterContext);

    function deleteTodo(todoId) {
        setTodos([...todos.filter(todo => todo.id !== todoId)])
    }

    function completeTodo(todoId) {
        const updatedTodos = todos.map(todo => {
        if (todo.id === todoId) {
            todo.isComplete = !todo.isComplete
        }
                return todo;
        });

        setTodos(updatedTodos);
    }

    function markAsEditing(todoId) {
        const updatedTodos = todos.map(todo => {
            if (todo.id === todoId) {
                todo.isEditing = true
            }
                return todo;
        });

        setTodos(updatedTodos);
    }

    function updateTodo(event, todoId) {
        const updatedTodos = todos.map(todo => {
            if (todo.id === todoId) {
                if (event.target.value.trim().length === 0) {
                todo.isEditing = false;
                return todo;
            }
                todo.title = event.target.value;
                todo.isEditing = false;
            }
            return todo;
        });

        setTodos(updatedTodos);
    }

    function cancelEdit(event, todoId) {
        const updatedTodos = todos.map(todo => {
            if (todo.id === todoId) {
                todo.isEditing = false
            }
            return todo;
        });

        setTodos(updatedTodos);
    }

    return (
        <>
            <TransitionGroup 
                component='ul'
                className="todo-list"
            >
                {todosFiltered().map((todo, index) => (
                    <CSSTransition 
                        key={todo.id}
                        timeout={300}
                        classNames="slide-horizontal"
                    >
                        <li className="todo-item-container">
                            <div className="todo-item">
                                <input type="checkbox" onChange={()=> completeTodo(todo.id)} checked={todo.isComplete ? true : false}/>
                                {!todo.isEditing ? (
                                    <span onDoubleClick={()=> markAsEditing(todo.id)}
                                        className={`todo-item-label ${todo.isComplete
                                        ? 'line-through'
                                        : ''}`}>{todo.title}
                                    </span>
                                )
                                : (
                                    <input type="text" className="todo-item-input" defaultValue={todo.title} 
                                    onBlur={(event)=>
                                    updateTodo(event, todo.id)}
                                    onKeyDown={event => {
                                        if (event.key === "Enter") {
                                            updateTodo(event, todo.id)
                                        } else if (event.key === 'Escape') {
                                            cancelEdit(event, todo.id)
                                        }
                                    }} autoFocus/>
                                )}
                            </div>
                            <button className="x-button" onClick={()=> deleteTodo(todo.id)}>
                                <svg className="x-button-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </li>
                    </CSSTransition>
                ))}
            </TransitionGroup>

            <div className="toggles-container">
                <button className="button" onClick={setFeaturesOneVisible}>Features one toggle</button>
                <button className="button" onClick={setFeaturesTwoVisible}>Features two toggle</button>
            </div>

            <CSSTransition 
                in = {isFeaturesOneVisible}
                timeout = {300}
                classNames = "slide-vertical"
                unmountOnExit
            >
                <div className="check-all-container">
                    <TodoCompleteAll />
                    
                    <TodoItemsRemaining />
                </div>
            </CSSTransition>
            

            <CSSTransition 
                in = {isFeaturesTwoVisible}
                timeout = {300}
                classNames = "slide-vertical"
                unmountOnExit
            >
                <div className="other-buttons-container">
                <TodoFilters />
                    <div>
                        <TodoClearCompleted />
                    </div>
                </div>
            </CSSTransition>
        </>
    )
}

export default TodoList