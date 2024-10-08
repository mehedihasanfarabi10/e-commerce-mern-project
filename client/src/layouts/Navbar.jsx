
import React from 'react'
import {NavLink} from 'react-router-dom'
const Navbar = () => {
  return (
    <nav className='flex-center'>
    <NavLink to="/" className="nav-link">
      Home</NavLink>
    <NavLink to="/register" className="nav-link">
      Register</NavLink>
    <NavLink to="/login" className="nav-link">
      LogIn</NavLink>
    <NavLink to="/logout" className="nav-link">
      LogOut</NavLink>
    <NavLink to="/cart" className="nav-link">
      Cart</NavLink>
    <NavLink to="/*" className="nav-link">
      Error</NavLink>
    </nav>
  )
}

export default Navbar