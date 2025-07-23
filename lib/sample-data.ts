import type { ResumeData } from "@/types/resume"

export const sampleResumeData: ResumeData = {
  personalInfo: {
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/sarahjohnson",
    website: "sarahjohnson.dev",
  },
  summary:
    "Experienced Software Engineer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering scalable applications and leading cross-functional teams to achieve business objectives.",
  education: [
    {
      id: "1",
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2016",
      endDate: "2020",
      gpa: "3.8",
    },
  ],
  workExperience: [
    {
      id: "1",
      company: "TechCorp Inc.",
      position: "Senior Software Engineer",
      startDate: "2022-01",
      endDate: "",
      current: true,
      description: [
        "Led development of microservices architecture serving 1M+ users",
        "Reduced application load time by 40% through performance optimization",
        "Mentored 3 junior developers and conducted code reviews",
        "Collaborated with product team to define technical requirements",
      ],
    },
    {
      id: "2",
      company: "StartupXYZ",
      position: "Full Stack Developer",
      startDate: "2020-06",
      endDate: "2021-12",
      current: false,
      description: [
        "Built responsive web applications using React and Node.js",
        "Implemented CI/CD pipelines reducing deployment time by 60%",
        "Designed and developed RESTful APIs for mobile applications",
      ],
    },
  ],
  skills: [
    { id: "1", name: "JavaScript", category: "technical", level: "expert" },
    { id: "2", name: "React", category: "technical", level: "expert" },
    { id: "3", name: "Node.js", category: "technical", level: "advanced" },
    { id: "4", name: "Python", category: "technical", level: "intermediate" },
    { id: "5", name: "AWS", category: "technical", level: "advanced" },
    { id: "6", name: "Leadership", category: "soft", level: "advanced" },
    { id: "7", name: "Communication", category: "soft", level: "expert" },
    { id: "8", name: "Problem Solving", category: "soft", level: "expert" },
  ],
}
