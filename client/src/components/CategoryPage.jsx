import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchData } from '../features/shopSlice'

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
    console.log(product)

    return (
    <section>
      <div className='bg-black2 py-8 flex items-center justify-center border-t border-bordergrey border-opacity-25 mb-16'>
        <h1 className='text-white text-28xl font-bold'>{category ? category.name.toUpperCase() : null}</h1>
      </div>
    </section>
  )
}

export default CategoryPage
