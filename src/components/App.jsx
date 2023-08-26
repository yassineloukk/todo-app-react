import {useEffect, useMemo, useRef, useState} from 'react';
import '../reset.css';
import '../App.css';
import NoTodos from './NoTodos';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import useLocalStorage from '../hooks/useLocalStorage';
import { TodosContext } from '../context/TodosContext';
import { FilterContext } from '../context/FilterContext';

function App() {
    const [todos, setTodos] = useLocalStorage("todos",[]);

    const [idForTodo, setIdForTodo] = useLocalStorage('idForTodo', 1);

    const nameInputEl = useRef(null);
    
    const [filter, setFilter] = useState('all');

    const [name, setName] = useLocalStorage('name', '');



    function todosFiltered() {
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
        <TodosContext.Provider value = {{ todos, setTodos, idForTodo, setIdForTodo }}>
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
                    <TodoForm />
                    <FilterContext.Provider value = {{  filter, setFilter, todosFiltered }}>
                        { todos.length > 0 ? <TodoList /> : <NoTodos /> }
                    </FilterContext.Provider>
                </div>
            </div>
        </TodosContext.Provider>
    );
}

export default App;