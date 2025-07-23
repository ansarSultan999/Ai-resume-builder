"use client"

import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { generateProfessionalSummary } from "@/lib/ai-service"
import { useState } from "react"
import type { PersonalInfo, Skill } from "@/types/resume"

interface SummaryFormProps {
  summary: string
  onChange: (summary: string) => void
  personalInfo: PersonalInfo
  skills: Skill[]
}

export function SummaryForm({ summary, onChange, personalInfo, skills }: SummaryFormProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const generateAISummary = async () => {
    if (!personalInfo.name) {
      alert("Please fill in your name first")
      return
    }

    setIsGenerating(true)
    try {
      const topSkills = skills.slice(0, 5).map((skill) => skill.name)
      const generatedSummary = await generateProfessionalSummary(
        personalInfo.name,
        "Professional", // You could make this dynamic based on work experience
        "5", // You could calculate this from work experience
        topSkills,
      )
      onChange(generatedSummary)
    } catch (error) {
      console.error("Error generating summary:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Professional Summary</h3>
        <Button onClick={generateAISummary} disabled={isGenerating} variant="outline" size="sm">
          <Sparkles className="w-4 h-4 mr-2" />
          {isGenerating ? "Generating..." : "AI Generate"}
        </Button>
      </div>

      <div>
        <Label htmlFor="summary">Summary</Label>
        <Textarea
          id="summary"
          value={summary}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write a compelling professional summary that highlights your key achievements, skills, and career objectives..."
          className="min-h-[120px]"
        />
        <p className="text-sm text-gray-500 mt-1">
          2-3 sentences that showcase your value proposition and key qualifications.
        </p>
      </div>
    </div>
  )
}
