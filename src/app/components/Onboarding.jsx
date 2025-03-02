"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/context/OnboardingContext";
import { auth, db } from "@/firebase/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function OnboardingForm() {
  const router = useRouter();
  const { setOnboarding } = useOnboarding();
  const [userId, setUserId] = useState(null);
  
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

  const [errors, setErrors] = useState({});

  // Monitor authentication status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUserId(user.uid);
      else router.push("/signin"); // Redirect if not signed in
    });
    return () => unsubscribe();
  }, [router]);

  // Regex patterns for URL validation
  const urlPatterns = {
    linkedin: /^https:\/\/(www\.)?linkedin\.com\/.*$/,
    leetcode: /^https:\/\/(www\.)?leetcode\.com\/.*$/,
    github: /^https:\/\/(www\.)?github\.com\/.*$/,
  };

  // Validate URLs
  const validateUrls = () => {
    let newErrors = {};
    
    Object.keys(urlPatterns).forEach((key) => {
      if (formData[key] && !urlPatterns[key].test(formData[key])) {
        newErrors[key] = `Invalid ${key} URL`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      console.error("User is not authenticated.");
      return;
    }

    if (!validateUrls()) {
      console.error("Invalid URLs detected.");
      return;
    }

    try {
      const formattedDOB = formData.dob ? Timestamp.fromDate(new Date(formData.dob)) : null;

      const userData = {
        ...formData,
        dob: formattedDOB,
        uid: userId,
      };

      await setDoc(doc(db, "User Data", userId), userData, { merge: true });
      await setDoc(doc(db, "Onboarding Status", userId), { status: true }, { merge: true });

      setOnboarding(true);
      router.push("/dashboard");

      console.log("Data submitted:", userData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (urlPatterns[e.target.name] && !urlPatterns[e.target.name].test(e.target.value)) {
      setErrors({ ...errors, [e.target.name]: `Invalid ${e.target.name} URL` });
    } else {
      setErrors({ ...errors, [e.target.name]: "" });
    }
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
              {["name", "profession", "field", "organisation"].map((field) => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md bg-white text-black placeholder-gray-500"
                />
              ))}
              
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-white text-black placeholder-gray-500"
              />

              {["linkedin", "leetcode", "github"].map((field) => (
                <div key={field}>
                  <input
                    type="text"
                    name={field}
                    placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)} URL`}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full p-3 rounded-md bg-white text-black placeholder-gray-500"
                  />
                  {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
                </div>
              ))}

              <button type="submit" className="px-6 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300 transition-colors">
                Proceed
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
