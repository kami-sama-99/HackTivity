"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/context/OnboardingContext";
import { auth } from "@/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function OnboardingForm() {
  const router = useRouter();
  const { setOnboarding } = useOnboarding();
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [leetcodeData, setLeetCodeData] = useState(null);

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUserId(user.uid);
      else router.push("/signin");
    });
    return () => unsubscribe();
  }, [router]);

  // Function to extract username from URL
  const extractUsername = (url) => {
    const match = url.match(/leetcode\.com\/(?:u\/)?([^/?#]+)/);
    return match ? match[1] : null;
  };  

  useEffect(() => {
    const fetchLeetCode = async () => {
      if (!formData.leetcode) return;

      const username = extractUsername(formData.leetcode);
      if (!username) {
        setErrors((prev) => ({ ...prev, leetcode: "Invalid LeetCode URL" }));
        return;
      }

      setLoading(true);
      const data = await fetchLeetCodeData(username);
      setLeetCodeData(data);
      setLoading(false);
    };

    fetchLeetCode();
  }, [formData.leetcode]); // Runs when LeetCode URL changes

  const validateForm = () => {
    let newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key] || formData[key].trim() === "") {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    });

    const urlPatterns = {
      linkedin: /^https:\/\/(www\.)?linkedin\.com\/.*$/,
      leetcode: /^https:\/\/(www\.)?leetcode\.com\/.*$/,
      github: /^https:\/\/(www\.)?github\.com\/.*$/,
    };

    Object.keys(urlPatterns).forEach((key) => {
      if (formData[key] && formData[key].trim() !== "" && !urlPatterns[key].test(formData[key])) {
        newErrors[key] = `Invalid ${key} URL`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchLeetCodeData = async (username) => {
    try {
      const response = await fetch("/api/leetcode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });
  
      if (!response.ok) throw new Error("Failed to fetch LeetCode data");
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching LeetCode data:", error);
      return null;
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm() || !userId) return;

    setLoading(true);
    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, formData, leetcodeData }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Submission failed");

      setOnboarding(true);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value || "" });
  };

  return (
    <div className="min-h-screen bg-navy-600 p-6 md:p-12">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Let's Get Started</h1>
            <p className="text-gray-400">Before we proceed, let us get to know more about you!</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              {Object.keys(formData).map((field) => (
                <div key={field}>
                  <input
                    type={field === "dob" ? "date" : "text"}
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full p-3 rounded-md bg-white text-black placeholder-gray-500"
                  />
                  {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
                </div>
              ))}

              <button
                type="submit"
                className="px-6 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300 transition-colors"
                disabled={loading}
              >
                {loading ? "Processing..." : "Proceed"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
