import React from 'react';
import CategoryLinks from './CategoryLinks';
import zx9 from '../assets/zx9.png';
import zx9xl from '../assets/zx9xl.png';
import yx1 from '../assets/yx1.png';
import yx1xl from '../assets/yx1xl.png';
import Ad from './Ad';
import { Link } from 'react-router-dom';

function Homepage() {
  return (
    <section>
      <div className='bg-black1 text-white min-h-[37.5rem] bg-hero bg-no-repeat bg-bottom py-28 flex flex-col text-center items-center border-t border-bordergrey/25 mb-24 md:px-48 md:pt-32 md:pb-40 md:bg-heromd md:mb-36 xl:flex-row xl:px-40 xl:bg-heroxl xl:bg-[right_4rem_bottom]'>
        <div className='xl:w-1/2 xl:flex xl:flex-col xl:items-start'>
          <p className='text-sm text-bordergrey tracking-[10px] mb-4 md:mb-6 xl:text-start'>NEW PRODUCT</p>
          <h1 className='xsm:mx-20 sm:mx-40 text-4xl md:mx-0 tracking-[1.29px] font-bold mb-6 leading-[40px] md:text-56xl md:tracking-[2px] md:leading-[58px] l:mx-32 xl:mx-0 xl:text-start'>XX99 Mark II Headphones</h1>
          <p className='mx-10 xsm:mx-24 sm:mx-40 md:mx-0 text-bordergrey text-sbase font-medium mb-8 leading-[20px] md:mb-10 lmd:mx-20 l:mx-40 xl:text-start xl:mx-0 xl:mr-40'>Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.</p>
          <Link to="/product/xx99-mark-two-headphones" className='btn-do'>SEE PRODUCT</Link>
        </div>
        <div className='xl:w-1/2'></div>
      </div>
      <div className='px-6 md:px-10 xl:px-40'>
        <CategoryLinks />
      </div>
      <div className='xsm:bg-hero2md min-h-[37.5rem] bg-cover mb-6 relative bg-darkorange bg-hero2 bg-no-repeat bg-center text-white mx-6 rounded-lg flex flex-col items-center text-center pb-14 md:mx-10 md:px-40 md:pb-16 md:bg-hero2md md:mb-8 xl:mx-40 xl:flex-row xl:p-0 xl:bg-hero2xl xl:mb-12 xl:pt-32 xl:items-start'>
        <div className='xl:w-1/2 flex justify-center xl:justify-end'>
          <img className='absolute top-12 xl:relative xl:hidden' src={zx9} alt='zx9'/>
          <img className='absolute hidden xl:relative xl:flex' src={zx9xl} alt='zx9'/>
        </div>
        <div className='xl:w-1/2 xl:flex xl:flex-col xl:justify-start'>
          <h2 className='pt-72 mx-10 text-4xl font-bold tracking-[1.29px] leading-[40px] mb-6 md:text-56xl md:tracking-[2px] md:leading-[58px] md:pt-80 xl:mx-40 xl:flex xl:flex-col xl:justify-start xl:text-start xl:pt-10'>ZX9 SPEAKER</h2>
          <p className='xsm:mx-20 sm:mx-36 md:mx-0 lmd:mx-20 text-sbase leading-[25px] text-white opacity-75 font-medium mx-6 mb-10 xl:mr-20 xl:ml-40 xl:text-start'>Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.</p>
          <Link to="/product/zx9-speaker" className='btn-b xl:max-w-[160px] xl:ml-40'>SEE PRODUCT</Link>
        </div>
      </div>
      <div className='base:bg-hero3md sm:bg-cover min-h-[20rem] bg-hero3 bg-right bg-no-repeat py-24 mx-6 rounded-lg mb-6 px-6 md:bg-hero3md md:mx-10 md:px-16 md:mb-8 xl:bg-hero3xl xl:mx-40 xl:min-h-[320px] xl:bg-cover xl:p-24 xl:mb-12'>
        <h2 className='text-28xl tracking-[2px] font-bold mb-10 '>ZX7 SPEAKER</h2>
        <Link to="/product/zx7-speaker" className='btn-t'>SEE PRODUCT</Link>
      </div>
      <div className='mx-6 md:flex md:mx-10 md:gap-3 md:mb-24 xl:mx-40 xl:gap-8 xl:mb-52'>
        <div className='xl:w-1/2'>
          <img className='mb-6 base:w-full md:mb-0 md:min-h-[178px] xl:hidden xl:absolute' src={yx1} alt='yx1' />
          <img className='hidden absolute contain md:mb-0 xl:flex xl:relative' src={yx1xl} alt='yx1' />
        </div>
        <div className='py-10 px-6 bg-greywhite min-h-[12.5rem] rounded-lg mb-32 md:w-full md:mb-0 md:min-h-full xl:w-full xl:p-24'>
          <h2 className='text-28xl font-bold tracking-[2px] mb-10'>YX1 EARPHONES</h2>
          <Link to="/product/yx1-earphones" className='btn-t'>SEE PRODUCT</Link>
        </div>
      </div>
      <div className='px-6 md:px-10 xl:px-40 xl:mb-52'>
        <Ad />
      </div>
    </section>
  );
}

export default Homepage;