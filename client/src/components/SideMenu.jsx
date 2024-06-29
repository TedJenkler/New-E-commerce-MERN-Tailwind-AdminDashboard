import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SideMenu = () => {
    const { pathname } = useLocation();

    // Function to check if the current path matches the menu item
    const isActive = (path) => {
        return pathname === path;
    };

    return (
        <aside className="hidden xl:block bg-gradient-to-br from-gray-800 to-gray-900 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0">
            {/* Logo/Header */}
            <div className="relative border-b border-white/20">
                <a className="flex items-center gap-4 py-6 px-8" href="#/">
                    <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">Admin Panel</h6>
                </a>
                <button className="middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-white hover:bg-white/10 active:bg-white/30 absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden" type="button">
                    <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" aria-hidden="true" className="h-5 w-5 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </span>
                </button>
            </div>

            {/* Menu Items */}
            <div className="m-4">
                <ul className="mb-4 flex flex-col gap-1">
                    <li>
                        <Link to="/adminpage" className={`middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg ${isActive('/adminpage') ? 'bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]' : 'text-white hover:bg-white/10 active:bg-white/30'} w-full flex items-center gap-4 px-4 capitalize`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5 text-inherit">
                                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"></path>
                                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"></path>
                            </svg>
                            <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">Dashboard</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/products" className={`middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg ${isActive('/admin/products') ? 'bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]' : 'text-white hover:bg-white/10 active:bg-white/30'} w-full flex items-center gap-4 px-4 capitalize`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5 text-inherit">
                                <path d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd"></path>
                            </svg>
                            <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">Products</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/categories" className={`middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg ${isActive('/admin/categories') ? 'bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]' : 'text-white hover:bg-white/10 active:bg-white/30'} w-full flex items-center gap-4 px-4 capitalize`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5 text-inherit">
                                <path d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 18.375V5.625zM21 9.375A.375.375 0 0020.625 9h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zM10.875 18.75a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5zM3.375 15h7.5a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375zm0-3.75h7.5a.375.375 0 00.375-.375v-1.5A.375.375 0 0010.875 9h-7.5A.375.375 0 003 9.375v1.5c0 .207.168.375.375.375z" clipRule="evenodd"></path>
                            </svg>
                            <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">Categories</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/orders" className={`middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg ${isActive('/admin/orders') ? 'bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]' : 'text-white hover:bg-white/10 active:bg-white/30'} w-full flex items-center gap-4 px-4 capitalize`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5 text-inherit">
                                <path d="M12.516 2.046a1 1 0 00-1.032 0l-7.5 4.5a1 1 0 00-.484.858v9c0 .344.176.664.484.858l7.5 4.5a1 1 0 001.032 0l7.5-4.5a1 1 0 00.484-.858v-9a1 1 0 00-.484-.858l-7.5-4.5z"></path>
                            </svg>
                            <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">Orders</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/design" className={`middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg ${isActive('/admin/design') ? 'bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]' : 'text-white hover:bg-white/10 active:bg-white/30'} w-full flex items-center gap-4 px-4 capitalize`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5 text-inherit">
                                <path d="M12 2a9.967 9.967 0 00-7.032 2.908A9.967 9.967 0 002 12c0 2.672 1.035 5.173 2.908 7.032A9.967 9.967 0 0012 22c2.672 0 5.173-1.035 7.032-2.908A9.967 9.967 0 0022 12a9.967 9.967 0 00-2.908-7.032A9.967 9.967 0 0012 2zm0 18a7.962 7.962 0 01-5.656-2.344A7.962 7.962 0 014 12c0-2.121.828-4.122 2.344-5.656A7.962 7.962 0 0112 4c2.121 0 4.122.828 5.656 2.344A7.962 7.962 0 0120 12c0 2.121-.828 4.122-2.344 5.656A7.962 7.962 0 0112 20zm-3-9h6a1 1 0 010 2h-6a1 1 0 010-2zm0-4h6a1 1 0 010 2h-6a1 1 0 010-2zm0 8h6a1 1 0 010 2h-6a1 1 0 010-2z"></path>
                            </svg>
                            <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">Design</p>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default SideMenu;