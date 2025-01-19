import Link from "next/link";

export default function HeroSection(){
    return(
        <section className="flex items-center justify-between p-8 md:p-16 bg-[#FFE5E5]">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900">
            You Hack It
            <br />
            We'll Track It
          </h1>
          <p className="text-lg mb-6 text-gray-900">
            A platform where coders can track what they code and keep up with their peers
          </p>
          <Link href="/signup">
          <button className="relative px-8 py-3 text-white font-medium bg-black rounded-full overflow-hidden group">
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 bg-green-400 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
          </button>
          </Link>
        </div>
        <div className="hidden md:block">
          <div className="w-72 h-72 bg-green-400 rounded-full flex items-center justify-center">
            <div className="w-48 h-48 bg-gray-800 rounded-lg flex items-center justify-center">
              <span className="text-green-400 text-4xl">&lt;/&gt;</span>
            </div>
          </div>
        </div>
      </section>
    )
}