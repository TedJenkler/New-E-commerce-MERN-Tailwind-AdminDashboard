import React from 'react'
import listen from '../assets/listen.png'
import listenmd from '../assets/listenmd.png'

function Ad() {
  return (
    <div className='text-center'>
        <img className='mb-10 md:hidden md:absolute' src={listen} alt='listen' />
        <img className='hidden absolute mb-16 md:flex md:relative' src={listenmd} alt='listen' />
        <h3 className='text-28xl text-black2 font-bold text-center mb-8 tracking-[1px] md:text-40xl md:px-20 md:tracking-[1.43px] md:leading-[44px]'>BRINGING YOU THE <span className='text-28xl text-darkorange font-bold md:text-40xl'>BEST</span> AUDIO GEAR</h3>
        <p className='text-sbase text-bordergrey font-medium mb-32 md:px-20 md:mb-24'>Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.</p>
    </div>
  )
}

export default Ad
