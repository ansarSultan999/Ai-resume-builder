"use client"

import type { Skill } from "@/types/resume"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, X, Sparkles } from "lucide-react"
import { generateSkillsSuggestions } from "@/lib/ai-service"
import { useState } from "react"

interface SkillsFormProps {
  data: Skill[]
  onChange: (data: Skill[]) => void
}

export function SkillsForm({ data, onChange }: SkillsFormProps) {
  const [newSkill, setNewSkill] = useState("")
  const [newSkillCategory, setNewSkillCategory] = useState<"technical" | "soft" | "language">("technical")
  const [isGenerating, setIsGenerating] = useState(false)
  const [jobTitle, setJobTitle] = useState("")

  const addSkill = () => {
    if (!newSkill.trim()) return

    const skill: Skill = {
      id: Date.now().toString(),
      name: newSkill.trim(),
      category: newSkillCategory,
      level: "intermediate",
    }

    onChange([...data, skill])
    setNewSkill("")
  }

  const removeSkill = (id: string) => {
    onChange(data.filter((skill) => skill.id !== id))
  }

  const updateSkillLevel = (id: string, level: Skill["level"]) => {
    onChange(data.map((skill) => (skill.id === id ? { ...skill, level } : skill)))
  }

  const generateAISkills = async () => {
    if (!jobTitle.trim()) {
      alert("Please enter a job title first")
      return
    }

    setIsGenerating(true)
    try {
      const suggestions = await generateSkillsSuggestions(jobTitle)
      const newSkills: Skill[] = suggestions.map((skillName) => ({
        id: Date.now().toString() + Math.random(),
        name: skillName,
        category: "technical",
        level: "intermediate",
      }))
      onChange([...data, ...newSkills])
    } catch (error) {
      console.error("Error generating skills:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const skillsByCategory = {
    technical: data.filter((skill) => skill.category === "technical"),
    soft: data.filter((skill) => skill.category === "soft"),
    language: data.filter((skill) => skill.category === "language"),
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Skills</h3>

      {/* AI Skills Generator */}
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <Label className="text-sm font-medium text-blue-900 mb-2 block">AI Skills Generator</Label>
        <div className="flex gap-2">
          <Input
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="Enter job title (e.g., Software Engineer)"
            className="flex-1"
          />
          <Button
            onClick={generateAISkills}
            disabled={isGenerating}
            variant="outline"
            className="border-blue-300 text-blue-700 hover:bg-blue-100 bg-transparent"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {isGenerating ? "Generating..." : "Generate"}
          </Button>
        </div>
      </div>

      {/* Add New Skill */}
      <div className="flex gap-2">
        <Input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Add a skill..."
          onKeyPress={(e) => e.key === "Enter" && addSkill()}
          className="flex-1"
        />
        <Select value={newSkillCategory} onValueChange={setNewSkillCategory}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="technical">Technical</SelectItem>
            <SelectItem value="soft">Soft</SelectItem>
            <SelectItem value="language">Language</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={addSkill}>
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Skills by Category */}
      {Object.entries(skillsByCategory).map(
        ([category, skills]) =>
          skills.length > 0 && (
            <div key={category}>
              <h4 className="text-sm font-medium text-gray-700 mb-2 capitalize">{category} Skills</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <div key={skill.id} className="flex items-center gap-1">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      {skill.name}
                      <Select
                        value={skill.level}
                        onValueChange={(level) => updateSkillLevel(skill.id, level as Skill["level"])}
                      >
                        <SelectTrigger className="w-20 h-6 text-xs border-0 bg-transparent p-0">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                          <SelectItem value="expert">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                      <button onClick={() => removeSkill(skill.id)} className="ml-1 hover:text-red-600">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          ),
      )}
    </div>
  )
}
