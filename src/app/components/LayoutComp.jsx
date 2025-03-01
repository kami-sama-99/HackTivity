"use client";

import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { OnboardingProvider } from "@/context/OnboardingContext"; // No need to import useOnboarding
import { auth } from "@/firebase/firebase"; // Ensure you have Firebase configured
import { onAuthStateChanged } from "firebase/auth";

const inter = Inter({ subsets: ["latin"] });

function LayoutContent({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-navy-900 text-white`}>
        <main>{children}</main>
      </body>
    </html>
  );
}

export default function LayoutComp({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <OnboardingProvider>
      <LayoutContent>{children}</LayoutContent>
    </OnboardingProvider>
  );
}
