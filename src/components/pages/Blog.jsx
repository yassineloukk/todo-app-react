import React from 'react'
import { Link } from 'react-router-dom'

export default function Blog() {
  return (
    <div className="container">
        <ul>
            <li>
                <Link to="/post/1">
                    Post One
                </Link>
            </li>
            <li>
                <Link to="/post/2">
                    Post Two
                </Link>
            </li>
      </ul>
    </div>
  )
}
