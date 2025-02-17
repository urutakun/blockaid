import React from 'react'
import Nav from "./components/Nav"
import NavLink from './components/NavLink'
import Footer from './components/Footer'
import About from './About'
import { usePage } from '@inertiajs/react'


const Dashboard = () => {

    const { props } = usePage();
    const user = props.auth.user;

  return (
    <div className='text-cblack'>
        <Nav />
        <div className="dashboard-content">
            <div className="landing h-[75vh] lg:h-[85vh] flex flex-col justify-center items-center">
                <div className="header font-font1Smbd text-5xl md:text-6xl lg:text-8xl text-center">
                    <p>Revolutionizing Disaster Relief</p>
                    <p>with <span className='text-cgreen'>Blockchain Technology</span></p>
                </div>
                <div className="subtext px-[3rem] md:px-0 text-lg md:text-xl lg:text-4xl text-center mt-6">
                    <pre className='font-font2'>
                        <p>Bringing transparency, efficiency, and fairness</p>
                        <p>to relief distribution.</p>
                    </pre>
                </div>
                <div className={`action-button text-center mt-16 ${user ? 'hidden' : 'block'}`}>
                    <a href='/login' className='border border-cblack px-[2rem] md:px-[4rem] py-2 rounded-lg bg-clgreen hover:bg-cgreen ctransition'>Login</a>
                </div>
            </div>
            <div className="status bg-cblack w-full h-[800px] md:h-[600px] mt-[6rem] text-cwhite px-[3rem]">
                <div className="content-wrapper h-full w-full grid grid-cols-2 justify-center items-center">
                    <div className="sec__1 grid grid-cols-3 gap-10 col-span-2 lg:col-span-1  h-full items-center py-6 lg:py-0">
                        <div className="sub__sec-1 text-center col-span-3 lg:col-span-1 items-center grid grid-cols-2 lg:grid-cols-1 ctransition">
                            <p className='text-xl lg:text-2xl text-gray-400 justify-self-start lg:justify-self-center'>Total Relief Goods Sent</p>
                            <p className='font-bold text-4xl lg:text-7xl lg:mt-[5rem] justify-self-end lg:justify-self-center text-clgreen'>999,999</p>
                        </div>
                        <div className="sub__sec-2 text-center col-span-3 lg:col-span-1 items-center grid grid-cols-2 lg:grid-cols-1 ctransition">
                            <p className='text-2xl text-gray-400 justify-self-start lg:justify-self-center'>Families Assisted</p>
                            <p className='font-bold text-4xl lg:text-7xl lg:mt-[5rem] justify-self-end lg:justify-self-center text-clgreen'>999,999</p>
                        </div>
                        <div className="sub__sec-3 text-center col-span-3 lg:col-span-1 items-center grid grid-cols-2 lg:grid-cols-1 ctransition">
                            <p className='text-2xl text-gray-400 justify-self-start lg:justify-self-center'>Discrepancies</p>
                            <p className='font-bold text-4xl lg:text-7xl lg:mt-[5rem] justify-self-end lg:justify-self-center text-clgreen'>0</p>
                        </div>
                    </div>
                    <div className="sec__2  col-span-2 lg:col-span-1">
                        <div className="mission flex flex-col lg:w-[700px] text-center lg:text-start lg:justify-self-end">
                            <p className='text-3xl lg:text-4xl font-bold'>We are working to make disaster relief tracking clear, efficient, and transparent</p>
                            <p className='text-xl lg:text-2xl mt-6 text-gray-400'>These key stats help track relief efforts and ensure it reaches the right people.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <About />
        <Footer />
    </div>
  )
}

export default Dashboard
