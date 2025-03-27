import { jsPDF } from "jspdf";

export default function ResumeFile({ resumeData }) {
  const generatePDF = () => {
    if (!resumeData) return;

    // Create PDF
    const doc = new jsPDF();
    let y = 20;
    
    // Add name as header
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text(resumeData[0].name || "Resume", doc.internal.pageSize.width / 2, y, { align: "center" });
    y += 5;
    
    // Add horizontal line
    doc.setDrawColor(200, 200, 200);
    doc.line(20, y, doc.internal.pageSize.width - 20, y);
    y += 10;

    const addSection = (title) => {
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(title.toUpperCase(), 20, y);
      y += 5;
      
      // Add underline for section
      doc.setDrawColor(0, 0, 0);
      doc.line(20, y, doc.internal.pageSize.width - 20, y);
      y += 8;
    };

    // 1. Personal Information
    addSection("Personal Information");
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    
    if (resumeData[0].email) {
      doc.text(`Email: ${resumeData[0].email}`, 20, y);
      y += 6;
    }
    
    if (resumeData[0].phone) {
      doc.text(`Phone: ${resumeData[0].phone}`, 20, y);
      y += 6;
    }
    
    if (resumeData[0].location) {
      doc.text(`Location: ${resumeData[0].location}`, 20, y);
      y += 6;
    }
    
    // Add social links with clickable URLs
    if (resumeData[0].github) {
      doc.setTextColor(0, 0, 255);
      doc.textWithLink(`GitHub: ${resumeData[0].github}`, 20, y, { url: resumeData.github });
      y += 6;
    }
    
    if (resumeData[0].linkedin) {
      doc.setTextColor(0, 0, 255);
      doc.textWithLink(`LinkedIn: ${resumeData[0].linkedin}`, 20, y, { url: resumeData[0].linkedin });
      y += 6;
    }
    
    if (resumeData[0].leetcode) {
      doc.setTextColor(0, 0, 255);
      doc.textWithLink(`LeetCode: ${resumeData[0].leetcode}`, 20, y, { url: resumeData[0].leetcode });
      y += 6;
    }
    
    doc.setTextColor(0, 0, 0);
    y += 5;

    // 2. Work Experience (if present)
    if (resumeData.workxp?.length) {
      addSection("Work Experience");
      
      resumeData.workxp.forEach((job) => {
        // Job title and company
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(`${job.jobTitle} at ${job.company}`, 20, y);
        
        // Date on the right
        doc.setFont("helvetica", "normal");
        const dateText = `${job.startYear || ""} - ${job.endYear || "Present"}`;
        doc.text(dateText, doc.internal.pageSize.width - 20, y, { align: "right" });
        y += 6;
        
        // Responsibilities as bullet points
        if (job.responsibilities) {
          doc.setFontSize(10);
          const respLines = doc.splitTextToSize(`• ${job.responsibilities}`, doc.internal.pageSize.width - 45);
          doc.text(respLines, 25, y);
          y += respLines.length * 5;
        }
        
        y += 5; // Add space after each job
      });
    }

    // 3. Education
    if (resumeData.education) {
      addSection("Education");
      
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(`${resumeData.education.degree}`, 20, y);
      
      // University and date on the right
      doc.setFont("helvetica", "normal");
      const eduDateText = `${resumeData.education.startYear || ""} - ${resumeData.education.endYear || "Expected"}`;
      doc.text(eduDateText, doc.internal.pageSize.width - 20, y, { align: "right" });
      y += 6;
      
      doc.text(`University: ${resumeData.education.university}`, 20, y);
      y += 6;
      
      // GPA if available
      if (resumeData.education.gpa) {
        doc.text(`GPA: ${resumeData.education.gpa}`, 20, y);
        y += 6;
      }
      
      y += 5;
    }

    // 4. Skills
    if (resumeData.skills?.length) {
      addSection("Skills");
      
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      
      const skillsText = resumeData.skills.join(", ");
      const skillLines = doc.splitTextToSize(skillsText, doc.internal.pageSize.width - 40);
      doc.text(skillLines, 20, y);
      y += skillLines.length * 6;
      y += 5;
    }

    //5. Hackathons and Certifications
    if (resumeData.hackathons || resumeData.certifications) {
      addSection("Hackathons and Certifications");
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      
      if (resumeData.hackathons?.length) {
        resumeData.hackathons.forEach((hackathon) => {
          doc.text(`Hackathon: ${hackathon.name}`, 20, y);
          y += 6;
        });
      }
      
      if (resumeData.certifications?.length) {
        resumeData.certifications.forEach((cert) => {
          doc.text(`Certification: ${cert.name}`, 20, y);
          y += 6;
        });
      }
      y += 5;
    }

    // 6. Projects (only first two)
    if (resumeData.projects?.length) {
      addSection("Projects");
      
      // Limit to first two projects
      const projectsToShow = resumeData.projects.slice(0, 2);
      
      projectsToShow.forEach((project, index) => {
        // Project name
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(`${index + 1}. ${project.name}`, 20, y);
        y += 6;
        
        // Role if available
        if (project.role) {
          doc.setFontSize(11);
          doc.setFont("helvetica", "normal");
          doc.text(`Role: ${project.role}`, 25, y);
          y += 6;
        }
        
        // Tech stack
        if (project.techStack) {
          doc.setFontSize(11);
          doc.setFont("helvetica", "normal");
          doc.text(`Tech Stack: ${project.techStack}`, 25, y);
          y += 6;
        }
        
        // Key features
        if (project.keyFeatures) {
          doc.setFontSize(11);
          doc.setFont("helvetica", "normal");
          const featureLines = doc.splitTextToSize(`Key Features: ${project.keyFeatures}`, doc.internal.pageSize.width - 45);
          doc.text(featureLines, 25, y);
          y += featureLines.length * 5;
        }
        
        // Repository link (clickable)
        if (project.repository) {
          doc.setFontSize(11);
          doc.setTextColor(0, 0, 255);
          doc.textWithLink(`Repository: ${project.repository}`, 25, y, { url: project.repository });
          doc.setTextColor(0, 0, 0);
          y += 6;
        }
        
        // Live demo link (clickable)
        if (project.liveDemo) {
          doc.setFontSize(11);
          doc.setTextColor(0, 0, 255);
          doc.textWithLink(`Live Demo: ${project.liveDemo}`, 25, y, { url: project.liveDemo });
          doc.setTextColor(0, 0, 0);
          y += 6;
        }
        
        y += 5; // Add space after each project
      });
      
      // If there are more projects, add a note
      if (resumeData.projects.length > 2) {
        doc.setFontSize(10);
        doc.setFont("helvetica", "italic");
        doc.text(`* ${resumeData.projects.length - 2} more projects not shown`, 20, y);
        y += 6;
      }
    }

    doc.save("Resume.pdf");
  };

  return (
    <div className="flex flex-col items-center text-white text-center pt-20 px-6">
    <h1 className="text-5xl md:font-bold mb-8 max-w-lg">
        Download Your Resume Instantly
    </h1>
    <p className="text-2xl md:text-3xl font-semibold max-w-lg">
        Click the button below to generate your resume in ATS format.
    </p>

    <div className="mt-6">
        <button
            onClick={generatePDF}
            className="px-6 py-3 text-lg bg-blue-500 rounded-lg hover:bg-blue-700 transition duration-300"
        >
            Download Resume
        </button>
    </div>
</div>
  );
}
