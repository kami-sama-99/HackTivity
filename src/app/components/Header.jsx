import Link from 'next/link'
import Image from 'next/image'
import logo from "@/app/public/logo/HackTivity logo.png"
 
export default function Header(){
    return(
        <nav className="flex justify-between items-center p-4">
        <div className="flex items-center gap-2">
          <Image 
            src={logo.src}
            alt="Logo"
            width={40}
            height={40}
            className='rounded-100'
          />
          <span className="text-white text-xl font-bold">HackTivity</span>
        </div>
        <div className="flex gap-4">
          <Link href="/signin" className="text-white hover:text-green-400">Login</Link>
          <Link href="/signup" className="text-white hover:text-green-400">Sign up</Link>
        </div>
      </nav>
    )
}