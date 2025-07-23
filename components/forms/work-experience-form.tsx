"use client"

import type { WorkExperience } from "@/types/resume"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, Sparkles } from "lucide-react"
import { generateWorkExperienceBullets } from "@/lib/ai-service"
import { useState } from "react"

interface WorkExperienceFormProps {
  data: WorkExperience[]
  onChange: (data: WorkExperience[]) => void
}

export function WorkExperienceForm({ data, onChange }: WorkExperienceFormProps) {
  const [generatingFor, setGeneratingFor] = useState<string | null>(null)

  const addExperience = () => {
    const newExperience: WorkExperience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: [""],
    }
    onChange([...data, newExperience])
  }

  const removeExperience = (id: string) => {
    onChange(data.filter((exp) => exp.id !== id))
  }

  const updateExperience = (id: string, field: keyof WorkExperience, value: any) => {
    onChange(data.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)))
  }

  const updateDescription = (id: string, index: number, value: string) => {
    onChange(
      data.map((exp) =>
        exp.id === id ? { ...exp, description: exp.description.map((desc, i) => (i === index ? value : desc)) } : exp,
      ),
    )
  }

  const addDescriptionPoint = (id: string) => {
    onChange(data.map((exp) => (exp.id === id ? { ...exp, description: [...exp.description, ""] } : exp)))
  }

  const removeDescriptionPoint = (id: string, index: number) => {
    onChange(
      data.map((exp) => (exp.id === id ? { ...exp, description: exp.description.filter((_, i) => i !== index) } : exp)),
    )
  }

  const generateAIBullets = async (experience: WorkExperience) => {
    if (!experience.position || !experience.company) {
      alert("Please fill in position and company first")
      return
    }

    setGeneratingFor(experience.id)
    try {
      const bullets = await generateWorkExperienceBullets(experience.position, experience.company)
      updateExperience(experience.id, "description", bullets)
    } catch (error) {
      console.error("Error generating bullets:", error)
    } finally {
      setGeneratingFor(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Work Experience</h3>
        <Button onClick={addExperience} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </div>

      {data.map((experience) => (
        <Card key={experience.id}>
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base">Experience #{data.indexOf(experience) + 1}</CardTitle>
              <Button
                onClick={() => removeExperience(experience.id)}
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Company *</Label>
                <Input
                  value={experience.company}
                  onChange={(e) => updateExperience(experience.id, "company", e.target.value)}
                  placeholder="Company Name"
                />
              </div>
              <div>
                <Label>Position *</Label>
                <Input
                  value={experience.position}
                  onChange={(e) => updateExperience(experience.id, "position", e.target.value)}
                  placeholder="Job Title"
                />
              </div>
              <div>
                <Label>Start Date</Label>
                <Input
                  type="month"
                  value={experience.startDate}
                  onChange={(e) => updateExperience(experience.id, "startDate", e.target.value)}
                />
              </div>
              <div>
                <Label>End Date</Label>
                <Input
                  type="month"
                  value={experience.endDate}
                  onChange={(e) => updateExperience(experience.id, "endDate", e.target.value)}
                  disabled={experience.current}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id={`current-${experience.id}`}
                checked={experience.current}
                onCheckedChange={(checked) => {
                  updateExperience(experience.id, "current", checked)
                  if (checked) {
                    updateExperience(experience.id, "endDate", "")
                  }
                }}
              />
              <Label htmlFor={`current-${experience.id}`}>Currently working here</Label>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <Label>Job Description</Label>
                <Button
                  onClick={() => generateAIBullets(experience)}
                  disabled={generatingFor === experience.id}
                  variant="outline"
                  size="sm"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  {generatingFor === experience.id ? "Generating..." : "AI Generate"}
                </Button>
              </div>

              {experience.description.map((desc, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Textarea
                    value={desc}
                    onChange={(e) => updateDescription(experience.id, index, e.target.value)}
                    placeholder="• Describe your achievements and responsibilities..."
                    className="min-h-[60px]"
                  />
                  <Button
                    onClick={() => removeDescriptionPoint(experience.id, index)}
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}

              <Button onClick={() => addDescriptionPoint(experience.id)} variant="ghost" size="sm" className="mt-2">
                <Plus className="w-4 h-4 mr-2" />
                Add Point
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
