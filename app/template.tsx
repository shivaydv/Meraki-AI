"use client"
import React from 'react'
import { motion } from "motion/react";

const Template = ({children}:{children:React.ReactNode}) => {
  return (
    <motion.div
    initial={{ y:30 , opacity: 0, filter: "blur(10px)" }}
    animate={{  y:0, opacity: 1, filter: "blur(0px)"}}
    transition={{duration:0.5} }
    className='w-full'
    >
        {children}
    </motion.div>
  )
}

export default Template