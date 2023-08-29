import React, {useEffect, useState} from 'react'
import { ClipLoader } from 'react-spinners';
import {TransitionGroup} from 'react-transition-group';
import LoadingSpinner from './tsxFiles/LoadingSpinner';
import { CSSTransition } from 'react-transition-group';
import useFetch from '../hooks/useFetch';
import { useQuery } from 'react-query';

export default function Joke() {
  let url = 'https://official-joke-api.appspot.com/jokes/random';

  const { data: joke, isLoading, isError, error, isSuccess } = useQuery('joke', fetchPosts, {
    staleTime: 6000,
    refetchOnWindowFocus:false
  });

  function fetchPosts() {
      return fetch(url).then(response => response.json());
  }
  return ( 
      <div className="todo-app">
          <div className="content">
            <h2>Joke Api </h2>
              {isLoading && (
                  <LoadingSpinner isLoading = {isLoading}/>
              )}
              {isSuccess && (
                  <TransitionGroup 
                      component='ul' 
                      className="todo-list"
                  >
                        <CSSTransition
                          key={joke.id}
                          timeout={300}
                          in={joke.length > 0}
                          classNames="slide-horizontal"
                        >
                            <li key={joke.id} className="todo-item-container" >
                                <div className="todo-item">
                                    <span className='todo-item-label-reddit'>{joke.setup} {joke.punchline}</span>
                                </div>
                            </li>
                        </CSSTransition>
                  </TransitionGroup>
              )}
              {isError && (
                 <div>{error.message}</div>
              )}
          </div>
      </div>
  )
}
