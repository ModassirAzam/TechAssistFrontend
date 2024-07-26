import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateToken } from "../redux/user/userSlice";


const Header = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch()

  function handleLogout() {
    localStorage.removeItem("token")
    dispatch(updateToken(localStorage.getItem("token")))
    navigate('/log-in');
  }

  return (
    <header className='bg-slate-200 shadow-md'>
    <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
      <Link to='/'>
        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
          <span className='text-slate-500'>Tech-</span>
          <span className='text-slate-700'>Assist</span>
        </h1>
      </Link>
      <ul className='flex gap-4'>
        {
          token ? (
            <>
              <Link to='/profile'>
                <li className='sm:inline text-slate-700 hover:underline'>
                  Profile
                </li>
              </Link>
              
              <li onClick={handleLogout} className='sm:inline text-slate-700 hover:underline cursor-pointer'>
                Logout
              </li>
             

            </>
          ): (
            <>
              <Link to={'/log-in'}><li className=' text-slate-700 hover:underline'>Login</li></Link>
            </>
          )
        }
      </ul>
    </div>
  </header>
  );
};

export default Header;
