import React from 'react'
import { NavLink } from 'react-router-dom'

function NavigationBar() {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/"  className={({isActive}) => (isActive ? "active" : 'none')}>Home</NavLink>
                </li>
                <li>
                    <NavLink to="/about" className={({isActive}) => (isActive ? "active" : 'none')}>About</NavLink>
                </li>
                <li>
                    <NavLink to="/contact" className={({isActive}) => (isActive ? "active" : 'none')}>Contact</NavLink>
                </li>
                <li>
                    <NavLink to="/blog" className={({isActive}) => (isActive ? "active" : 'none')}>Blog</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default NavigationBar