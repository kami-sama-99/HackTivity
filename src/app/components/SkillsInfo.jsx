"use client";

import { useState } from "react";

export default function SkillsInfo({ formStage, setFormStage, setResumeData }) {
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState(null);

  const handleAddSkill = () => {
    if (skill.trim() === "") {
      setError("Skill cannot be empty.");
      return;
    }
    if (skills.includes(skill)) {
      setError("Skill already added.");
      return;
    }
    setSkills([...skills, skill]);
    setSkill("");
    setError(null);
  };

  const handleRemoveSkill = (removedSkill) => {
    setSkills(skills.filter((s) => s !== removedSkill));
  };

  const handleSubmit = () => {
    if (skills.length === 0) {
      setError("Please add at least one skill.");
      return;
    }
    setResumeData((prevData) => {
      return {
        ...prevData,
        skills: skills
      }
    })
    setFormStage(formStage + 1);
  };

  return (
    <div className="min-h-screen bg-navy-600 p-6 md:p-12">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Add Your Skills</h1>
            <p className="text-gray-400">
              Enter your skills below and click add.
            </p>
            <div className="flex gap-2 mt-4">
              <input
                type="text"
                placeholder="Enter a skill"
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                className="w-full p-3 rounded-md bg-white text-black placeholder-gray-500"
              />
              <button
                className="px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300 transition-colors"
                onClick={handleAddSkill}
              >
                Add
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <div className="mt-4 mb-4">
              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {skills.map((s, index) => (
                    <div
                      key={index}
                      className="px-3 py-1 bg-gray-800 text-white rounded-full flex items-center"
                    >
                      <span>{s}</span>
                      <button
                        className="ml-2 text-red-400 hover:text-red-600"
                        onClick={() => handleRemoveSkill(s)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button
              className="px-6 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300 transition-colors"
              onClick={handleSubmit}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
