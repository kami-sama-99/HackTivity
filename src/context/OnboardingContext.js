"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { useSession } from "next-auth/react";
import { db } from "@/firebase/firebase"; // Ensure Firebase is initialized
import { doc, getDoc } from "firebase/firestore";

// Create Context
const OnboardingContext = createContext();

// Provider Component
export function OnboardingProvider({ children }) {
  const { data: session, status } = useSession();
  const [onboarding, setOnboarding] = useState(false);

  useEffect(() => {
    const fetchOnboardingStatus = async () => {
      if (status === "authenticated") {
        const userId = session?.user?.uid; // Ensure it matches Firestore UID

        if (!userId) return;

        try {
          const docRef = doc(db, "Onboarding Status", userId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setOnboarding(docSnap.data().status); // Fetching 'status' from Firestore
          }
        } catch (error) {
          console.error("Error fetching onboarding status:", error);
        }
      }
    };

    fetchOnboardingStatus();
  }, [session, status]);

  return (
    <OnboardingContext.Provider value={{ onboarding, setOnboarding }}>
      {children}
    </OnboardingContext.Provider>
  );
}

// Custom Hook for easier usage
export function useOnboarding() {
  return useContext(OnboardingContext);
}
