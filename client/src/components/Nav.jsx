import React from 'react'
import burger from '../assets/burger.jpg'
import logo from '../assets/logo.svg'
import cart from '../assets/cart.jpg'

function Nav() {
  return (
    <nav className='bg-black2 flex justify-between items-center px-6 py-8'>
        <img className='h-4 w-4' src={burger} alt='menu' />
        <img className='h-6' src={logo} alt='logo' />
        <img className='h-5 w-5' src={cart} alt='cart' />
    </nav>
  )
}

export default Nav
