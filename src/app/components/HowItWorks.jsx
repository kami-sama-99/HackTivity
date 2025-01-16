'use client';

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import coderImg from "@/app/public/images/coding guy.png"


export default function HowItWorks(){
    
const { scrollY } = useScroll()
  
// Slide in animations for sections
const worksImageX = useTransform(scrollY, [300, 600], [-100, 0])
const worksTextX = useTransform(scrollY, [300, 600], [100, 0])
const worksOpacity = useTransform(scrollY, [300, 600], [0, 1])

    return(
        <section className="flex flex-col md:flex-row items-center justify-between p-8 md:p-16 gap-8 overflow-hidden">
<motion.div
  style={{ x: worksImageX, opacity: worksOpacity }}
  className="w-full md:w-1/2"
>
  <Image 
    src={coderImg.src}
    alt="How it works illustration"
    width={400}
    height={400}
    className="rounded-lg w-100"
  />
</motion.div>
<motion.div 
  style={{ x: worksTextX, opacity: worksOpacity }}
  className="w-full md:w-1/2 text-white"
>
  <h2 className="text-4xl font-bold mb-4">How it works?</h2>
  <p className="text-lg">
    All you need to do is sign up create a profile and just sit back and relax, 
    let us help you have your dream coding career
  </p>
</motion.div>
</section>
    )
}
