"use client";

import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import { OnboardingProvider } from "@/context/OnboardingContext"; // No need to import useOnboarding

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
  return (
    <SessionProvider>
      <OnboardingProvider>
        <LayoutContent>{children}</LayoutContent>
      </OnboardingProvider>
    </SessionProvider>
  );
}
