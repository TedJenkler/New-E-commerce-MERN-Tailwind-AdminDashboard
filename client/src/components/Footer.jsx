import React, { useEffect } from 'react'
import logo from '../assets/logo.svg'
import facebook from '../assets/facebook.svg'
import twitter from '../assets/twitter.svg'
import instagram from '../assets/instagram.svg'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategory } from '../features/shopSlice'

function Footer() {
  const dispatch = useDispatch()
  const state = useSelector((state) => state.shop.category)
  console.log(state)

  useEffect(() => {
    dispatch(fetchCategory());
  },[])

  return (
    <footer className='pt-14 px-6 text-center pb-10 bg-black2 flex flex-col items-center'>
        <img className='mb-12' src={logo} alt='logo' />
        <ul className='text-white mb-12'>
            <li className='mb-4'>HOME</li>
            {state.map((category) => {
              return (
                <li className='mb-4'>{category.name.toUpperCase()}</li>
              )
            })}
        </ul>
        <p className='text-white opacity-50 mb-12'>Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we’re open 7 days a week.</p>
        <p className='text-white opacity-50 mb-12'>Copyright 2021. All Rights Reserved</p>
        <div className='flex gap-4'>
            <img src={facebook} alt='facebook' />
            <img src={twitter} alt='twitter' />
            <img src={instagram} alt='instagram' />
        </div>
    </footer>
  )
}

export default Footer
