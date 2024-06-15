import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchData } from '../features/shopSlice';
import CategoryLinks from './CategoryLinks';
import Ad from './Ad';

function CategoryPage() {
  const state = useSelector((state) => state.shop.category);
  const products = useSelector((state) => state.shop.data);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  const category = state ? state.find(category => category.name === id) : null;
  let catId = category ? category._id : null;
  const product = products ? products.filter((item) => item.categoryId === catId) : null;
  const sortedP = product ? product.sort((a, b) => {
    if (a.newP === b.newP) {
      return 0;
    } else if (a.newP && !b.newP) {
      return -1;
    } else {
      return 1;
    }
  }) : null;

  // Function to determine base path based on environment
  const getBasePath = () => {
    return process.env.NODE_ENV === 'development' ? '../src' : " ";
  };

  return (
    <section className=''>
      <div className='bg-black1 py-8 flex items-center justify-center border-t border-bordergrey border-opacity-25 mb-16 md:pt-28 md:pb-24 md:mb-32 xl:mb-40'>
        <h1 className='text-white text-28xl font-bold md:text-40xl md:tracking-[1.43px]'>{category ? category.name.toUpperCase() : null}</h1>
      </div>
      {sortedP ? sortedP.map((item, index) => {
        return (
          <div key={index} className='card flex flex-col items-center text-center px-6 md:px-10 xl:px-40 xl:flex-row xl:gap-32 xl:mb-40'>
            <div className='md:bg-greywhite md:w-full md:rounded-lg md:flex md:justify-center md:mb-14 xl:bg-white xl:justify-between xl:w-1/2 xl:mb-0'>
              <img className='mb-8 md:mb-0 xl:hidden xl:absolute' src={`${getBasePath()}/${item.img}`} alt='product img' />
              <img className='hidden absolute xl:relative xl:flex' src={`${getBasePath()}/${item.imgxl}`} alt='product img' />
            </div>
            <div className='mb-32 xl:w-1/2 xl:flex xl:flex-col xl:items-start xl:justify-center xl:mb-0'>
              <p className='text-darkorange text-sm tracking-[10px] mb-6 md:mb-4 xl:text-start'>{item.newP ? "NEW PRODUCT" : null}</p>
              <h2 className='text-28xl tracking-[1px] text-black2 font-bold mb-6 md:mb-8 md:mx-52 md:text-40xl md:tracking-[1.43px] md:leading-[44px] xl:text-start xl:mx-0 xl:mr-20'>{item.name}</h2>
              <p className='sm:mx-10 text-sbase text-bordergrey font-medium mb-6 md:mx-24 xl:text-start xl:mx-0 xl:mr-20'>{item.description}</p>
              <Link to={"/product/" + item.slug} className='btn-do'>SEE PRODUCT</Link>
            </div>
          </div>
        );
      }) : null}
      <div className='px-6 md:mx-10 xl:mx-40 xl:mb-40 xl:p-0'>
        <CategoryLinks />
      </div>
      <div className='px-6 md:mx-10 xl:mb-40 xl:mx-40 xl:px-0'>
        <Ad />
      </div>
    </section>
  );
}

export default CategoryPage;
