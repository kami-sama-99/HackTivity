import { jsPDF } from "jspdf";

export default function ResumeFile({ resumeData }) {
  const generatePDF = () => {
    if (!resumeData) return;

    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    let y = 20;

    const checkPageBreak = (extraSpace = 10) => {
      if (y + extraSpace > pageHeight - 20) {
        doc.addPage();
        y = 20;
      }
    };

    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text(resumeData[0]?.name || "Resume", doc.internal.pageSize.width / 2, y, { align: "center" });
    y += 5;

    doc.setDrawColor(200, 200, 200);
    doc.line(20, y, doc.internal.pageSize.width - 20, y);
    y += 10;

    const addSection = (title) => {
      checkPageBreak(20);
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(title.toUpperCase(), 20, y);
      y += 5;

      doc.setDrawColor(0, 0, 0);
      doc.line(20, y, doc.internal.pageSize.width - 20, y);
      y += 8;
    };

    addSection("Personal Information");
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");

    ["email", "phone", "location"].forEach((field) => {
      if (resumeData[0][field]) {
        checkPageBreak();
        doc.text(`${field.charAt(0).toUpperCase() + field.slice(1)}: ${resumeData[0][field]}`, 20, y);
        y += 6;
      }
    });

    ["github", "linkedin", "leetcode"].forEach((field) => {
      if (resumeData[0][field]) {
        checkPageBreak();
        doc.setTextColor(0, 0, 255);
        doc.textWithLink(`${field.charAt(0).toUpperCase() + field.slice(1)}: ${resumeData[0][field]}`, 20, y, { url: resumeData[0][field] });
        y += 6;
      }
    });

    doc.setTextColor(0, 0, 0);
    y += 5;

    if (resumeData.workxp?.length) {
      addSection("Work Experience");
      resumeData.workxp.forEach((job) => {
        checkPageBreak(15);
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(`${job.jobTitle} at ${job.company}`, 20, y);

        doc.setFont("helvetica", "normal");
        const dateText = `${job.startYear || ""} - ${job.endYear || "Present"}`;
        doc.text(dateText, doc.internal.pageSize.width - 20, y, { align: "right" });
        y += 6;

        if (job.responsibilities) {
          checkPageBreak();
          doc.setFontSize(10);
          const respLines = doc.splitTextToSize(`• ${job.responsibilities}`, doc.internal.pageSize.width - 45);
          doc.text(respLines, 25, y);
          y += respLines.length * 5;
        }
        y += 5;
      });
    }

    if (resumeData.education) {
      addSection("Education");
      checkPageBreak(15);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(`${resumeData.education.degree}`, 20, y);

      doc.setFont("helvetica", "normal");
      const eduDateText = `${resumeData.education.startYear || ""} - ${resumeData.education.endYear || "Expected"}`;
      doc.text(eduDateText, doc.internal.pageSize.width - 20, y, { align: "right" });
      y += 6;

      doc.text(`University: ${resumeData.education.university}`, 20, y);
      y += 6;

      if (resumeData.education.gpa) {
        doc.text(`GPA: ${resumeData.education.gpa}`, 20, y);
        y += 6;
      }
      y += 5;
    }

    if (resumeData.skills?.length) {
      addSection("Skills");
      checkPageBreak();
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      const skillLines = doc.splitTextToSize(resumeData.skills.join(", "), doc.internal.pageSize.width - 40);
      doc.text(skillLines, 20, y);
      y += skillLines.length * 6;
      y += 5;
    }

    if (resumeData.hackathons || resumeData.certifications) {
      addSection("Hackathons and Certifications");
      checkPageBreak();
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");

      if (resumeData.hackathons?.length) {
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("Hackathons", 20, y);
        y += 6;

        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");

        resumeData.hackathons.forEach((hackathon) => {
          checkPageBreak(15);
          doc.text(`• ${hackathon.name}`, 20, y);
          y += 6;
          doc.text(`  Position: ${hackathon.position}`, 25, y);
          y += 6;
          doc.text(`  Team Size: ${hackathon.teamSize}`, 25, y);
          y += 6;
          doc.text(`  Year: ${hackathon.year}`, 25, y);
          y += 8; // Add space between hackathons
        });

        // Add a line separator
        doc.setDrawColor(200, 200, 200);
        doc.line(20, y, doc.internal.pageSize.width - 20, y);
        y += 10;
      }

      // Certifications
      if (resumeData.certifications?.length) {
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("Certifications", 20, y);
        y += 6;

        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");

        resumeData.certifications.forEach((cert) => {
          checkPageBreak(12);
          doc.text(`• ${cert.name}`, 20, y);
          y += 6;
          doc.text(`  Issuer: ${cert.issuer}`, 25, y);
          y += 6;
          doc.text(`  Year: ${cert.year}`, 25, y);
          y += 8; // Add space between certifications
        });
      }

      y += 5;
    }

    if (resumeData.projects?.length) {
      addSection("Projects");
      const projectsToShow = resumeData.projects.slice(0, 2);

      projectsToShow.forEach((project, index) => {
        checkPageBreak(20);
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(`${index + 1}. ${project.name}`, 20, y);
        y += 6;

        ["role", "techStack"].forEach((field) => {
          if (project[field]) {
            checkPageBreak();
            doc.setFontSize(11);
            doc.setFont("helvetica", "normal");
            doc.text(`${field.charAt(0).toUpperCase() + field.slice(1)}: ${project[field]}`, 25, y);
            y += 6;
          }
        });

        if (project.keyFeatures) {
          checkPageBreak();
          doc.setFontSize(11);
          const featureLines = doc.splitTextToSize(`Key Features: ${project.keyFeatures}`, doc.internal.pageSize.width - 45);
          doc.text(featureLines, 25, y);
          y += featureLines.length * 5;
        }

        ["repository", "liveDemo"].forEach((field) => {
          if (project[field]) {
            checkPageBreak();
            doc.setFontSize(11);
            doc.setTextColor(0, 0, 255);
            doc.textWithLink(`${field.charAt(0).toUpperCase() + field.slice(1)}: ${project[field]}`, 25, y, { url: project[field] });
            doc.setTextColor(0, 0, 0);
            y += 6;
          }
        });

        y += 5;
      });

      if (resumeData.projects.length > 2) {
        checkPageBreak();
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
      <h1 className="text-5xl md:font-bold mb-8 max-w-lg">Download Your Resume Instantly</h1>
      <p className="text-2xl md:text-3xl font-semibold max-w-lg">
        Click the button below to generate your resume in ATS format.
      </p>
      <div className="mt-6">
        <button onClick={generatePDF} className="px-6 py-3 text-lg bg-blue-500 rounded-lg hover:bg-blue-700 transition duration-300">
          Download Resume
        </button>
      </div>
    </div>
  );
}
