"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { auth, db } from "@/firebase/firebase"; // Ensure Firebase is initialized
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

// Create Context
const OnboardingContext = createContext();

// Provider Component
export function OnboardingProvider({ children }) {
  const [onboarding, setOnboarding] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "Onboarding Status", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setOnboarding(docSnap.data().status); // Fetching 'status' from Firestore
          }
        } catch (error) {
          console.error("Error fetching onboarding status:", error);
        }
      }
      setLoading(false); // Stop loading once check is complete
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  return (
    <OnboardingContext.Provider value={{ onboarding, setOnboarding, loading }}>
      {children}
    </OnboardingContext.Provider>
  );
}

// Custom Hook for easier usage
export function useOnboarding() {
  return useContext(OnboardingContext);
}
