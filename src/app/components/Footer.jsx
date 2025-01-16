import Link from 'next/link';
import { FaGithub, FaTwitter, FaLinkedin, FaFacebook } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-[#0A041C] text-white border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">About HackTivity</h3>
                        <p className="text-gray-400">
                            Track your coding journey and connect with fellow developers.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <div className="flex flex-col gap-2">
                            <Link href="/about" className="text-gray-400 hover:text-green-400">About Us</Link>
                            <Link href="/contact" className="text-gray-400 hover:text-green-400">Contact Us</Link>
                            <Link href="/privacy" className="text-gray-400 hover:text-green-400">Privacy Policy</Link>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
                        <div className="flex gap-4">
                            <Link href="#" className="text-gray-400 hover:text-green-400">
                                <FaGithub className="w-6 h-6" />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-green-400">
                                <FaTwitter className="w-6 h-6" />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-green-400">
                                <FaLinkedin className="w-6 h-6" />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-green-400">
                                <FaFacebook className="w-6 h-6" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} HackTivity. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
