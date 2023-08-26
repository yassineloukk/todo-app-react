import React, { useContext } from 'react';
import { FilterContext } from '../context/FilterContext';


function TodoFilters() {
    const { filter, setFilter, todosFiltered } = useContext(FilterContext);

  return (
    <div>
        <button className={`button filter-button ${filter === 'all' ? 'filter-button-active': ''}`} onClick={ () => {
            setFilter("all");
            todosFiltered("all");
        }}>
            All
        </button>
        <button className={`button filter-button ${filter === 'active' ? 'filter-button-active': ''}`} onClick={ () => {
            setFilter("active");
            todosFiltered("active");
        }}> Active</button>
        <button className={`button filter-button ${filter === 'completed' ? 'filter-button-active': ''}`} onClick={ () => {
            setFilter("completed");
            todosFiltered("completed");
        }}>Completed</button>
    </div>
  )
}

export default TodoFilters