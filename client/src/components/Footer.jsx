import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.svg';
import facebook from '../assets/facebook.svg';
import twitter from '../assets/twitter.svg';
import instagram from '../assets/instagram.svg';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory } from '../features/shopSlice';
import { Link } from 'react-router-dom';

function Footer() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.shop.category);

  useEffect(() => {
    dispatch(fetchCategory());
  }, []);

  // State to track hover status
  const [hoveredIcon, setHoveredIcon] = useState(null);

  // Function to handle hover
  const handleHover = (iconName) => {
    setHoveredIcon(iconName);
  };

  // Function to handle mouse leave
  const handleMouseLeave = () => {
    setHoveredIcon(null);
  };

  return (
    <footer className='px-6 text-center min-h-[40.875rem] pb-10 bg-black2 flex flex-col items-center md:items-start md:px-10 md:pb-11 xl:px-40'>
      <div className='h-1 w-24 border-t-4 border-darkorange mb-14 md:mb-16'></div>
      <div className='xl:flex xl:w-full xl:justify-between'>
        <img className='mb-12 md:mb-8 xl:mb-9' src={logo} alt='logo' />
        <div>
          <ul className='text-white text-lxs tracking-[2px] font-bold mb-12 flex flex-col md:flex-row md:gap-8 md:mb-8 xl:mb-0'>
            <Link to="/" className='mb-4 hover:text-darkorange'>HOME</Link>
            {state ? state.map((category, index) => (
              <Link key={index} to={category.name ? "/" + category.name : null} className='mb-4 hover:text-darkorange'>{category.name.toUpperCase()}</Link>
            )) : null}
          </ul>
        </div>
      </div>
      <div>
        <div className='xl:flex xl:mb-14'>
          <div className='xl:w-1/2'>
            <p className='sm:mx-10 l:mr-40 text-white leading-[25px] text-sbase opacity-50 mb-12 md:mx-0 md:text-start md:mb-20 xl:mb-0'>Audiophile is an all-in-one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we’re open 7 days a week.</p>
          </div>
          <div className='xl:w-1/2 xl:flex xl:items-end xl:justify-end'>
            <div className='hidden absolute gap-4 xl:flex xl:relative'>
              <img
                src={facebook}
                alt='facebook'
                onMouseEnter={() => handleHover('facebook')}
                onMouseLeave={handleMouseLeave}
                style={{ filter: hoveredIcon === 'facebook' ? 'invert(65%) sepia(32%) saturate(3088%) hue-rotate(333deg) brightness(89%) contrast(90%)' : 'none' }}
              />
              <img
                src={twitter}
                alt='twitter'
                onMouseEnter={() => handleHover('twitter')}
                onMouseLeave={handleMouseLeave}
                style={{ filter: hoveredIcon === 'twitter' ? 'invert(65%) sepia(32%) saturate(3088%) hue-rotate(333deg) brightness(89%) contrast(90%)' : 'none' }}
              />
              <img
                src={instagram}
                alt='instagram'
                onMouseEnter={() => handleHover('instagram')}
                onMouseLeave={handleMouseLeave}
                style={{ filter: hoveredIcon === 'instagram' ? 'invert(65%) sepia(32%) saturate(3088%) hue-rotate(333deg) brightness(89%) contrast(90%)' : 'none' }}
              />
            </div>
          </div>
        </div>
        <div className='flex flex-col items-center md:justify-between md:w-full md:flex-row'>
          <p className='text-white text-sbase font-bold opacity-50 mb-12 md:w-1/2 md:text-start md:items-center md:mb-0'>Copyright 2021. All Rights Reserved</p>
          <div className='flex gap-4 md:w-1/2 md:justify-end xl:hidden xl:absolute'>
            <img src={facebook} alt='facebook' />
            <img src={twitter} alt='twitter' />
            <img src={instagram} alt='instagram' />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

