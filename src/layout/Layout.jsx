import React from 'react'
import logo from '../assets/logo.png'
import { Link, Outlet } from 'react-router-dom'
import './index.css'

export const Layout = () => {
  return (
    <>
      <div id="layout-title">
        <Link to='/'><h1>HRnet</h1></Link>
        <img id='layout-logo'  src={logo} alt='Wealth Health' />
      </div>
      <nav id='layout-nav'>
        <Link to='/'>Create Employee</Link>
        <Link to='/employees'>Employees</Link>
      </nav>
      <Outlet />
    </>
  )
}
