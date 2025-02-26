import React from 'react'
import Developers from "./assets/developers";
import slide_images from "./assets/slide";
import { motion } from "motion/react";
import { Splide, SplideSlide} from "@splidejs/react-splide"
import "@splidejs/react-splide/css";


const About = () => {

//*   FADE IN VARIANTS

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
}

const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9 } },
};


  return (
    <div className='py-6 px-[1rem] flex flex-col items-center w-full mt-[5rem] md:mt-[8rem]'>
      <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      custom={0.5}
      viewport={{ once: true }}
      className="about text-center lg:px-[10rem] my-16">
        <div className="overflow-hidden py-2 mb-16">
            <motion.h1
            variants={itemVariants}
            className='font-bold text-6xl font-font1Smbd'>About Us</motion.h1>
        </div>
        <div className="overflow-hidden py-2">
            <motion.p
            variants={itemVariants}
            className='text-lg lg:text-2xl'>We are a dedicated team committed to revolutionize and modernize disaster relief using blockchain for transparency and efficiency. Our platform connects governments and communities, ensuring real-time tracking and fair aid distribution.</motion.p>
        </div>
      </motion.div>

      <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      custom={0.6}
      className="slider-wrapper flex justify-center items-center mt-24 w-full mx-10">
            <motion.div className="slide__container overflow-hidden"
            variants={itemVariants}
            >
                <Splide aria-label='slider'
                options={{
                    type: 'loop',
                    focus: 'center',
                    autoHeight: true,
                    autoWidth: true,
                    height: 500,
                    width: 1500,
                    autoplay: true,
                    perPage: 3,
                    perMove: 1,
                    gap: 40,
                    lazyLoad: true
                }}>
                    {slide_images.map((item) => (
                        <SplideSlide key={item.id} className="overflow-hidden rounded-lg">
                            <img src={`splide__images/${item.image}`} alt={item.id} className='w-full h-full object-cover'/>
                        </SplideSlide>
                    ))}
                </Splide>
            </motion.div>
      </motion.div>

      <div className="developers mt-[16rem] mx-auto">
        <div className="header">
            <motion.ul
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0.3}
            className='flex items-center space-x-3'>
                <motion.li
                variants={itemVariants}
                className='px-6 py-1 border border-cblack rounded-lg uppercase text-lg lg:text-xl'><span>Meet</span></motion.li>
                <motion.li
                variants={itemVariants}
                className='px-6 py-1 border border-cblack rounded-lg uppercase text-lg lg:text-xl'><span>The</span></motion.li>
                <motion.li
                variants={itemVariants}
                className='px-6 py-1 border border-cblack rounded-lg uppercase bg-clgreen text-lg lg:text-xl'><span>Team</span></motion.li>
            </motion.ul>
        </div>
        <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        custom={0.4}
        className="devs grid grid-cols-2 lg:grid-cols-4 w-full text-cwhite gap-8 mt-[5rem] px-auto mx-auto">
            {Developers.map((dev, index) => {
                return(
                    <motion.div
                    variants={itemVariants}
                    className='developer bg-cblack md:w-[300px] lg:w-[350px] rounded-2xl overflow-hidden col-span-4 md:col-span-2 lg:col-span-1' key={dev.id}>
                        <div className="dev__img-container bg-clgreen md:h-[350px] h-[400px] relative flex justify-center rounded-xl">
                            <div className="dev__img-wrapper md:h-[300px] h-[350px] absolute bottom-0">
                                <img src={`/developers/${dev.image}`} alt={`developer-${dev.name}`} className='w-full h-full object-cover' />
                            </div>
                        </div>
                        <div className="dev__role-container h-[150px] flex justify-center items-center flex-col">
                            <p className='font-bold text-4xl font-font1Light'>{dev.name}</p>
                            <p className='text-base font-lighter mt-2'>{dev.role}</p>
                        </div>
                    </motion.div>
                )
            })}
        </motion.div>
      </div>
    </div>
  )
}

export default About
