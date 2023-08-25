import {useEffect, useMemo, useRef} from 'react';
import '../reset.css';
import '../App.css';
import NoTodos from './NoTodos';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import useLocalStorage from '../hooks/useLocalStorage';

function App() {
    const [todos, setTodos] = useLocalStorage("todos",[]);

    const [idForTodo, setIdForTodo] = useLocalStorage('idForTodo', 1);

    const nameInputEl = useRef(null);
    

    const [name, setName] = useLocalStorage('name', '');

    function addTodo(todo) {

        setTodos([...todos, {
            id: idForTodo,
            title: todo,
            isComplete: false,
            isEditing: false
            }
        ]);

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

    function remainingCalculation() {
        return todos.filter(todo => !todo.isComplete).length;
    }

    const remaining = useMemo(remainingCalculation, [todos]);

    function clearCompleted() {
        setTodos([...todos].filter(todo => !todo.isComplete));
    }

    function completeAllTodos() {
        const updatedTodos = todos.map(todo => {
            todo.isComplete = true;
            return todo;
        });

        setTodos(updatedTodos);    
    }

    function todosFiltered(filter) {
        if (filter === 'all') {
            return todos;
        } else if (filter === 'active') {
            return todos.filter(todo => !todo.isComplete);
        }  else if (filter === 'completed') {
            return todos.filter(todo => todo.isComplete);
        }  
    }

    useEffect(() => {
        nameInputEl.current.focus()
    }, []);

    function handleNameInput(event) {
        setName(event.target.value);
    }
    
    return (
        <div className="todo-app-container">
            <div className="todo-app">
                <div className="name-container">
                    <h2>What is your name?</h2>
                    <form action="#">
                        <input type="text" className='todo-input' placeholder='What is your name?' value={name} onChange={handleNameInput}  ref={nameInputEl}/>
                    </form>
                    {name &&
                        <p className="name-label">Hello, {name}</p>
                    }
                </div>

                <h2>Todo App</h2>
                <TodoForm  addTodo={addTodo}/>
                { todos.length > 0 ? <TodoList markAsEditing = {markAsEditing} completeTodo = {completeTodo} updateTodo = {updateTodo}  cancelEdit = {cancelEdit} deleteTodo = {deleteTodo} todos = {todos} remaining = {remaining} clearCompleted = {clearCompleted}  completeAllTodos = {completeAllTodos} todosFiltered = {todosFiltered}/> : <NoTodos />
                }
            </div>
        </div>
    );
}

export default App;