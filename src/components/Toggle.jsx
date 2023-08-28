import React, { useState } from 'react'
import Reddit from './Reddit';
import Joke from './Joke';

export default function Toggle() {
    const [redditVisible, setRedditVisible] = useState(false);
    const [jokeVisible, setJokeVisible] = useState(false);
  return (
    <div className='container'>

        <div className="toggles-container">
            <button className="button" onClick={() => setRedditVisible(prevRedditVisible => !redditVisible)}>Toggle Reddit</button>

            <button className="button" onClick={() => setJokeVisible(prevJokeVisible => !jokeVisible)}>Toggle Joke</button>
        </div>

        {redditVisible && <Reddit />}
        {jokeVisible && <Joke />}
    </div>
  )
}
