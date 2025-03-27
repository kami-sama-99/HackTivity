"use client";

import { useState } from "react";

export default function HackathonsAchievementsInfo({ formStage, setFormStage, setResumeData }) {
  const [hackathon, setHackathon] = useState({ name: "", year: "", position: "", teamSize: "" });
  const [hackathons, setHackathons] = useState([]);
  const [certification, setCertification] = useState({ name: "", issuer: "", year: "" });
  const [certifications, setCertifications] = useState([]);
  const [certificationData, setCertificationData] = useState({
    certifications: []
  })
  const [error, setError] = useState(null);

  const handleAddHackathon = () => {
    if (!hackathon.name.trim() || !hackathon.year.trim() || !hackathon.position.trim() || !hackathon.teamSize.trim()) {
      setError("All hackathon fields are required.");
      return;
    }
    setHackathons([...hackathons, hackathon]);
    setHackathon({ name: "", year: "", position: "", teamSize: "" });
    setError(null);
  };

  const handleRemoveHackathon = (index) => {
    setHackathons(hackathons.filter((_, i) => i !== index));
  };

  const handleAddCertification = () => {
    if (!certification.name.trim() || !certification.issuer.trim() || !certification.year.trim()) {
      setError("All certification fields are required.");
      return;
    }
    setCertifications([...certifications, certification]);
    setCertification({ name: "", issuer: "", year: "" });
    setError(null);
  };

  const handleRemoveCertification = (index) => {
    setCertifications(certifications.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (hackathons.length === 0 && certifications.length === 0) {
      setError("Please add at least one hackathon or certification.");
      return;
    }
  
    setResumeData((prevData) => ({
      ...prevData,
      hackathons: hackathons,
      certifications: certifications,
    }));
  
    setFormStage(formStage + 1);
  };

  return (
    <div className="min-h-screen bg-navy-600 p-6 md:p-12">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Hackathons & Achievements</h1>
            <p className="text-gray-400">Enter your hackathons and certifications below.</p>

            <h2 className="text-xl font-bold text-white">Hackathons Participated</h2>
            <div className="flex gap-2 mt-4">
              <input type="text" placeholder="Name" value={hackathon.name} onChange={(e) => setHackathon({ ...hackathon, name: e.target.value })} className="w-full p-3 rounded-md bg-white text-black placeholder-gray-500" />
              <input type="text" placeholder="Year" value={hackathon.year} onChange={(e) => setHackathon({ ...hackathon, year: e.target.value })} className="w-full p-3 rounded-md bg-white text-black placeholder-gray-500" />
              <input type="text" placeholder="Position" value={hackathon.position} onChange={(e) => setHackathon({ ...hackathon, position: e.target.value })} className="w-full p-3 rounded-md bg-white text-black placeholder-gray-500" />
              <input type="text" placeholder="Team Size" value={hackathon.teamSize} onChange={(e) => setHackathon({ ...hackathon, teamSize: e.target.value })} className="w-full p-3 rounded-md bg-white text-black placeholder-gray-500" />
              <button className="px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300 transition-colors" onClick={handleAddHackathon}>Add</button>
            </div>
            
            {hackathons.length > 0 && (
              <div className="mt-4 mb-4 flex flex-wrap gap-2">
                {hackathons.map((h, index) => (
                  <div key={index} className="px-3 py-1 bg-gray-800 text-white rounded-full flex items-center">
                    <span>{h.name} ({h.year}) - {h.position}, Team: {h.teamSize}</span>
                    <button className="ml-2 text-red-400 hover:text-red-600" onClick={() => handleRemoveHackathon(index)}>×</button>
                  </div>
                ))}
              </div>
            )}

            <h2 className="text-xl font-bold text-white">Certifications</h2>
            <div className="flex gap-2 mt-4">
              <input type="text" placeholder="Name" value={certification.name} onChange={(e) => setCertification({ ...certification, name: e.target.value })} className="w-full p-3 rounded-md bg-white text-black placeholder-gray-500" />
              <input type="text" placeholder="Issuer" value={certification.issuer} onChange={(e) => setCertification({ ...certification, issuer: e.target.value })} className="w-full p-3 rounded-md bg-white text-black placeholder-gray-500" />
              <input type="text" placeholder="Year" value={certification.year} onChange={(e) => setCertification({ ...certification, year: e.target.value })} className="w-full p-3 rounded-md bg-white text-black placeholder-gray-500" />
              <button className="px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300 transition-colors" onClick={handleAddCertification}>Add</button>
            </div>

            {certifications.length > 0 && (
              <div className="mt-4 mb-4 flex flex-wrap gap-2">
                {certifications.map((c, index) => (
                  <div key={index} className="px-3 py-1 bg-gray-800 text-white rounded-full flex items-center">
                    <span>{c.name} - {c.issuer} ({c.year})</span>
                    <button className="ml-2 text-red-400 hover:text-red-600" onClick={() => handleRemoveCertification(index)}>×</button>
                  </div>
                ))}
              </div>
            )}

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <button className="px-6 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300 transition-colors" onClick={handleSubmit}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}