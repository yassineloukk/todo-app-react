import {useState} from 'react';
import '../reset.css';
import '../App.css';

function App() {
    const [todos,
        setTodos] = useState([
        {
            id: 1,
            title: 'Finish React Series',
            isComplete: false,
            isEditing: false
        }, {
            id: 2,
            title: 'Go Grocery',
            isComplete: true,
            isEditing: false
        }, {
            id: 3,
            title: 'Take over world',
            isComplete: false,
            isEditing: false
        }
    ]);

    const [todoInput,
        setTodoInput] = useState('');

    const [idForTodo,
        setIdForTodo] = useState(4);

    function handleInput(event) {
        setTodoInput(event.target.value);
    }

    function addTodo(event) {
        event.preventDefault();
        if (todoInput.trim().length === 0) {
            return;
        }
        setTodos([
            ...todos, {
                id: idForTodo,
                title: todoInput,
                isComplete: false,
                isEditing: false
            }
        ]);
        setTodoInput('');
        setIdForTodo(previdForTodo => previdForTodo + 1);
    }

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
        <div className="todo-app-container">
            <div className="todo-app">
                <h2>Todo App</h2>
                <form action="#" onSubmit={addTodo}>
                    <input
                        type="text"
                        className="todo-input"
                        value={todoInput}
                        onChange={handleInput}
                        placeholder="What do you need to do?"/>
                </form>

                <ul className="todo-list">
                    {todos.map((todo, index) => (
                        <li className="todo-item-container" key={todo.id}>
                            <div className="todo-item">
                                <input
                                    type="checkbox"
                                    onChange={() => completeTodo(todo.id)}
                                    checked={todo.isComplete
                                    ? true
                                    : false}/> 
                                    {!todo.isEditing ? (
                                        <span
                                            onDoubleClick={() => markAsEditing(todo.id)}
                                            className={`todo-item-label ${todo.isComplete
                                            ? 'line-through'
                                            : ''}`}>{todo.title}
                                        </span>

                                    )
                                    : (
                                        <input type="text" className="todo-item-input" defaultValue={todo.title} onBlur={(event) => updateTodo(event, todo.id)} 
                                        onKeyDown={event => {
                                            if (event.key === "Enter") {
                                                updateTodo(event, todo.id)
                                            } else if (event.key === 'Escape') {
                                                cancelEdit(event, todo.id)
                                            }
                                        }} autoFocus/>
                                    )}
                            </div>
                            <button className="x-button" onClick={() => deleteTodo(todo.id)}>
                                <svg
                                    className="x-button-icon"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="check-all-container">
                    <div>
                        <div className="button">Check All</div>
                    </div>

                    <span>3 items remaining</span>
                </div>

                <div className="other-buttons-container">
                    <div>
                        <button className="button filter-button filter-button-active">
                            All
                        </button>
                        <button className="button filter-button">Active</button>
                        <button className="button filter-button">Completed</button>
                    </div>
                    <div>
                        <button className="button">Clear completed</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;