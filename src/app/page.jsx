'use client'

import Header from './components/Header';
import HeroSection from './components/HeroSection';
import HowItWorks from './components/HowItWorks';
import Outshine from './components/Outshine';
import Footer from './components/Footer';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LandingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      // Redirect to the dashboard if the user is signed in
      router.push("/dashboard");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0A041C]">
      <Header/>
      <HeroSection/>
      <HowItWorks/>
      <Outshine/>
      <Footer/>   
    </div>
  )
}

