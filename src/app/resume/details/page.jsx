"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import PageLayout from "@/app/components/PageLayout";
import PersonalInfo from "@/app/components/PersonalInfo";
import EducationInfo from "@/app/components/EducationInfo";
import WorkXpInfo from "@/app/components/WorkXpInfo";
import SkillsInfo from "@/app/components/SkillsInfo";
import HackathonsAchievementsInfo from "@/app/components/HackathonInfo";
import ProjectsInfo from "@/app/components/ProjectsInfo";
import ResumeFile from "@/app/components/ResumeFile";

export default function GiveDetails() {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const [formStage, setFormStage] = useState(1);
  const [resumeData, setResumeData] = useState({});
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        router.push("/signin");
      }
      setLoading(false); // Set loading to false after checking auth state
    });

    return () => unsubscribe();
  }, [router]);



  if (loading) return <p>Loading...</p>; // Show a loading message until userId is set

  return <PageLayout content={formStage === 1 ? <PersonalInfo userId={userId} formStage={formStage} setFormStage={setFormStage} setResumeData={setResumeData}/>
  : formStage === 2 ? <EducationInfo formStage={formStage} setFormStage={setFormStage} setResumeData={setResumeData}/>
  : formStage === 3 ? <WorkXpInfo formStage={formStage} setFormStage={setFormStage} setResumeData={setResumeData}/>
  : formStage === 4 ? <SkillsInfo formStage={formStage} setFormStage={setFormStage} setResumeData={setResumeData}/>
  : formStage === 5 ? <HackathonsAchievementsInfo formStage={formStage} setFormStage={setFormStage} setResumeData={setResumeData}/>
  : formStage === 6 ? <ProjectsInfo userId={userId} formStage={formStage} setFormStage={setFormStage} resumeData={resumeData} setResumeData={setResumeData}/>
  : <ResumeFile resumeData={resumeData} />
} />;
}
