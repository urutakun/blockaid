import { usePage } from '@inertiajs/react'
import React, { useState } from 'react'
import NavLink from './NavLink';
import Logo from './Logo';

const Nav = ( { children } ) => {
    const { url, props } = usePage();
    const user = props.auth.user;
    const [isClicked, setIsClicked] = useState(false);
    const date = new Date();

    const handleOpenClick = () => {
        setIsClicked(true);
        document.body.classList.add('overflow-hidden');
    }

    const handleCloseClick = () => {
        setIsClicked(false);
        document.body.classList.remove('overflow-hidden');
    }

  return (
    <div>
      <div className={`mobile__nav w-full h-screen bg-cwhite fixed inset-0 ctransition ${isClicked ? 'block' : 'hidden'} flex justify-center flex-col items-center`}>
        <div className="exit absolute top-4 right-4 bg-gray-500 rounded-full text-cwhite p-1" onClick={handleCloseClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"/></svg>
        </div>
        <ul className="mobile__nav-links text-6xl text-center font-bold font-font1Smbd space-y-10">
            <li className={`${!user ? 'hidden' : 'block'}`}><a href="/profile" className='flex items-center justify-center hover:text-cgreen hover:underline ctransition'><span>Profile</span><svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24"><path fill="currentColor" d="M6.4 18L5 16.6L14.6 7H6V5h12v12h-2V8.4z"/></svg></a></li>
            <li><a href="/track" className='flex items-center justify-center hover:text-cgreen hover:underline ctransition'><span>Track Relief</span><svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24"><path fill="currentColor" d="M6.4 18L5 16.6L14.6 7H6V5h12v12h-2V8.4z"/></svg></a></li>
            <li><a href="/live-alert" className='flex items-center justify-center hover:text-cgreen hover:underline ctransition'><span>Live Alerts</span><svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24"><path fill="currentColor" d="M6.4 18L5 16.6L14.6 7H6V5h12v12h-2V8.4z"/></svg></a></li>
            <li><a href="/contact" className='flex items-center justify-center hover:text-cgreen hover:underline ctransition'><span>Contact Us</span><svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24"><path fill="currentColor" d="M6.4 18L5 16.6L14.6 7H6V5h12v12h-2V8.4z"/></svg></a></li>
        </ul>
            <p className='text-sm absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-500'>&copy; Copyright {date.getFullYear()} By BlockAid x Uruta</p>
      </div>
      <div className="desktop__nav w-full flex justify-between px-6 py-6 items-center ctransition">
        <div className="group__sec-1 flex items-center space-x-20">
            <Logo size={200}/>
            <div className="sec__2 hidden md:block">
                <ul className='flex space-x-6'>
                        {children}
                </ul>
            </div>
        </div>
        <div className="group__sec-2 hidden md:flex space-x-6 items-center">
            {user && user.role == 'admin' && (
                <div className="admin">
                    <a href="/admin/beneficiaries" className='py-3 px-8 bg-clgreen text-cblack rounded-md border border-cblack hover:bg-cgreen hover:text-cblack ctransition'>Admin Panel</a>
                </div>
            )}
            <div className="contact">
                <a href="#" className='py-3 px-8 bg-cblack text-white rounded-md border border-cblack hover:bg-clgreen hover:text-cblack ctransition'>Contact</a>
            </div>
            <a href='/profile' className={`image-wrapper rounded-full overflow-hidden w-12 h-12 ${!user ? 'hidden' : 'block'} border border-cblack`}>
                <img src={user && `${window.location.origin}/storage/uploads/` + user.image} alt="profile__picture" className='w-full h-full object-cover'/>
            </a>
        </div>
        <div className="burger__icon block md:hidden" onClick={handleOpenClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6h18M3 12h18M3 18h18"/></svg>
        </div>
      </div>
    </div>
  )
}

export default Nav
