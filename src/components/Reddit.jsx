import React, {useEffect, useState} from 'react'
import { ClipLoader } from 'react-spinners';
import {TransitionGroup} from 'react-transition-group';
import LoadingSpinner from './tsxFiles/LoadingSpinner';
import { CSSTransition } from 'react-transition-group';

export default function Reddit() {
    const [posts,setPosts] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    let [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        fetch('https://www.reddit.com/r/aww.json')
            .then(response => response.json())
            .then(results => {
                setIsLoading(false);
                setPosts(results.data.children);
            })
            .catch(error => {
                setIsLoading(false);
                setErrorMessage("There was an error.");
            })
    }, []);

    return ( 
        <div className="todo-app">
            <div className="content">
                <h2>Reddit Api </h2>
                {isLoading && (
                    <LoadingSpinner isLoading = {isLoading}/>
                )}
                {posts && (
                    <TransitionGroup 
                        component='ul' 
                        className="todo-list"
                    >
                        {posts.map(post => (
                            <CSSTransition
                            key={post.data.id}
                            timeout={300}
                            in={posts.length > 0}
                            classNames="slide-horizontal"
                            >
                                <li key={post.data.id} className="todo-item-container" >
                                    <div className="todo-item">
                                        <a href={`https://www.reddit.com${post.data.permalink}`} className='todo-item-label-reddit'>{post.data.title}</a>
                                    </div>
                                </li>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                )}
                {errorMessage && (
                   <div>{errorMessage}</div>
                )}
            </div>
        </div>
    )
}