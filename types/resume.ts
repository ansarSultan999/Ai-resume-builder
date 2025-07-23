export interface PersonalInfo {
  name: string
  email: string
  phone: string
  location?: string
  linkedin?: string
  website?: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  gpa?: string
}

export interface WorkExperience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  description: string[]
}

export interface Skill {
  id: string
  name: string
  category: "technical" | "soft" | "language"
  level?: "beginner" | "intermediate" | "advanced" | "expert"
}

export interface ResumeData {
  personalInfo: PersonalInfo
  summary: string
  education: Education[]
  workExperience: WorkExperience[]
  skills: Skill[]
}
