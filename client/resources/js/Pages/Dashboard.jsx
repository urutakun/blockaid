import React from 'react'
import Nav from "./components/Nav"
import NavLink from './components/NavLink'
import Footer from './components/Footer'
import About from './About'
import { usePage } from '@inertiajs/react'
import { motion } from "motion/react"
import { easeInOut } from 'motion'


const Dashboard = () => {

    const { props } = usePage();
    const user = props.auth.user;

    //* FADE IN VARIANTS

    const containerVariants = {
		hidden: { opacity: 0 },
		show: (delay) => ({
		opacity: 1,
			transition: {
                staggerChildren: 0.2,
                delayChildren: delay,
                ease: "easeInOut",
            },
        }),
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.9 } },
    };


  return (
    <div className='text-cblack overflow-x-hidden'>
        <Nav />
        <div className="dashboard-content">
            <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            viewport={{ once: true }}
            className="landing h-[75vh] lg:h-[85vh] flex flex-col justify-center items-center">
                <div className="header font-font1Smbd text-4xl md:text-6xl lg:text-8xl text-center">
                    <div className="overflow-hidden py-1 px-1 lg:py-2">
                        <motion.p
                        variants={itemVariants}
                        >Revolutionizing Disaster Relief</motion.p>
                    </div>
                    <div className="overflow-hidden py-1 lg:py-2">
                        <motion.p
                        variants={itemVariants}
                        >with <span className='text-cgreen'>Blockchain Technology</span></motion.p>
                    </div>
                </div>
                <div
                className="subtext px-[3rem] md:px-0 text-lg md:text-xl lg:text-4xl text-center mt-6">
                    <pre className='font-font2'>
                        <div className="overflow-hidden py-2">
                            <motion.p
                            variants={itemVariants}
                            >Bringing transparency, efficiency, and fairness</motion.p>
                        </div>
                        <div className="overflow-hidden py-2">
                            <motion.p
                            variants={itemVariants}
                            >to relief distribution.</motion.p>
                        </div>
                    </pre>
                </div>
                <motion.div
                variants={itemVariants}
                className={`action-button text-center mt-16 ${user ? 'hidden' : 'block'}`}>
                    <a href='/login' className='border border-cblack px-[2rem] md:px-[4rem] py-2 rounded-lg bg-clgreen hover:bg-cgreen ctransition'>Login</a>
                </motion.div>
            </motion.div>
            <div
            className="status bg-cblack w-full h-[300px] lg:min-h-[700px] text-cwhite p-6 lg:flex items-center justify-around mt-[4rem]">
                <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                custom={0.4}
                viewport={{ once: true }}
                 className="sec__1 h-full flex flex-col justify-evenly lg:flex-row lg:items-center lg:min-w-[700px] lg:space-x-8">
                    <div
                    className="total w-full flex justify-between items-center lg:flex-col h-full lg:justify-center">
                        <div className="overflow-hidden py-2">
                            <motion.span
                            variants={itemVariants}
                            className='text-sm lg:text-2xl text-gray-500 block'>Total Relief Sent</motion.span>
                        </div>
                        <div className="overflow-hidden py-2">
                            <motion.span
                            variants={itemVariants}
                            className='text-clgreen text-4xl lg:text-7xl lg:mt-8 font-font1Smbd block'>9,999</motion.span>
                        </div>
                    </div>
                    <div
                    className="received w-full flex justify-between items-center lg:flex-col h-full lg:justify-center">
                        <div className="overflow-hidden py-2">
                            <motion.span
                            variants={itemVariants}
                            className='text-sm lg:text-2xl text-gray-500 block'>Total Relief Received</motion.span>
                        </div>
                        <div className="overflow-hidden py-2">
                            <motion.span
                            variants={itemVariants}
                            className='text-clgreen text-4xl lg:text-7xl lg:mt-8 font-font1Smbd block'>9,999</motion.span>
                        </div>
                    </div>
                    <div
                    className="discrepancies w-full flex justify-between items-center lg:flex-col h-full lg:justify-center">
                        <div className="overflow-hidden py-2">
                            <motion.span
                            variants={itemVariants}
                            className='text-sm lg:text-2xl text-gray-500 block'>Discrepancies</motion.span>
                        </div>
                        <div className="overflow-hidden py-2">
                            <motion.span
                            variants={itemVariants}
                            className='text-clgreen text-4xl lg:text-7xl lg:mt-8 font-font1Smbd block'>0</motion.span>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                custom={1}
                viewport={{ once: true }}
                className="sec__1 hidden lg:flex items-center mx-4 lg:min-w-[500px] h-full max-w-[800px]">
                    <div className="mission">
                        <div className="overflow-hidden py-2">
                            <motion.p
                            variants={itemVariants}
                            className='text-5xl mb-4 font-bold'>We are working to make disaster relief tracking fair and transparent.</motion.p>
                        </div>
                        <div className="overflow-hidden py-2">
                            <motion.p
                            variants={itemVariants}
                            className='text-2xl font-font2 mt-[2rem]'>These key stats help track relief efforts and ensure it reaches the right people.</motion.p>
                        </div>
                    </div>
                </motion.div>
            </div>
            <About />
        </div>
        <Footer />
    </div>
  )
}

export default Dashboard
