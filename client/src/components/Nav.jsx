import React, { useState } from 'react'
import burger from '../assets/burger.jpg'
import logo from '../assets/logo.svg'
import cart from '../assets/cart.jpg'
import CategoryLinks from './CategoryLinks'

function Nav() {
  const [toggle, setToggle] = useState(false)
  return (
    <div>
      <header className='bg-black2 flex justify-between items-center px-6 py-8'>
        <img onClick={(e) => setToggle(!toggle)} className='h-4 w-4' src={burger} alt='menu' />
        <img className='h-6' src={logo} alt='logo' />
        <img className='h-5 w-5' src={cart} alt='cart' />
      </header>
      {toggle ? <nav className='absolute bg-white w-full px-6 pt-20 z-50'>
        <CategoryLinks />
      </nav> : null }
    </div> 
  )
}

export default Nav
