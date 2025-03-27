"use client";

import { useState } from "react";
import { db } from "@/firebase/firebase";
import { doc, setDoc } from "firebase/firestore";

export default function ProjectsInfo({ userId, formStage, setFormStage, setResumeData, resumeData }) {
  const [project, setProject] = useState({
    name: "",
    techStack: "",
    role: "",
    liveDemo: "",
    repository: "",
    keyFeatures: "",
  });
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  const handleAddProject = () => {
    if (!project.name.trim() || !project.techStack.trim() || !project.role.trim()) {
      setError("Project name, tech stack, and role are required.");
      return;
    }
    if (projects.some((p) => p.name === project.name)) {
      setError("Project already added.");
      return;
    }
    setProjects([...projects, project]);
    setProject({ name: "", techStack: "", role: "", liveDemo: "", repository: "", keyFeatures: "" });
    setError(null);
  };

  const handleRemoveProject = (removedProject) => {
    setProjects(projects.filter((p) => p !== removedProject));
  };

  const handleSubmit = async () => {
    if (projects.length === 0) {
      setError("Please add at least one project.");
      return;
    }
  
    setResumeData((prevData) => {
      return {
        ...prevData,
        projects: projects
      }
    })

    setFormStage(formStage + 1);
  
    try {
      // Reference the Firestore document (use the user's UID or another identifier)
      const userDocRef = doc(db, "Resume", userId); // Replace "userId" with the actual user ID
  
      // Save resume data to Firestore
      await setDoc(userDocRef, resumeData, { merge: true });
  
      console.log("Resume data successfully stored in Firestore!");
    } catch (error) {
      console.error("Error storing resume data:", error);
      setError("Failed to save resume data. Please try again.");
    }
    console.log("Index: " + resumeData[0]);
  };
  

  return (
    <div className="min-h-screen bg-navy-600 p-6 md:p-12">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Add Your Projects</h1>
            <p className="text-gray-400">Enter your project details below.</p>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Project Name"
                value={project.name}
                onChange={(e) => setProject({ ...project, name: e.target.value })}
                className="w-full p-3 rounded-md bg-white text-black placeholder-gray-500"
              />
              <input
                type="text"
                placeholder="Tech Stack Used"
                value={project.techStack}
                onChange={(e) => setProject({ ...project, techStack: e.target.value })}
                className="w-full p-3 rounded-md bg-white text-black placeholder-gray-500"
              />
              <input
                type="text"
                placeholder="Role in Project (Solo/Team)"
                value={project.role}
                onChange={(e) => setProject({ ...project, role: e.target.value })}
                className="w-full p-3 rounded-md bg-white text-black placeholder-gray-500"
              />
              <input
                type="url"
                placeholder="Live Demo Link (Optional)"
                value={project.liveDemo}
                onChange={(e) => setProject({ ...project, liveDemo: e.target.value })}
                className="w-full p-3 rounded-md bg-white text-black placeholder-gray-500"
              />
              <input
                type="url"
                placeholder="Repository Link (Optional)"
                value={project.repository}
                onChange={(e) => setProject({ ...project, repository: e.target.value })}
                className="w-full p-3 rounded-md bg-white text-black placeholder-gray-500"
              />
              <textarea
                placeholder="Key Features (Short Bullet Points)"
                value={project.keyFeatures}
                onChange={(e) => setProject({ ...project, keyFeatures: e.target.value })}
                className="w-full p-3 rounded-md bg-white text-black placeholder-gray-500"
              />
              <button
                className="px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300 transition-colors"
                onClick={handleAddProject}
              >
                Add Project
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <div className="mt-4 mb-4">
              {projects.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {projects.map((p, index) => (
                    <div
                      key={index}
                      className="p-3 bg-gray-800 text-white rounded-lg w-full flex justify-between items-center"
                    >
                      <span>{p.name}</span>
                      <button
                        className="text-red-400 hover:text-red-600"
                        onClick={() => handleRemoveProject(p)}
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
              Generate Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}