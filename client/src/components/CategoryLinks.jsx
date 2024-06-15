import React from 'react';
import { useSelector } from 'react-redux';
import arrow from '../assets/arrow.png';
import { Link } from 'react-router-dom';

function CategoryLinks() {
  const categories = useSelector((state) => state.shop.category);
  const basePath = process.env.NODE_ENV === 'development' ? '../src' : null;
  
  return (
    <div className='mb-32 md:flex md:gap-3 md:mb-24 xl:gap-8 xl:mb-40'>
      {categories.map((category, index) => (
        <div key={index} className='h-40 w-full bg-greywhite rounded-lg mb-20 relative pt-20 flex flex-col items-center md:mb-0 xl:pb-8'>
          {category.img && category.img.mobile && (
            <img className='absolute bottom-2/3 left-1/2 transform -translate-x-1/2' src={`${basePath}/${category.img.mobile}`} alt='category' />
          )}
          <p className='mb-4 text-sbase font-bold xl:text-lg xl:tracking-[1.29px] xl:font-bold'>{category.name.toUpperCase()}</p>
          <Link to={"/" + category.name} className='flex text-lxs font-bold text-bordergrey hover:text-darkorange items-center justify-center gap-3'>
            SHOP
            <img className='w-2 h-3' src={arrow} alt='arrow' />
          </Link>
        </div>
      ))}
    </div>
  );
}

export default CategoryLinks;
