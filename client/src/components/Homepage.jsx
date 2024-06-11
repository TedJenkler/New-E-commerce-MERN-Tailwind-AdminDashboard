import React from 'react'
import CategoryLinks from './CategoryLinks'
import zx9 from '../assets/zx9.png'
import yx1 from '../assets/yx1.png'
import Ad from './Ad'
import { Link } from 'react-router-dom'

function Homepage() {
  return (
    <section>
      <div className='bg-black2 text-white bg-hero bg-center py-28 flex flex-col text-center items-center border-t border-bordergrey/25 mb-24'>
        <p className='text-sm text-bordergrey tracking-[10px] mb-4'>NEW PRODUCT</p>
        <h1 className='text-4xl tracking-[1.29px] font-bold mb-6'>XX99 Mark II HeadphoneS</h1>
        <p className='mx-6 text-bordergrey text-sbase font-medium mb-7'>Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.</p>
        <Link to="/product/xx99-mark-two-headphones" className='bg-darkorange text-sm font-bold px-8 py-4'>SEE PRODUCT</Link>
      </div>
      <div className='px-6'>
        <CategoryLinks />
      </div>
      <div className='mb-6 relative bg-darkorange bg-hero2 bg-no-repeat text-white mx-6 rounded-lg flex flex-col items-center text-center pb-14'>
        <img className='absolute top-12' src={zx9} alt='zx9'/>
        <h2 className='pt-72 text-4xl font-bold tracking-[1.29px] mb-6'>ZX9 SPEAKER</h2>
        <p className='text-sbase text-white opacity-75 font-medium mx-6 mb-6'>Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.</p>
        <Link to ="/product/zx9-speaker" className='bg-black2 px-8 py-4 text-sm font-bold tracking-[1px]'>SEE PRODUCT</Link>
      </div>
      <div className='bg-hero3 bg-right bg-no-repeat py-24 mx-6 rounded-lg mb-6 px-6'>
        <h2 className='text-28xl tracking-[2px] font-bold mb-8'>ZX7 SPEAKER</h2>
        <Link to ="/product/zx7-speaker" className='px-8 py-4 border border-black2 text-sm tracking-[1px] font-bold'>SEE PRODUCT</Link>
      </div>
      <div className='mx-6'>
        <img className='mb-6' src={yx1} alt='yx1' />
        <div className='py-10 px-6 bg-greywhite rounded-lg mb-32'>
            <h2 className='text-28xl font-bold tracking-[2px] mb-8'>YX1 EARPHONES</h2>
            <Link to="/product/yx1-earphones" className='px-8 py-4 border border-black2 text-sm tracking-[1px] font-bold'>SEE PRODUCT</Link>
        </div>
      </div>
      <div className='px-6'>
        <Ad />
      </div>
    </section>
  )
}

export default Homepage
