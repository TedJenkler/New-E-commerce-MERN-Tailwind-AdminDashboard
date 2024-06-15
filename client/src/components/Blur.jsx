import React from 'react'
import { useSelector } from 'react-redux'

function Blur({ children }) {
    const toggleCart = useSelector((state) => state.shop.cartOpen)
  return (
    <div className={toggleCart ? "blur" : ""}>
      {children}
    </div>
  )
}

export default Blur
