import React from 'react'
import Developers from "./assets/developers";
import slide_images from "./assets/slide";
import { motion } from "motion/react";
import { Splide, SplideSlide} from "@splidejs/react-splide"
import "@splidejs/react-splide/css";


const About = () => {

  const devAnimationVariants = {
    hide: {
        opacity: 0,
        y: 20
    },
    show: (index) => ({
        opacity: 1,
        y: 0,
        transition: {
            type: 'tween',
            duration: 1.5,
            delay: 0.05 * index,
            ease: "easeInOut"
        }
    })
  }

  const itemsVariants  = {
    hide: {
        opacity: 0,
        y: 20
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1,
            staggerChildren: 0.5,
            ease: "easeInOut"
        }
    }
  }

  const splideVariants = {
    hide: {
        opacity: 0,
        y: 20
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1,
            ease: "easeInOut"
        }
    }
  }

  return (
    <div className='py-6 px-[1rem] flex flex-col items-center w-full mt-[5rem] md:mt-[8rem]'>
      <div className="about text-center lg:px-[10rem] my-16">
        <h1 className='font-bold text-6xl mb-16 font-font1Smbd'>About Us</h1>
        <p className='text-2xl'>We are a dedicated team committed to revolutionize and modernize disaster relief using blockchain for transparency and efficiency. Our platform connects governments and communities, ensuring real-time tracking and fair aid distribution.</p>
      </div>

      <div className="slider-wrapper flex justify-center items-center mt-24 w-full mx-10">
            <motion.div className="slide__container overflow-hidden"
            variants={splideVariants}
            initial="hide"
            whileInView="show"
            viewport={{
                once: true
            }}
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
      </div>

      <div className="developers mt-[10rem] mx-auto">
        <div className="header">
            <ul
            className='flex items-center space-x-3'>
                <motion.li
                variants={itemsVariants}
                initial="hide"
                whileInView="show"
                viewport={{
                    once: true
                }}
                className='px-6 py-1 border border-cblack rounded-lg uppercase'><span>Meet</span></motion.li>
                <motion.li
                variants={itemsVariants}
                initial="hide"
                whileInView="show"
                viewport={{
                    once: true
                }}
                className='px-6 py-1 border border-cblack rounded-lg uppercase'><span>The</span></motion.li>
                <motion.li
                variants={itemsVariants}
                initial="hide"
                whileInView="show"
                viewport={{
                    once: true
                }}
                className='px-6 py-1 border border-cblack rounded-lg uppercase bg-clgreen'><span>Team</span></motion.li>
            </ul>
        </div>
        <div className="devs grid grid-cols-4 w-full text-cwhite gap-8 mt-[5rem] px-auto mx-auto">
            {Developers.map((dev, index) => {
                return(
                    <motion.div
                    variants={devAnimationVariants}
                    initial="hide"
                    whileInView="show"
                    viewport={{
                        once: true
                    }}
                    custom={index}
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
        </div>
      </div>
    </div>
  )
}

export default About
