import React, { useEffect } from 'react'
import Lenis from 'lenis'

const LenisWrapper = ({ children }) => {
    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.1,
            smooth: true,
            direction: 'vertical'
        });

        const raf = (time) => {
            lenis.raf(time);
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
            lenis.destroy();
        }

    }, [])
  return (
    <div>
        {children}
    </div>
  )
}

export default LenisWrapper
