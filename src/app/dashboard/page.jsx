'use client';

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "../components/Header";
import Menu from "../components/Menu";
import ProfileCard from "../components/ProfileCard";
import PageLayout from "../components/PageLayout";
import PercentileGraph from "../components/PercentileGraph";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/"); // Redirect to the landing page if not authenticated
    }
  }, [status, router]); // Dependency on status and router to trigger the redirect when necessary

  // Handle loading state
  if (status === "loading") {
    return <div>Loading...</div>; // You can customize this with a spinner or any loading state
  }

  // If the user is authenticated, render the dashboard
  return (
    <PageLayout content={
      <div>
        <ProfileCard />
        <PercentileGraph />
      </div>
    } />
  );
}
