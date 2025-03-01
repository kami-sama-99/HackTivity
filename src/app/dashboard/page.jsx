"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import ProfileCard from "../components/ProfileCard";
import PageLayout from "../components/PageLayout";
import PercentileGraph from "../components/PercentileGraph";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        router.push("/"); // Redirect if not authenticated
      } else {
        setUser(firebaseUser);
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [router]);

  if (loading) {
    return <div>Loading...</div>; // Show loading state
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
