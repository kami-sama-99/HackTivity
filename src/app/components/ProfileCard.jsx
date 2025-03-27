import Image from "next/image";
import logo from "@/app/public/logo/HackTivity logo.png" // Ensure correct import path

export default function ProfileCard() {
  return ( 
    <div className="py-6">
      <div className="flex items-center text-gray-300 p-6 rounded-xl shadow-lg w-fit h-fit">
        {/* Profile Image Wrapper */}
        <div className="w-20 h-20 relative rounded-[25%] overflow-hidden">
          <Image
            src={logo}
            alt="User Profile image"
            width={80} // Increased width
            height={80} // Increased height
            className="object-cover"
          />
        </div>

        {/* Username & Rank */}
        <div className="ml-6">
          <p className="text-xl font-bold">Username</p>
          <div className="bg-gray-600 text-gray-200 px-4 py-2 rounded-lg shadow-md mt-2 w-fit">
            <p className="text-base font-medium">Rank: 10/100</p>
          </div>
        </div>
      </div>
    </div>
  );
}
