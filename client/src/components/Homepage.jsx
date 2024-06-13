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
      <div className='bg-black2 text-white bg-hero bg-no-repeat bg-center py-28 flex flex-col text-center items-center border-t border-bordergrey/25 mb-24 md:px-48 md:pt-32 md:pb-40 md:bg-heromd md:mb-36 xl:flex-row xl:px-40 xl:bg-heroxl xl:bg-[right_4rem_bottom]'>
        <div className='xl:w-1/2 xl:flex xl:flex-col xl:items-start'>
          <p className='text-sm text-bordergrey tracking-[10px] mb-4 md:mb-6 xl:text-start'>NEW PRODUCT</p>
          <h1 className='text-4xl tracking-[1.29px] font-bold mb-6 md:text-56xl md:tracking-[2px] md:leading-[58px] xl:text-start'>XX99 Mark II HeadphoneS</h1>
          <p className='mx-6 text-bordergrey text-sbase font-medium mb-7 md:mb-10 xl:text-start xl:mx-0 xl:mr-40'>Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.</p>
          <Link to="/product/xx99-mark-two-headphones" className='bg-darkorange text-sm font-bold px-8 py-4'>SEE PRODUCT</Link>
        </div>
        <div className='xl:w-1/2'></div>
      </div>
      <div className='px-6 md:px-10 xl:px-40'>
        <CategoryLinks />
      </div>
      <div className='mb-6 relative bg-darkorange bg-hero2 bg-no-repeat text-white mx-6 rounded-lg flex flex-col items-center text-center pb-14 md:mx-10 md:px-40 md:pb-16 md:bg-hero2md md:mb-8 xl:mx-40 xl:flex-row xl:p-0 xl:bg-hero2xl xl:mb-12 xl:pt-32 xl:items-start'>
        <div className='xl:w-1/2 flex justify-center xl:justify-end'>
          <img className='absolute top-12 xl:relative xl:hidden' src={zx9} alt='zx9'/>
          <img className='absolute hidden xl:relative xl:flex' src={zx9xl} alt='zx9'/>
        </div>
        <div className='xl:w-1/2 xl:flex xl:flex-col xl:justify-start'>
          <h2 className='pt-72 text-4xl font-bold tracking-[1.29px] mb-6 md:text-56xl md:tracking-[2px] md:leading-[58px] md:pt-80 xl:mx-40 xl:flex xl:flex-col xl:justify-start xl:text-start xl:pt-10'>ZX9 SPEAKER</h2>
          <p className='text-sbase text-white opacity-75 font-medium mx-6 mb-6 md:mb-10 xl:mr-20 xl:ml-40 xl:text-start'>Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.</p>
          <Link to="/product/zx9-speaker" className='bg-black2 px-8 py-4 text-sm font-bold tracking-[1px] xl:ml-40 xl:max-w-[160px] xl:px-0'>SEE PRODUCT</Link>
        </div>
      </div>
      <div className='bg-hero3 bg-right bg-no-repeat py-24 mx-6 rounded-lg mb-6 px-6 md:bg-hero3md md:mx-10 md:px-16 md:mb-8 xl:bg-hero3xl xl:mx-40 xl:min-w-[1110px] xl:min-h-[320px] xl:bg-cover xl:p-24 xl:mb-12'>
        <h2 className='text-28xl tracking-[2px] font-bold mb-8 '>ZX7 SPEAKER</h2>
        <Link to="/product/zx7-speaker" className='px-8 py-4 border border-black2 text-sm tracking-[1px] font-bold'>SEE PRODUCT</Link>
      </div>
      <div className='mx-6 md:flex md:mx-10 md:gap-3 md:mb-24 xl:mx-40 xl:gap-8 xl:mb-52'>
        <div className='xl:w-1/2'>
          <img className='mb-6 contain md:mb-0 md:min-h-[178px] xl:hidden xl:absolute' src={yx1} alt='yx1' />
          <img className='hidden absolute contain md:mb-0 xl:flex xl:relative' src={yx1xl} alt='yx1' />
        </div>
        <div className='py-10 px-6 bg-greywhite rounded-lg mb-32 md:w-full md:mb-0 md:min-h-full xl:w-1/2 xl:p-24'>
          <h2 className='text-28xl font-bold tracking-[2px] mb-8'>YX1 EARPHONES</h2>
          <Link to="/product/yx1-earphones" className='px-8 py-4 border border-black2 text-sm tracking-[1px] font-bold'>SEE PRODUCT</Link>
        </div>
      </div>
      <div className='px-6 md:px-10 xl:px-40 xl:mb-52'>
        <Ad />
      </div>
    </section>
  );
}

export default Homepage;