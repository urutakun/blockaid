import React from 'react'
import { AnimatePresence, motion } from "motion/react";
import { easeIn } from 'motion';

const MobileNavLink = ({ name, action }) => {
    const linkVarants = {
        initial: {
            y: "30vh",
            transition: {
                duration: 0.5,
                ease: [0.37, 0, 0.63, 1]
            }
        },
        animate: {
            y: 0,
            transition: {
                delay: 0.4,
                duration: 0.7,
                ease: [0, 0.55, 0.45, 1]
            }
        },
        exit: {
            y: "30vh",
            transition: {
                duration: 0.7,
                ease: [0.37, 0, 0.63, 1]
            }
        }
    }
  return (
            <motion.div
            variants={linkVarants}
            initial="initial"
            animate="animate"
            exit="exit"
            ><a href={`/${action}`} className='flex items-center justify-center hover:text-cgreen hover:underline ctransition capitalize text-cwhite'><span>{name}</span></a>
            </motion.div>
  )
}

export default MobileNavLink
