import React, { useEffect, useState } from 'react'
import slide_images from '../assets/slide'
import { AnimatePresence, motion } from 'motion/react';

const HeroSlide = () => {
    let images = [...slide_images];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(prev => (prev + 1) % images.length);
        }, 3000)

        return () => clearInterval(interval);
    }, [])

  return (
    <div className='w-full h-full'>
        <AnimatePresence mode="wait">
            <motion.img
            key={index}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.4, ease: "easeInOut"}}
            src={`./splide__images/${images[index].image}`} alt="" className='w-full h-full object-cover'/>
        </AnimatePresence>
    </div>
  )
}

export default HeroSlide
