import React from 'react'
import listen from '../assets/listen.png'

function Ad() {
  return (
    <div className='text-center'>
        <img className='mb-10' src={listen} alt='listen' />
        <h3 className='text-28xl text-black2 font-bold text-center mb-8 tracking-[1px]'>BRINGING YOU THE <span className='text-28xl text-darkorange font-bold'>BEST</span> AUDIO GEAR</h3>
        <p className='text-sbase text-bordergrey font-medium mb-32'>Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.</p>
    </div>
  )
}

export default Ad
