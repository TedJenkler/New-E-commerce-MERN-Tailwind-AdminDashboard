import React, { useState } from 'react'
import burger from '../assets/burger.jpg'
import logo from '../assets/logo.svg'
import cartimg from '../assets/cart.jpg'
import CategoryLinks from './CategoryLinks'
import { useDispatch, useSelector } from 'react-redux'
import { incrementItem } from '../features/shopSlice'
import { decrementItem } from '../features/shopSlice';
import { removeAll } from '../features/shopSlice'
import { Link } from 'react-router-dom'

function Nav() {
  const [toggle, setToggle] = useState(false)
  const [toggleCart, setToggleCart] = useState(false)
  const cart = useSelector((state) => state.shop.cart)
  const dispatch = useDispatch();

  const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);

  return (
    <div>
      <header className='bg-black2 flex justify-between items-center px-6 py-8 md:px-10'>
        <div className='flex md:gap-10 items-center'>
          <img onClick={(e) => setToggle(!toggle)} className='h-4 w-4' src={burger} alt='menu' />
          <img className='h-6 absolute left-1/2 transform -translate-x-1/2 md:left-0 md:relative md:transform-none' src={logo} alt='logo' />
        </div>
        <img onClick={(e) => setToggleCart(!toggleCart)} className='h-5 w-5' src={cartimg} alt='cart' />
      </header>
      {toggle ? <nav className='absolute bg-white w-full px-6 pt-20 z-50'>
        <CategoryLinks />
      </nav> : null }
      {toggleCart ? 
        <div className='absolute bg-white py-8 px-7 w-11/12 left-1/2 transform -translate-x-1/2 mt-6 rounded-lg'>
          <div className='flex justify-between mb-8'>
            <h2 className='text-lg text-black2 font-bold tracking-[1.29px]'>CART ({cart.length})</h2>
            <p onClick={(e) => {dispatch(removeAll())}} className='text-sbase text-bordergrey underline font-medium'>Remove all</p>
          </div>
          {cart.map((item) =>{
            return (
              <div className='flex justify-between mb-6'>
                <div className='flex gap-4'>
                  <div>
                    <img className='h-16 min-w-16 rounded-lg' src={item.img} alt={item.name} />
                  </div>
                  <div className='flex flex-col justify-center'>
                    <p className='text-sbase font-bold text-black2'>{item.name}</p>
                    <p className='text-sm font-bold text-bordergrey'>$ {item.price}</p>
                  </div>
                </div>
                <div className='flex items-center'>
                  <button onClick={(e) => dispatch(decrementItem({ id: item.id, quantity: item.quantity }))} className='w-6 h-8 bg-greywhite'>-</button>
                  <input className='w-6 h-8 bg-greywhite text-center' disabled={true} value={item.quantity}></input>
                  <button onClick={(e) => dispatch(incrementItem({ id: item.id, quantity: item.quantity }))} className='w-6 h-8 bg-greywhite'>+</button>
                </div>
              </div>
            )
          })}
          <div className='flex items-center justify-between mb-6'>
            <p className='text-sbase text-bordergrey font-medium'>TOTAL</p>
            <p className='text-lg text-black2 font-bold'>$ {totalPrice}</p>
          </div>
          <div className='flex justify-center'>
            <Link onClick={() => {setToggleCart(false)}} to="/checkout" className='text-sm bg-darkorange text-white w-full py-4 text-center'>CHECKOUT</Link>
          </div>
        </div> : null}
    </div> 
  )
}

export default Nav
