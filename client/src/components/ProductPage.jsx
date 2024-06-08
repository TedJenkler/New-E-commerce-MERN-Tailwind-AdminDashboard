import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../features/shopSlice';
import { useParams } from 'react-router';
import CategoryLinks from './CategoryLinks';
import Ad from './Ad';
import { Link } from 'react-router-dom';

function productPage() {
    const dispatch = useDispatch()
    const state = useSelector((shop) => shop.shop.data)
    const { id } = useParams();

    useEffect(() => {
        dispatch(fetchData());
    }, []);

    const product = state ? state.find(product => product.slug === id) : null

    const splitByTag = (str) => {
      return str.split("<br>")
    }

  return (
    <div className='px-6'>
      <div className='py-4'>
        <p className='text-sbase font-medium text-bordergrey'>Go Back</p>
      </div>
      <section>
        <img className='mb-8' src={product ? product.img : null} alt="product img"/>
        <p className='text-darkorange text-sbase tracking-[10px] mb-6'>{product ? product.newP ? "NEW PRODUCT" : null : null}</p>
        <h1 className='text-28xl font-bold text-black2 mb-6 tracking-[1px]'>{product ? product.name : null}</h1>
        <p className='text-sbase text-bordergrey font-medium mb-6'>{product ? product.description : null}</p>
        <p className='text-lg text-black2 font-bold mb-8 tracking-[1.29px]'>$ {product ? product.price : null}</p>
        <div className='flex mb-24'>
          <div className='flex w-1/2'>
            <div className='flex w-[120px] h-[48px] bg-greywhite'>
              <button className='w-1/3'>-</button>
              <input className='w-1/3 bg-greywhite text-center' value="0"></input>
              <button className='w-1/3'>+</button>
            </div>
          </div>
          <div className='w-1/2 flex items-center justify-end'>
            <button className='bg-darkorange text-white px-8 py-4 text-lxs'>ADD TO CART</button>
          </div>
        </div>
        <h2 className='text-2xl text-black2 font-bold mb-6 tracking-[0.86px]'>FEATURES</h2>
        <p className='text-sbase text-bordergrey font-medium mb-6'>{product ? splitByTag(product.features)[0] : null}</p>
        <p className='text-sbase text-bordergrey font-medium mb-28'>{product ? splitByTag(product.features)[1] : null}</p>
        <h2 className='text-2xl text-black2 font-bold mb-6 tracking-[0.86px]'>IN THE BOX</h2>
        {product ? product.includes.map((item, index) => {
          return ( 
          <div key={index} className='flex gap-5 mb-2'>
            <p className='text-sbase text-darkorange font-medium'>{item.quantity}x</p>
            <p className='text-sbase text-bordergrey font-medium'>{item.item}</p>
          </div>
          )
        }) : null}
        <img className='mt-24 mb-4' src={product ? product.gallery.first.mobile : null} alt="gallery1" />
        <img className='mb-4' src={product ? product.gallery.second.mobile : null} alt="gallery2" />
        <img className='mb-32' src={product ? product.gallery.third.mobile : null} alt="gallery2" />
        <h3 className='text-2xl text-black2 font-bold text-center mb-10 tracking-[0.86px]'>YOU MAY ALSO LIKE</h3>
        {product ? product.others.map((item, index) => {
          return (
            <div key={index} className='flex flex-col items-center mb-32'>
              <img className='mb-8' src={item.image.mobile} />
              <p className='text-2xl font-bold text-black2 text-center mb-8'>{item.name}</p>
              <Link to={"/product/" + item.slug} className='bg-darkorange text-white px-8 py-4'>SEE PRODUCT</Link>
            </div>
          )
        }) : null}
        <CategoryLinks />
        <Ad />
      </section>
    </div>
  )
}

export default productPage
