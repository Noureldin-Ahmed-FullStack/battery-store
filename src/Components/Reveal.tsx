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
                    hidden: { top: 0 },
                    visible: { top: '100%' },
                }
            case 'left':
                return {
                    hidden: { left: 0 },
                    visible: { left: '100%' },
                }
            case 'right':
                return {
                    hidden: { right: 0 },
                    visible: { right: '100%' },
                }
            case 'bottom':
                return {
                    hidden: { bottom: 0 },
                    visible: { bottom: '100%' },
                }
            default:
                return {
                    hidden: { top: 0 },
                    visible: { top: '100%' },
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
        <div ref={ref} className={`${(props.width === 'full') ? 'w-100' : 'fitContent'} position-relative`}>
            <motion.div variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 }
            }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 0.5, delay: 0.25 }}
            >
                {props.children}
            </motion.div>
            <motion.div
                variants={getSlideVariants(props.direction)}
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
