import React, {useEffect, useState} from 'react'
import { ClipLoader } from 'react-spinners';
import {TransitionGroup} from 'react-transition-group';
import LoadingSpinner from './tsxFiles/LoadingSpinner';
import { CSSTransition } from 'react-transition-group';

export default function Joke() {
  const [joke,setJoke] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  let [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
      fetch('https://official-joke-api.appspot.com/jokes/random')
          .then(response => response.json())
          .then(result => {
              setIsLoading(false);
              setJoke(result);
          })
          .catch(error => {
              setIsLoading(false);
              setErrorMessage("There was an error.");
          })
  }, []);

  return ( 
      <div className="todo-app">
          <div className="content">
            <h2>Joke Api </h2>
              {isLoading && (
                  <LoadingSpinner isLoading = {isLoading}/>
              )}
              {joke && (
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
              {errorMessage && (
                 <div>{errorMessage}</div>
              )}
          </div>
      </div>
  )
}
