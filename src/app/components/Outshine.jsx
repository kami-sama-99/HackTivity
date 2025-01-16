import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import reportImg from "@/app/public/images/performance report.png"


export default function Outshine(){
    const { scrollY } = useScroll()

    const outshineImageX = useTransform(scrollY, [600, 900], [100, 0])
    const outshineTextX = useTransform(scrollY, [600, 900], [-100, 0])
    const outshineOpacity = useTransform(scrollY, [600, 900], [0, 1])
  
    return(
        <section className="flex flex-col md:flex-row-reverse items-center justify-between p-8 md:p-16 gap-16 overflow-hidden">
<motion.div
  style={{ x: outshineImageX, opacity: outshineOpacity }}
  className="w-full md:w-1/2"
>
  <Image 
    src={reportImg.src}
    alt="Analytics illustration"
    width={400}
    height={400}
    className="rounded-lg "
  />
</motion.div>
<motion.div 
  style={{ x: outshineTextX, opacity: outshineOpacity }}
  className="w-full md:w-1/2 text-white"
>
  <h2 className="text-4xl font-bold mb-4">Outshine Your Peers!</h2>
  <p className="text-lg">
    We give detailed performance reports that help you track your progress 
    and see what your peers are doing
  </p>
</motion.div>
</section>
    )
}
