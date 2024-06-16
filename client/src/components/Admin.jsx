import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/adminSlice';
import { useNavigate } from 'react-router-dom';

function Admin() {
    const [loginForm, setLoginForm] = useState({ email: "", password: "" });
    const dispatch = useDispatch();
    const state = useSelector((state) => state.admin)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginForm));
        if(state.status === 'succeeded'){
            navigate('/adminpage')
        }
    };

    return (
        <section className='w-screen h-screen flex items-center justify-center'>
            <form className='bg-gray-200 p-6 rounded shadow-md w-96' onSubmit={handleSubmit}>
                <input
                    className='w-full mb-4 px-3 py-2 border border-gray-300 rounded'
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={loginForm.email}
                    onChange={handleChange}
                />
                <input
                    className='w-full mb-4 px-3 py-2 border border-gray-300 rounded'
                    type='password'
                    name='password'
                    placeholder='Password'
                    value={loginForm.password}
                    onChange={handleChange}
                />
                <button
                    className='w-full bg-blue-500 text-white py-2 rounded'
                    type='submit'
                >
                    Login
                </button>
            </form>
        </section>
    );
}

export default Admin;