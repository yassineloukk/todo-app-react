import React from 'react'
import {TransitionGroup} from 'react-transition-group';
import LoadingSpinner from './tsxFiles/LoadingSpinner';
import { CSSTransition } from 'react-transition-group';
import useFetch from '../hooks/useFetch';

export default function Reddit() {
    let url = 'https://www.reddit.com/r/aww.json';

    const { data: posts, isLoading, errorMessage } = useFetch(url);
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
                        {posts.data.children.map(post => (
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