import React, { useState } from 'react'
import burger from '../assets/burger.jpg'
import logo from '../assets/logo.svg'
import cartimg from '../assets/cart.jpg'
import CategoryLinks from './CategoryLinks'
import { useSelector } from 'react-redux'

function Nav() {
  const [toggle, setToggle] = useState(false)
  const [toggleCart, setToggleCart] = useState(false)
  const cart = useSelector((state) => state.shop.cart)
  console.log(cart)
  return (
    <div>
      <header className='bg-black2 flex justify-between items-center px-6 py-8'>
        <img onClick={(e) => setToggle(!toggle)} className='h-4 w-4' src={burger} alt='menu' />
        <img className='h-6' src={logo} alt='logo' />
        <img onClick={(e) => setToggleCart(!toggleCart)} className='h-5 w-5' src={cartimg} alt='cart' />
      </header>
      {toggle ? <nav className='absolute bg-white w-full px-6 pt-20 z-50'>
        <CategoryLinks />
      </nav> : null }
      {toggleCart ? 
        <div className='absolute bg-white py-8 px-7 w-5/6 left-1/2 transform -translate-x-1/2 mt-6 rounded-lg'>
          <div className='flex justify-between mb-8'>
            <h2 className='text-lg text-black2 font-bold tracking-[1.29px]'>cart ({cart.length})</h2>
            <p className='text-sbase text-bordergrey underline font-medium'>Remove all</p>
          </div>
          {cart.map((item) =>{
            return (
              <div className='flex gap-4 mb-6'>
                <div>
                  <img className='h-16 w-16 rounded-lg' src={item.img} alt={item.name} />
                </div>
                <div className='flex flex-col justify-center'>
                  <p className='text-sbase font-bold text-black2'>{item.name}</p>
                  <p className='text-sm font-bold text-bordergrey'>$ {item.price}</p>
                </div>
                <div></div>
              </div>
            )
          })}
          <div>
            <p>TOTAL</p>
            <p>$ </p>
          </div>
          <button>CHECKOUT</button>
        </div> : null}
    </div> 
  )
}

export default Nav
