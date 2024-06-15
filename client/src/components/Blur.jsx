import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart, toggleNav } from '../features/shopSlice';

function Blur({ children }) {
    const togglecart = useSelector((state) => state.shop.cartOpen);
    const togglenav = useSelector((state) => state.shop.navOpen);
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(toggleCart({ toggle: false }));
        dispatch(toggleNav({ toggle: false }));
    };

    return (
        <div onClick={handleClick} className={togglecart ? "blur" : togglenav ? "blur" : ""}>
            {children}
        </div>
    );
}

export default Blur;
