import React from 'react'
import Logo from './Logo';

const Footer = () => {
    const year = new Date().getFullYear();
  return (
    <div className='mt-24 w-full mx-auto pb-6'>
      <div className='border border-b border-cblack'/>
      <div className="footer-wrapper flex justify-center items-center flex-col mt-8">
        <Logo size={250}/>
        <p className='mt-4 text-base md:text-xl'>Aid you can trust!</p>
        <ul className="social-links flex space-x-6 mt-4">
            <li><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 512 512"><path fill="currentColor" d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256c0 120 82.7 220.8 194.2 248.5V334.2h-52.8V256h52.8v-33.7c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287v175.9C413.8 494.8 512 386.9 512 256"/></svg></a></li>
            <li><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 448 512"><path fill="currentColor" d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3M135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5c0 21.3-17.2 38.5-38.5 38.5m282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7c-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5c67.2 0 79.7 44.3 79.7 101.9z"/></svg></a></li>
            <li><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 512 512"><path fill="currentColor" d="M389.2 48h70.6L305.6 224.2L487 464H345L233.7 318.6L106.5 464H35.8l164.9-188.5L26.8 48h145.6l100.5 132.9zm-24.8 373.8h39.1L151.1 88h-42z"/></svg></a></li>
        </ul>
        <div className="copyright text-sm mt-4 text-gray-400">
            <p>&copy; Copyright {year} By BlockAid</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
