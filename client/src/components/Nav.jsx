import React, { useState } from 'react';
import burger from '../assets/burger.jpg';
import logo from '../assets/logo.svg';
import cartimg from '../assets/cart.jpg';
import CategoryLinks from './CategoryLinks';
import { useDispatch, useSelector } from 'react-redux';
import { incrementItem, decrementItem, removeAll, toggleCart, toggleNav } from '../features/shopSlice';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Nav() {
  const cart = useSelector((state) => state.shop.cart);
  const category = useSelector((state) => state.shop.category);
  const cartToggle = useSelector((state) => state.shop.cartOpen);
  const navToggle = useSelector((state) => state.shop.navOpen);
  const dispatch = useDispatch();
  const path = useLocation()

  const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);

  // Function to determine base path based on environment
  const getBasePath = () => {
    return process.env.NODE_ENV === 'development' ? '../src' : "";
  };

  return (
    <div>
      <header className='bg-black1 flex min-h-[5.625rem] justify-between items-center px-6 py-8 md:px-10 xl:px-40'>
        <div className='flex md:gap-10 items-center'>
          <img onClick={() => path.pathname === "/checkout" ? null : dispatch(toggleNav({ toggle: true }))} className='h-4 w-4 xl:hidden xl:absolute' src={burger} alt='menu' />
          <img className='h-6 absolute left-1/2 transform -translate-x-1/2 md:left-0 md:relative md:transform-none' src={logo} alt='logo' />
        </div>
        <ul className='hidden absolute text-white xl:relative xl:flex xl:gap-9 text-sm font-bold tracking-[2px]'>
          <Link className='hover:text-darkorange' to="/">HOME</Link>
          {category ? category.map((item, index) => (
            <Link key={index} className='hover:text-darkorange' to={"/" + item.name}>{item.name.toUpperCase()}</Link>
          )) : null}
        </ul>
        <img onClick={() => path.pathname === "/checkout" ? null : dispatch(toggleCart({ toggle: true }))} className='h-5 w-5 z-50' src={cartimg} alt='cart' />
      </header>

      {navToggle ? (
        <nav className='absolute bg-white w-full px-6 max-h-[46.875rem] md:max-h-none pt-20 z-50 md:px-10'>
          <CategoryLinks />
        </nav>
      ) : null }

      {cartToggle ? (
        <div className='absolute z-50 bg-white py-8 px-7 w-[327px] left-1/2 transform -translate-x-1/2 mt-6 rounded-lg md:w-[49%] md:p-8 md:transform-none md:right-10 xl:w-[26%] xl:mt-8'>
          <div className='flex justify-between mb-8'>
            <h2 className='text-lg text-black2 font-bold tracking-[1.29px]'>CART ({cart.length})</h2>
            <p onClick={(e) => {dispatch(removeAll())}} className='text-sbase hover:text-darkorange text-bordergrey underline font-medium'>Remove all</p>
          </div>
          {cart.map((item, index) => (
            <div key={index} className='flex justify-between mb-6'>
              <div className='flex gap-4'>
                <div>
                  <img className='h-16 min-w-16 rounded-lg' src={`${getBasePath()}${item.img}`} alt={item.name} />
                </div>
                <div className='flex flex-col justify-center'>
                  <p className='text-sbase font-bold text-black2'>{item.name}</p>
                  <p className='text-sm font-bold text-bordergrey'>$ {item.price}</p>
                </div>
              </div>
              <div className='flex items-center'>
                <button onClick={(e) => dispatch(decrementItem({ id: item.id, quantity: item.quantity }))} className='w-6 h-8 hover:text-darkorange bg-greywhite'>-</button>
                <input className='w-6 h-8 bg-greywhite text-center' disabled={true} value={item.quantity}></input>
                <button onClick={(e) => dispatch(incrementItem({ id: item.id, quantity: item.quantity }))} className='w-6 h-8 hover:text-darkorange bg-greywhite'>+</button>
              </div>
            </div>
          ))}
          <div className='flex items-center justify-between mb-6'>
            <p className='text-sbase text-bordergrey font-medium'>TOTAL</p>
            <p className='text-lg text-black2 font-bold'>$ {totalPrice}</p>
          </div>
          <div className='flex justify-center'>
            <Link onClick={() => cart.length === 0 ? null : dispatch(toggleCart(false))} to={cart.length === 0 ? null : "/checkout"} className='text-lxs bg-darkorange font-bold tracking-[1px] hover:bg-lightorange text-white w-full py-[15px] text-center'>CHECKOUT</Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Nav;
