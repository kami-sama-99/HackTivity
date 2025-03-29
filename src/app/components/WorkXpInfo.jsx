"use client";

import { useState } from "react";

export default function WorkXpInfo({ formStage, setFormStage, setResumeData }) {
  const [formData, setFormData] = useState({
    company: "",
    jobTitle: "",
    startYear: "",
    endYear: "",
    responsibilities: "",
  });

  const [workExperiences, setWorkExperiences] = useState([]);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    if (!formData.company.trim()) newErrors.company = "Company is required.";
    if (!formData.jobTitle.trim())
      newErrors.jobTitle = "Job Title is required.";
    if (!formData.startYear.trim())
      newErrors.startYear = "Start year is required.";
    if (!formData.endYear.trim()) newErrors.endYear = "End year is required.";
    if (!formData.responsibilities.trim())
      newErrors.responsibilities = "Responsibilities are required.";

    if (formData.startYear && formData.endYear) {
      const start = parseInt(formData.startYear, 10);
      const end = parseInt(formData.endYear, 10);
      if (isNaN(start) || isNaN(end)) {
        newErrors.year = "Start and end years must be valid numbers.";
      } else if (start > end) {
        newErrors.year = "Start year cannot be after end year.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddWorkXp = () => {
    if (validateForm()) {
      setWorkExperiences([...workExperiences, formData]);
      setFormData({
        company: "",
        jobTitle: "",
        startYear: "",
        endYear: "",
        responsibilities: "",
      });
    }
  };

  const handleRemoveWorkXp = (index) => {
    setWorkExperiences(workExperiences.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (workExperiences.length > 0) {
      setResumeData((prevData) => ({
        ...prevData,
        workxp: workExperiences,
      }));
      setFormStage(formStage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-navy-600 p-6 md:p-12">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">
              We haven't got enough!
            </h1>
            <p className="text-gray-400">Fill in your work experience!</p>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              {Object.keys(formData).map((field) => (
                <div key={field}>
                  <input
                    type={field === "responsibilities" ? "textarea" : "text"}
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={formData[field]}
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        [field]: e.target.value,
                      }))
                    }
                    className="w-full p-3 rounded-md bg-white text-black placeholder-gray-500"
                  />
                  {errors[field] && (
                    <p className="text-red-500 text-sm">{errors[field]}</p>
                  )}
                </div>
              ))}
              <div className="mt-6 flex gap-2">
                <button
                  type="button"
                  className="px-6 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300 transition-colors"
                  onClick={handleAddWorkXp}
                >
                  Add Work Experience
                </button>
              </div>
            </form>
          </div>
        </div>
        {workExperiences.length > 0 && (
          <div className="mt-4 mb-4 flex flex-wrap gap-2">
            {workExperiences.map((xp, index) => (
              <div
                key={index}
                className="px-3 py-1 bg-gray-800 text-white rounded-full flex items-center"
              >
                <span>
                  {xp.company} - {xp.jobTitle} ({xp.startYear} - {xp.endYear})
                </span>
                <button
                  className="ml-2 text-red-400 hover:text-red-600"
                  onClick={() => handleRemoveWorkXp(index)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="mt-6 flex gap-2">
          <button
            className="px-6 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300 transition-colors"
            onClick={() => {
              setFormData({
                company: "",
                jobTitle: "",
                startYear: "",
                endYear: "",
                responsibilities: "",
              });
              setFormStage(formStage + 1);
            }}
          >
            Skip
          </button>
          <button
            className="px-6 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300 transition-colors"
            onClick={handleSubmit}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
