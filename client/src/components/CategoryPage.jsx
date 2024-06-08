import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { fetchData } from '../features/shopSlice'
import CategoryLinks from './CategoryLinks'
import Ad from './Ad'

function CategoryPage() {
    const state = useSelector((state) => state.shop.category)
    const products = useSelector((state) => state.shop.data)
    const { id } = useParams()
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(fetchData());
  }, []);

    const category = state ? state.find(category => category.name === id) : null
    let catId = category ? category._id : null;
    const product = products ? products.filter((item) => item.categoryId === catId) : null;
    const sortedP = product.sort((a, b) => {
      if(a.newP === b.newP){
        return 0;
      }
      else if(a.newP && !b.newP){
        return -1;
      }
      else {
        return 1;
      }
    })

    return (
    <section className=''>
      <div className='bg-black2 py-8 flex items-center justify-center border-t border-bordergrey border-opacity-25 mb-16'>
        <h1 className='text-white text-28xl font-bold'>{category ? category.name.toUpperCase() : null}</h1>
      </div>
      {sortedP ? sortedP.map((item, index) => {
        return (
          <div key={index} className='flex flex-col items-center text-center px-6'>
            <img className='mb-8' src={item.img} alt='product img' />
            <p className='text-darkorange text-sm tracking-[10px] mb-6'>{item.newP ? "NEW PRODUCT" : null}</p>
            <h2 className='text-28xl tracking-[1px] text-black2 font-bold mb-6'>{item.name}</h2>
            <p className='text-sbase text-bordergrey font-medium mb-6'>{item.description}</p>
            <Link to={"/product/" + item.slug} className='bg-darkorange text-white text-xs py-4 px-8 mb-32'>SEE PRODUCT</Link>
          </div>
        )
      }) : null}
      <div className='px-6'>
        <CategoryLinks />
      </div>
      <div className='px-6'>
        <Ad />
      </div>
    </section>
  )
}

export default CategoryPage
