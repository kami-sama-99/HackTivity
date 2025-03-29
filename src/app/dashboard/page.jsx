"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { useOnboarding } from "@/context/OnboardingContext";
import ProfileCard from "../components/ProfileCard";
import PageLayout from "../components/PageLayout";
import PercentileGraph from "../components/PercentileGraph";

export default function Dashboard() {
  const { onboarding, loading: onboardingLoading } = useOnboarding(); // Track onboarding loading state
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthLoading(false); // Stop loading once auth state is known
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Ensure both auth and onboarding data are available before redirecting
    if (!authLoading && !onboardingLoading) {
      if (!user) {
        router.push("/"); // Redirect to home if not authenticated
      } else if (!onboarding) {
        router.push("/onboarding"); // Redirect if onboarding is incomplete
      }
    }
  }, [authLoading, onboardingLoading, user, onboarding, router]);

  if (authLoading || onboardingLoading) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  return (
    <PageLayout
      content={
        <div>
          <ProfileCard user={user} />
          <PercentileGraph />
        </div>
      }
    />
  );
}
