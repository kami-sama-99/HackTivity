"use client";
import PageLayout from "../components/PageLayout";
import { LinkedinAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import Link from "next/link";

export default function Page() {
  const handleLinkedinOauth = () => {
    const CLIENT_ID = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID;
    const REDIRECT_URI = "http://localhost:3000/api/auth/linkedin/callback"; // Ensure this matches LinkedIn settings
    const scope = "openid profile email"; // Updated scope names

    const linkedInAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&scope=${encodeURIComponent(scope)}`;

    window.location.href = linkedInAuthUrl;
  };

  return (
    <PageLayout
      content={
        <div className="flex flex-col items-center text-white text-center pt-20 px-6">
          <p className="text-5xl md:font-bold mb-8 max-w-lg">
            Generate your Resume with a few quick steps
          </p>
          <p className="text-2xl md:text-3xl font-semibold max-w-lg">
            You can either choose to enter data manually or allow us to fetch it
            from your LinkedIn profile
          </p>

          <div className="mt-6 flex flex-col md:flex-row gap-4">
            <Link href="/resume/details">
            <button className="px-6 py-3 text-lg border border-white rounded-lg hover:bg-white hover:text-black transition duration-300">
              Manual
            </button>
            </Link>
            <button
              className="px-6 py-3 text-lg bg-blue-500 rounded-lg hover:bg-blue-700 transition duration-300"
              onClick={handleLinkedinOauth}
            >
              LinkedIn
            </button>
          </div>
        </div>
      }
    />
  );
}
