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
      if (!user) {
        setOnboarding(false); // Ensure onboarding resets when user logs out
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "Onboarding Status", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setOnboarding(docSnap.data().status); // Fetch 'status' from Firestore
        } else {
          setOnboarding(false); // Default to false if no document exists
        }
      } catch (error) {
        console.error("Error fetching onboarding status:", error);
      } finally {
        setLoading(false); // Ensure loading stops
      }
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
