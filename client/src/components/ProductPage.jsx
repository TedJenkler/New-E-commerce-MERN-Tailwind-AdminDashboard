import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { fetchData } from '../features/shopSlice';

function productPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchData());
    }, []);

  return (
    <div>
      
    </div>
  )
}

export default productPage
