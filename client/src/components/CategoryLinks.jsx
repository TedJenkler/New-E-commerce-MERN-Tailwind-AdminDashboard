import React from 'react'
import { useSelector } from 'react-redux'
import arrow from '../assets/arrow.png'

function CategoryLinks() {
    const state = useSelector((state) => state.shop.category)
    console.log(state)
  return (
    <div className='mb-32'>
        {state.map((category) => {
            return (
                <div className='h-40 w-full bg-greywhite rounded-lg mb-20 relative pt-20 flex flex-col items-center'>
                    <img className='absolute bottom-2/3 left-1/2 transform -translate-x-1/2' src={category.img.mobile} />
                    <p className='mb-4'>{category.name.toUpperCase()}</p>
                    <button className='flex items-center justify-center gap-3'>SHOP<img className='w-2 h-3' src={arrow} alt='arrow' /></button>
                </div>
            )
        })}
    </div>
  )
}

export default CategoryLinks
