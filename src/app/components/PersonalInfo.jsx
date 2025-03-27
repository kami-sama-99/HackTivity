"use client";

import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export default function PersonalInfo({ userId, formStage, setFormStage, setResumeData }) {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    leetcode: "",
    github: "",
    Bio: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchPersonalInfo = async () => {
      if (!userId) {
        console.error("UID is required to fetch user data");
        return;
      }

      try {
        const userDocRef = doc(db, "User Data", userId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const filteredData = Object.keys(formData).reduce((acc, key) => {
            if (userData[key] !== undefined) {
              acc[key] = userData[key];
            }
            return acc;
          }, {});

          setFormData((prevData) => ({
            ...prevData,
            ...filteredData,
          }));
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchPersonalInfo();
  }, [userId]);

  const validateForm = () => {
    let newErrors = {};

    // Required fields validation
    Object.keys(formData).forEach((key) => {
      if (!formData[key] || formData[key].trim() === "") {
        newErrors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required`;
      }
    });

    // URL validation patterns
    const urlPatterns = {
      linkedin: /^https:\/\/(www\.)?linkedin\.com\/.*$/,
      leetcode: /^https:\/\/(www\.)?leetcode\.com\/.*$/,
      github: /^https:\/\/(www\.)?github\.com\/.*$/,
    };

    // Email validation pattern
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Phone number validation pattern
    const phonePattern = /^[6-9]\d{9}$/;

    // URL validation
    Object.keys(urlPatterns).forEach((key) => {
      if (
        formData[key] &&
        formData[key].trim() !== "" &&
        !urlPatterns[key].test(formData[key])
      ) {
        newErrors[key] = `Invalid ${key} URL`;
      }
    });

    // Email validation
    if (
      formData.email &&
      formData.email.trim() !== "" &&
      !emailPattern.test(formData.email)
    ) {
      newErrors.email = "Invalid email format";
    }

    // Phone validation (ignoring "+91" prefix)
    if (formData.phone && formData.phone.trim() !== "") {
      const phoneNumber = formData.phone.replace("+91 ", ""); // Remove "+91 " prefix if present
      if (!phonePattern.test(phoneNumber)) {
        newErrors.phone = "Invalid phone number";
      }
    }

    // Bio length validation
    if (formData.Bio.length > 500) {
      newErrors.Bio = "Bio must be at most 500 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if(validateForm()) {
      setResumeData(() => {
        return {
          ...formData
        }
      })
      setFormStage(formStage + 1);
    }
  }

  return (
    <div className="min-h-screen bg-navy-600 p-6 md:p-12">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Let's Get Started</h1>
            <p className="text-gray-400">Fill in your personal Info!</p>
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              if (validateForm()) {
                console.log("Form submitted successfully", formData);
              }
            }}>
              {Object.keys(formData).map((field) => (
                <div key={field}>
                  {field === "Bio" ? (
                    <div>
                      <textarea
                        name={field}
                        placeholder="Write a short bio..."
                        value={formData[field]}
                        maxLength={500} // Restrict bio to 500 characters
                        onChange={(e) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            [field]: e.target.value,
                          }))
                        }
                        className="w-full p-3 h-32 rounded-md bg-white text-black placeholder-gray-500"
                      />
                      {errors[field] && (
                        <p className="text-red-500 text-sm">{errors[field]}</p>
                      )}
                    </div>
                  ) : (
                    <div>
                      <input
                        type={field === "dob" ? "date" : "text"}
                        name={field}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={
                          field === "phone"
                            ? formData.phone
                              ? `+91 ${formData.phone}`
                              : "+91 "
                            : formData[field]
                        }
                        onChange={(e) => {
                          if (field === "phone") {
                            let inputValue = e.target.value.replace(/\D/g, "");
                            if (inputValue.startsWith("91"))
                              inputValue = inputValue.slice(2);
                            setFormData((prevData) => ({
                              ...prevData,
                              phone: inputValue,
                            }));
                          } else {
                            setFormData((prevData) => ({
                              ...prevData,
                              [field]: e.target.value,
                            }));
                          }
                        }}
                        className="w-full p-3 rounded-md bg-white text-black placeholder-gray-500"
                      />
                      {errors[field] && (
                        <p className="text-red-500 text-sm">{errors[field]}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}

              <button
                type="button"
                className="px-6 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300 transition-colors"
                onClick={handleSubmit}
              >
                Next
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
