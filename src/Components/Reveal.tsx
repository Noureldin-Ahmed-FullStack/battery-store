import React, { useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { useEffect } from 'react'
interface props {
    children: React.ReactNode
    width: string
    direction: 'top' | 'left' | 'right' | 'bottom'
}
export default function Reveal(props: props) {
    const ref = useRef(null)
    const mainControls = useAnimation()
    const slideControls = useAnimation()
    const isInView = useInView(ref, { once: true })

    const getSlideVariants = (direction: 'top' | 'left' | 'right' | 'bottom') => {

        switch (direction) {
            case 'top':
                return {
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0 }
                }
            case 'left':
                return {
                    hidden: { opacity: 0, x: 40 },
                    visible: { opacity: 1, x: 0 }
                }
            case 'right':
                return {
                    hidden: { opacity: 0, x: -40 },
                    visible: { opacity: 1, x: 0 }
                }
            case 'bottom':
                return {
                    hidden: { opacity: 0, y: -40 },
                    visible: { opacity: 1, y: 0 }
                }
        }
    }
    useEffect(() => {
        if (isInView) {
            mainControls.start("visible")
            slideControls.start("visible")
        }
    }, [isInView, mainControls, slideControls])

    return (
        <div ref={ref} className={`${(props.width === 'full') ? 'w-100' : 'fitContent'} h-100 position-relative`}>
            <motion.div variants={getSlideVariants(props.direction)}
                initial="hidden"
                className='h-100'
                animate={mainControls}
                transition={{ duration: 0.5, delay: 0.25 }}
            >
                {props.children}
            </motion.div>
            <motion.div
                // variants={getSlideVariants(props.direction)}
                variants={{
                    hidden: { top: 0 },
                    visible: { top: '100%' },
                }}
                initial="hidden"
                animate={slideControls}
                transition={{ duration: 0.5, ease: "easeIn" }}
                style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    borderRadius: "3px",
                    background: "var(--brand)",
                    zIndex: 20,
                }}
            />
        </div >
    )
}
