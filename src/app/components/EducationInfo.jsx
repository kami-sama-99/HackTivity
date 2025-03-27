"use client"

import { useState } from "react";

export default function EducationInfo({ formStage, setFormStage, setResumeData }) {
    const [formData, setFormData] = useState({
        degree: "",
        university: "",
        startYear: "",
        endYear: "",
        gpa: ""
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let newErrors = {};
    
        // Check if any field is empty
        if (!formData.degree.trim()) newErrors.degree = "Degree is required.";
        if (!formData.university.trim()) newErrors.university = "University is required.";
        if (!formData.startYear.trim()) newErrors.startYear = "Start year is required.";
        if (!formData.endYear.trim()) newErrors.endYear = "End year is required.";
        if (!formData.gpa.trim()) newErrors.gpa = "GPA is required.";
    
        // Validate start and end year
        if (formData.startYear && formData.endYear) {
            const start = parseInt(formData.startYear, 10);
            const end = parseInt(formData.endYear, 10);
            if (isNaN(start) || isNaN(end)) {
                newErrors.year = "Start and end years must be valid numbers.";
            } else if (start > end) {
                newErrors.year = "Start year cannot be after end year.";
            }
        }
    
        // Validate GPA (assuming GPA is on a 0-10 scale)
        const gpa = parseFloat(formData.gpa);
        if (!isNaN(gpa) && (gpa < 0 || gpa > 10)) {
            newErrors.gpa = "GPA must be between 0 and 10.";
        }
    
        // Set errors or clear them
        setErrors(Object.keys(newErrors).length > 0 ? newErrors : null);
    
        // Return whether form is valid
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
      if(validateForm()) {
        setResumeData((...prevData) => {
          return {
            ...prevData,
            education: formData
          }
        })
        setFormStage(formStage + 1);
      }
    }

    return <div className="min-h-screen bg-navy-600 p-6 md:p-12">
    <div className="max-w-screen-xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-white">Tell us more!</h1>
          <p className="text-gray-400">Fill in your educational Info!</p>
          <form className="space-y-4" onSubmit={(e) => {
            e.preventDefault();
            if (validateForm()) {
              console.log("Form submitted successfully", formData);
            }
          }}>
            {Object.keys(formData).map((field) => (
              <div key={field}>
                  <div>
                    <input
                      type="text"
                      name={field}
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      value={
                        formData[field]
                      }
                      onChange={(e) => {
                        setFormData((prevData) => ({
                            ...prevData,
                            [field]: e.target.value,
                        }))
                      }}
                      className="w-full p-3 rounded-md bg-white text-black placeholder-gray-500"
                    />
                    {errors[field] && (
                      <p className="text-red-500 text-sm">{errors[field]}</p>
                    )}
                  </div>
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
}