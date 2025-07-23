"use client"

import { useState } from "react"
import type { ResumeData } from "@/types/resume"
import { sampleResumeData } from "@/lib/sample-data"
import { PersonalInfoForm } from "@/components/forms/personal-info-form"
import { SummaryForm } from "@/components/forms/summary-form"
import { WorkExperienceForm } from "@/components/forms/work-experience-form"
import { EducationForm } from "@/components/forms/education-form"
import { SkillsForm } from "@/components/forms/skills-form"
import { ResumePreview } from "@/components/resume-preview"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, FileText, Sparkles } from "lucide-react"
import { exportToPDF } from "@/lib/pdf-export"

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>(sampleResumeData)
  const [activeTab, setActiveTab] = useState("personal")

  const updatePersonalInfo = (personalInfo: ResumeData["personalInfo"]) => {
    setResumeData((prev) => ({ ...prev, personalInfo }))
  }

  const updateSummary = (summary: string) => {
    setResumeData((prev) => ({ ...prev, summary }))
  }

  const updateWorkExperience = (workExperience: ResumeData["workExperience"]) => {
    setResumeData((prev) => ({ ...prev, workExperience }))
  }

  const updateEducation = (education: ResumeData["education"]) => {
    setResumeData((prev) => ({ ...prev, education }))
  }

  const updateSkills = (skills: ResumeData["skills"]) => {
    setResumeData((prev) => ({ ...prev, skills }))
  }

  const handleExportPDF = () => {
    exportToPDF("resume-preview", `${resumeData.personalInfo.name || "resume"}.pdf`)
  }

  const loadSampleData = () => {
    setResumeData(sampleResumeData)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AI Resume Builder</h1>
                <p className="text-sm text-gray-600">Create professional resumes with AI assistance</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button onClick={loadSampleData} variant="outline" size="sm">
                <Sparkles className="w-4 h-4 mr-2" />
                Load Sample
              </Button>
              <Button onClick={handleExportPDF} className="bg-blue-600 hover:bg-blue-700">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="personal" className="text-xs">
                      Personal
                    </TabsTrigger>
                    <TabsTrigger value="summary" className="text-xs">
                      Summary
                    </TabsTrigger>
                    <TabsTrigger value="experience" className="text-xs">
                      Experience
                    </TabsTrigger>
                    <TabsTrigger value="education" className="text-xs">
                      Education
                    </TabsTrigger>
                    <TabsTrigger value="skills" className="text-xs">
                      Skills
                    </TabsTrigger>
                  </TabsList>

                  <div className="mt-6">
                    <TabsContent value="personal" className="space-y-4">
                      <PersonalInfoForm data={resumeData.personalInfo} onChange={updatePersonalInfo} />
                    </TabsContent>

                    <TabsContent value="summary" className="space-y-4">
                      <SummaryForm
                        summary={resumeData.summary}
                        onChange={updateSummary}
                        personalInfo={resumeData.personalInfo}
                        skills={resumeData.skills}
                      />
                    </TabsContent>

                    <TabsContent value="experience" className="space-y-4">
                      <WorkExperienceForm data={resumeData.workExperience} onChange={updateWorkExperience} />
                    </TabsContent>

                    <TabsContent value="education" className="space-y-4">
                      <EducationForm data={resumeData.education} onChange={updateEducation} />
                    </TabsContent>

                    <TabsContent value="skills" className="space-y-4">
                      <SkillsForm data={resumeData.skills} onChange={updateSkills} />
                    </TabsContent>
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-8">
            <Card>
              <CardContent className="p-0">
                <div className="bg-gray-100 px-4 py-3 border-b">
                  <h2 className="text-lg font-semibold text-gray-900">Live Preview</h2>
                  <p className="text-sm text-gray-600">Your resume updates in real-time</p>
                </div>
                <div className="max-h-[800px] overflow-y-auto">
                  <ResumePreview data={resumeData} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
