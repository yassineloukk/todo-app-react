import React from 'react'
import App from './App'
import NavigationBar from './NavigationBar'
import About from './pages/About'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NoMatch from './pages/NoMatch'

export default function Root() {
  const routes = [
    { path: '/', name:'Home', Component: App, exact:true },
    { path: '/about', name:'About', Component: About, exact:true },
    { path: '/contact', name:'Contact', Component: Contact, exact:true },
    { path: '/blog', name:'Blog', Component: Blog, exact:true },
    { path: '/post/:id', name:'Post', Component: BlogPost, exact:true },
    { path: '*', name:'No Match', Component: NoMatch, exact:true },
  ];
  return (
    <Router>
      <div className="todo-app-container">
        <NavigationBar />
        <div className="content">
          <Routes>
           
            {routes.map(({path, Component, exact,name}) => (
              <Route key={path} path={path} Component={Component} exact={exact} />
            ))}
          </Routes>
        </div>
      </div>
    </Router>
  )
}
