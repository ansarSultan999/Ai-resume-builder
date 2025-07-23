"use client"

import type { Education } from "@/types/resume"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"

interface EducationFormProps {
  data: Education[]
  onChange: (data: Education[]) => void
}

export function EducationForm({ data, onChange }: EducationFormProps) {
  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      gpa: "",
    }
    onChange([...data, newEducation])
  }

  const removeEducation = (id: string) => {
    onChange(data.filter((edu) => edu.id !== id))
  }

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange(data.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Education</h3>
        <Button onClick={addEducation} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Education
        </Button>
      </div>

      {data.map((education) => (
        <Card key={education.id}>
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base">Education #{data.indexOf(education) + 1}</CardTitle>
              <Button
                onClick={() => removeEducation(education.id)}
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
                <Label>Institution *</Label>
                <Input
                  value={education.institution}
                  onChange={(e) => updateEducation(education.id, "institution", e.target.value)}
                  placeholder="University Name"
                />
              </div>
              <div>
                <Label>Degree *</Label>
                <Input
                  value={education.degree}
                  onChange={(e) => updateEducation(education.id, "degree", e.target.value)}
                  placeholder="Bachelor of Science"
                />
              </div>
              <div>
                <Label>Field of Study *</Label>
                <Input
                  value={education.field}
                  onChange={(e) => updateEducation(education.id, "field", e.target.value)}
                  placeholder="Computer Science"
                />
              </div>
              <div>
                <Label>GPA (Optional)</Label>
                <Input
                  value={education.gpa}
                  onChange={(e) => updateEducation(education.id, "gpa", e.target.value)}
                  placeholder="3.8"
                />
              </div>
              <div>
                <Label>Start Year</Label>
                <Input
                  value={education.startDate}
                  onChange={(e) => updateEducation(education.id, "startDate", e.target.value)}
                  placeholder="2020"
                />
              </div>
              <div>
                <Label>End Year</Label>
                <Input
                  value={education.endDate}
                  onChange={(e) => updateEducation(education.id, "endDate", e.target.value)}
                  placeholder="2024"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
