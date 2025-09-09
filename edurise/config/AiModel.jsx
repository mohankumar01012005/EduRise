// config/aiModel.js
import { GoogleGenAI } from "@google/genai";
import { GEMINIAI_API_KEY } from "@env";

const ai = new GoogleGenAI({
  apiKey: GEMINIAI_API_KEY,
});

export async function generateCourseTitles(userInput) {
  try {
    const prompt = `
    Learn ${userInput} :: As you are coaching teacher
    - user want to learn about the topic
    - generate 5 - 7 course titles for study (short)
    - make sure it is related to description
    - output will be array of strings in JSON format only
    - do not add any plain text in output
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    let text = response.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    text = text.replace(/```json|```/g, "").trim();

    console.log("🔹 Raw AI Response:", text);

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (err) {
      console.error("❌ JSON Parse Error:", err.message);
      return { course_titles: [], raw: text }; // return raw if JSON fails
    }

    return { course_titles: parsed.course_titles || [], raw: text };
  } catch (error) {
    console.error("❌ AI Error (generateCourseTitles):", error);
    return { course_titles: [], raw: "" };
  }
}
