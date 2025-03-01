"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/context/OnboardingContext";
import { useSession } from "next-auth/react";
import { db } from "@/firebase/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";

export default function OnboardingForm() {
  const router = useRouter();
  const { setOnboarding } = useOnboarding();
  const { data: session, status } = useSession();
  
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    profession: "",
    field: "",
    organisation: "",
    linkedin: "",
    leetcode: "",
    github: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (status !== "authenticated") {
      console.error("User is not authenticated.");
      return;
    }

    const userId = session?.user?.uid;
    if (!userId) {
      console.error("User ID not found.");
      return;
    }

    try {
      // Convert DOB to Firestore Timestamp
      const formattedDOB = formData.dob ? Timestamp.fromDate(new Date(formData.dob)) : null;

      // Create Firestore-compatible object
      const userData = {
        name: formData.name,
        dob: formattedDOB,
        profession: formData.profession,
        field: formData.field,
        organisation: formData.organisation,
        linkedin: formData.linkedin,
        leetcode: formData.leetcode,
        github: formData.github,
        uid: userId, // Store UID for easy lookup
      };

      // Add user data to "User Data" collection
      await setDoc(doc(db, "User Data", userId), userData, { merge: true });

      // Update onboarding status to true
      await setDoc(doc(db, "Onboarding Status", userId), { status: true }, { merge: true });

      // Set onboarding state and navigate to dashboard
      setOnboarding(true);
      router.push("/dashboard");

      console.log("Data submitted:", userData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-navy-600 p-6 md:p-12">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-white">Let's Get Started</h1>
              <p className="text-gray-400">Before we proceed, let us get to know more about you!</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full p-3 rounded-md bg-white text-black placeholder-gray-500" />
              <input type="date" name="dob" placeholder="DOB" value={formData.dob} onChange={handleChange} className="w-full p-3 rounded-md bg-white text-black placeholder-gray-500" />
              <input type="text" name="profession" placeholder="Current Profession" value={formData.profession} onChange={handleChange} className="w-full p-3 rounded-md bg-white text-black placeholder-gray-500" />
              <input type="text" name="field" placeholder="Field" value={formData.field} onChange={handleChange} className="w-full p-3 rounded-md bg-white text-black placeholder-gray-500" />
              <input type="text" name="organisation" placeholder="University/Organisation" value={formData.organisation} onChange={handleChange} className="w-full p-3 rounded-md bg-white text-black placeholder-gray-500" />
              <input type="url" name="linkedin" placeholder="Link to LinkedIn" value={formData.linkedin} onChange={handleChange} className="w-full p-3 rounded-md bg-white text-black placeholder-gray-500" />
              <input type="url" name="leetcode" placeholder="Link to LeetCode" value={formData.leetcode} onChange={handleChange} className="w-full p-3 rounded-md bg-white text-black placeholder-gray-500" />
              <input type="url" name="github" placeholder="Link to Github" value={formData.github} onChange={handleChange} className="w-full p-3 rounded-md bg-white text-black placeholder-gray-500" />

              <button type="submit" className="px-6 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300 transition-colors">
                Proceed
              </button>
            </form>
          </div>

          <div className="hidden md:block">{/* Add any additional content here */}</div>
        </div>
      </div>
    </div>
  );
}
