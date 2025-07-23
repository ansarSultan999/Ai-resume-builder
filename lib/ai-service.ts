import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function generateWorkExperienceBullets(
  position: string,
  company: string,
  industry?: string,
): Promise<string[]> {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Generate 3-4 professional bullet points for a ${position} role at ${company}${industry ? ` in the ${industry} industry` : ""}. 
      Focus on achievements, metrics, and impact. Use action verbs and quantify results where possible. 
      Make them ATS-friendly and professional. Return only the bullet points, one per line, without bullet symbols.`,
    })

    return text.split("\n").filter((line) => line.trim().length > 0)
  } catch (error) {
    console.error("Error generating work experience bullets:", error)
    return [
      "Led cross-functional teams to deliver high-impact projects",
      "Improved operational efficiency by implementing strategic initiatives",
      "Collaborated with stakeholders to achieve business objectives",
    ]
  }
}

export async function generateSkillsSuggestions(position: string, industry?: string): Promise<string[]> {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Suggest 8-10 relevant skills for a ${position} role${industry ? ` in the ${industry} industry` : ""}. 
      Include both technical and soft skills. Return only the skill names, one per line, without categories or descriptions.`,
    })

    return text.split("\n").filter((line) => line.trim().length > 0)
  } catch (error) {
    console.error("Error generating skills suggestions:", error)
    return ["Communication", "Problem Solving", "Leadership", "Project Management"]
  }
}

export async function generateProfessionalSummary(
  name: string,
  position: string,
  experience: string,
  skills: string[],
): Promise<string> {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Write a professional summary for ${name}, a ${position} with ${experience} years of experience. 
      Key skills include: ${skills.join(", ")}. 
      Make it 2-3 sentences, ATS-compliant, and highlight key achievements and value proposition. 
      Write in third person without using the name.`,
    })

    return text.trim()
  } catch (error) {
    console.error("Error generating professional summary:", error)
    return `Experienced ${position} with ${experience} years of proven track record in delivering exceptional results. Skilled in ${skills.slice(0, 3).join(", ")} with a focus on driving innovation and achieving business objectives.`
  }
}
