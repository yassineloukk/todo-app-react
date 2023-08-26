import React, { useContext, useState } from 'react';
import { TodosContext } from '../context/TodosContext';


function TodoForm() {
    const [todoInput, setTodoInput] = useState('');
    const { todos, setTodos, idForTodo, setIdForTodo } = useContext(TodosContext);

    function handleInput(event) {
        setTodoInput(event.target.value);
    }

    function addTodo(event) {
        event.preventDefault();

        if (todoInput.trim().length === 0) {
            return;
        }

        
        setTodos([...todos, {
            id: idForTodo,
            title: todoInput,
            isComplete: false,
            isEditing: false
            }
        ]);

        setIdForTodo(previdForTodo => previdForTodo + 1);

        setTodoInput('');
    }
    
    return (
        <form action="#" onSubmit={addTodo}>
            <input type="text" className="todo-input" value={todoInput} onChange={handleInput}
                placeholder="What do you need to do?" />
        </form>
    )
}


export default TodoForm