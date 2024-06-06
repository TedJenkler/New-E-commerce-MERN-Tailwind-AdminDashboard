import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../features/shopSlice';
import { useParams } from 'react-router';

function productPage() {
    const dispatch = useDispatch()
    const state = useSelector((shop) => shop.shop.data)
    const { id } = useParams();
  
    const product = state.find(product => product.slug === id)
    console.log(product)

    useEffect(() => {
        dispatch(fetchData());
    }, []);

  return (
    <div>
      <div>
        <p>Go Back</p>
      </div>
      <section>
        <img src={product ? product.img : null} alt="product img"/>
        <h1>{product ? product.name : null}</h1>
        <p>{product ? product.description : null}</p>
        <p>$ {product ? product.price : null}</p>
        <div>

        </div>
        <h2>FEATURES</h2>
        <p>{product ? product.features : null}</p>
        <h2>IN THE BOX</h2>
        {product ? product.includes.map((item) => {
          return ( 
          <>
            <p>{item.quantity}</p>
            <p>{item.item}</p>
          </>
          )
        }) : null}
        <img src={product ? product.gallery.first.mobile : null} alt="gallery1" />
        <img src={product ? product.gallery.second.mobile : null} alt="gallery2" />
        <img src={product ? product.gallery.third.mobile : null} alt="gallery2" />
        <h3>YOU MAY ALSO LIKE</h3>
        {product ? product.others.map((item) => {
          return (
            <>
              <img src={item.image.mobile} />
              <p>{item.name}</p>
            </>
          )
        }) : null}
        <img />
        <h3>BRINGING YOU THE <span>BEST</span> AUDIO GEAR</h3>
        <p>Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.</p>
      </section>
    </div>
  )
}

export default productPage
