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
        setOnboarding(false);
        setLoading(false);
        return;
      }
  
      try {
        console.log("User id is", user.uid);
        const docRef = doc(db, "Onboarding Status", user.uid);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          const status = docSnap.data().status;
          console.log("Fetched onboarding status:", status);
          setOnboarding(status);
        } else {
          setOnboarding(false);
        }
      } catch (error) {
        console.error("Error fetching onboarding status:", error);
      } finally {
        setLoading(false);
      }
    });
  
    return () => unsubscribe();
  }, []);
  
  useEffect(() => {
    console.log("Updated onboarding state:", onboarding);
  }, [onboarding]); // Logs whenever onboarding state changes

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
