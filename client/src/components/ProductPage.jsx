import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, addItem } from '../features/shopSlice';
import { useParams } from 'react-router';
import CategoryLinks from './CategoryLinks';
import Ad from './Ad';
import { Link } from 'react-router-dom';

function ProductPage() {
  const dispatch = useDispatch();
  const state = useSelector((shop) => shop.shop.data);
  const { id } = useParams();
  const [count, setCount] = useState(0);

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  const product = state ? state.find(product => product.slug === id) : null;

  const splitByTag = (str) => {
    return str.split("<br>");
  };

  // Function to determine base path based on environment
  const getBasePath = () => {
    return process.env.NODE_ENV === 'development' ? '../src' : ".";
  };

  return (
    <div className='px-6 md:px-10 md:pt-8 xl:px-40 xl:pt-20'>
      <div className='py-4 md:pb-6 md:pt-0 xl:pb-14'>
        <Link to="/" className='text-sbase font-medium text-bordergrey hover:text-darkorange'>Go Back</Link>
      </div>
      <section>
        <div className='md:flex md:gap-16 md:mb-32 xl:gap-32 xl:mb-40'>
          <div className='md:bg-greywhite md:min-h-[480px] md:w-72 md:rounded-lg md:flex md:items-center xl:w-1/2 xl:bg-white'>
            <img className='mb-8 md:mb-0 xl:absolute xl:hidden' src={product ? `${getBasePath()}/${product.img}` : null} alt="product img"/>
            <img className='hidden absolute xl:relative xl:flex' src={product ? `${getBasePath()}/${product.imgxl}` : null} alt="product img"/>
          </div>
          <div className='md:w-1/2 md:flex md:flex-col pt-12 xl:justify-center'>
            <p className='text-darkorange text-sm tracking-[10px] mb-6 md:text-xs md:tracking-[8.57px] md:mb-4'>{product ? product.newP ? "NEW PRODUCT" : null : null}</p>
            <h1 className='text-28xl font-bold text-black2 mb-6 tracking-[1px] md:mb-8 xl:mr-40 xl:text-40xl xl:tracking-[1.43px] xl:leading-[44px]'>{product ? product.name : null}</h1>
            <p className='text-sbase text-bordergrey font-medium mb-6 md:mb-8 xl:mr-20'>{product ? product.description : null}</p>
            <p className='text-lg text-black2 font-bold mb-8 tracking-[1.29px]'>$ {product ? product.price : null}</p>
            <div className='flex mb-24 xl:gap-4'>
              <div className='flex w-1/2 xl:w-1/4'>
                <div className='flex w-[120px] h-[48px] bg-greywhite'>
                  <button onClick={count > 0 ? () => setCount(count - 1) : null} className='w-1/3 hover:text-darkorange'>-</button>
                  <input value={count} className='w-1/3 bg-greywhite text-center' disabled={true}></input>
                  <button onClick={() => setCount(count + 1)} className='w-1/3 hover:text-darkorange'>+</button>
                </div>
              </div>
              <div className='w-1/2 flex items-center justify-end xl:justify-start'>
                <button onClick={() => {dispatch(addItem({ id: product._id, quantity: count, img: product.img, price: product.price, name: product.shortname })), setCount(0)}} className='btn-do'>ADD TO CART</button>
              </div>
            </div>
          </div>
        </div>
        <div className='xl:flex xl:gap-32 xl:mb-40'>
          <div className='xl:w-[57%]'>
            <h2 className='text-2xl text-black2 font-bold mb-6 tracking-[0.86px] md:text-32xl xl:mb-8'>FEATURES</h2>
            <p className='text-sbase text-bordergrey font-medium mb-6'>{product ? splitByTag(product.features)[0] : null}</p>
            <p className='text-sbase text-bordergrey font-medium mb-28 md:mb-32 xl:mb-0'>{product ? splitByTag(product.features)[1] : null}</p>
          </div>
          <div className='md:flex md:justify-between'>
            <div className='md:flex md:w-full xl:flex-col xl:min-w-[350px] xl:whitespace-nowrap'>
              <h2 className='text-2xl text-black2 font-bold mb-6 tracking-[0.86px] md:w-1/2 md:text-32xl md:tracking-[1.14px] xl:mb-8'>IN THE BOX</h2>
              <div className='md:flex md:flex-col md:w-1/2 xl:gap-2'>
                {product ? product.includes.map((item, index) => (
                  <div key={index} className='flex gap-5 mb-2 md:gap-8'>
                    <p className='text-sbase min-w-[20px] text-darkorange font-bold'>{item.quantity}x</p>
                    <p className='text-sbase text-bordergrey font-medium'>{item.item}</p>
                  </div>
                )) : null}
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col md:flex-row md:gap-5 md:mt-32 md:mb-32 xl:mb-40 xl:justify-start'>
          <div className='flex flex-col xl:gap-8 xl:justify-start'>
            <img className='mt-24 mb-4 md:mt-0 md:mb-5 md:w-full md:h-full xl:hidden xl:absolute' src={product ? `${getBasePath()}/${product.gallery.first.mobile}` : null} alt="gallery1" />
            <img className='hidden absolute xl:flex xl:relative' src={product ? `${getBasePath()}/${product.gallery.first.desktop}` : null} alt="gallery1" />
            <img className='mb-4 md:mb-0 md:w-full md:h-full xl:hidden xl:absolute' src={product ? `${getBasePath()}/${product.gallery.second.mobile}` : null} alt="gallery2" />
            <img className='absolute hidden xl:flex xl:relative' src={product ? `${getBasePath()}/${product.gallery.second.desktop}` : null} alt="gallery2" />
          </div>
          <img className='mb-32 md:mb-0 md:w-1/2 md:h-[368px] xl:hidden xl:absolute' src={product ? `${getBasePath()}/${product.gallery.third.mobile}` : null} alt="gallery3" />
          <img className='hidden absolute xl:relative xl:flex' src={product ? `${getBasePath()}/${product.gallery.third.desktop}` : null} alt="gallery3" />
        </div>
        <div className='flex flex-col md:w-full xl:mb-40'>
          <h3 className='text-2xl text-black2 font-bold text-center mb-10 tracking-[0.86px] md:text-32xl md:tracking-[1.14px] md:mb-14'>YOU MAY ALSO LIKE</h3>
          <div className='md:flex md:w-full md:gap-3 xl:gap-8 xl:justify-between'>
            {product ? product.others.map((item, index) => (
              <div key={index} className='flex flex-col items-center mb-32 xl:mb-0 md:w-1/3'>
                <img className='mb-8 md:hidden md:absolute' src={product ? `${getBasePath()}/${item.image.mobile}`: null} alt="other product" />
                <img className='mb-10 hidden absolute md:w-full md:flex md:relative xl:hidden xl:absolute' src={product ? `${getBasePath()}/${item.image.tablet}`: null} alt="other product" />
                <img className='mb-10 hidden absolute md:w-full xl:flex xl:relative' src={product ? `${getBasePath()}/${item.image.desktop}`: null} alt="other product" />
                <p className='text-2xl font-bold text-black2 text-center mb-8 md:tracking-[1.71px]'>{item.name}</p>
                <Link onClick={() => setCount(0)} to={"/product/" + item.slug} className='btn-do'>SEE PRODUCT</Link>
              </div>
            )) : null}
          </div>
        </div>
        <div className='xl:mb-40'>
          <CategoryLinks />
        </div>
        <div className='xl:mb-40'>
          <Ad />
        </div>
      </section>
    </div>
  );
}

export default ProductPage;
