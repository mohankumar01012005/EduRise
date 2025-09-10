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

export async function generateCourseModule(topic) {
  try {
    const prompt = `
    Create a comprehensive course module about: ${topic}
    - Generate a kid-friendly description (explain like to a 10-year-old)
    - Provide a real-life example for better understanding
    - Include any relevant formulas (if applicable)
    - Suggest a YouTube reference link (search for relevant content)
    - Suggest a documentation/resource link (Wikipedia or similar)
    
    Return response in JSON format with these keys:
    {
      "title": "string",
      "description": "string",
      "example": "string",
      "formulas": ["string array"],
      "youtubeLink": "string",
      "resourceLink": "string"
    }
    - Do not add any plain text in output
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    let text = response.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    text = text.replace(/```json|```/g, "").trim();

    console.log("🔹 Raw AI Module Response:", text);

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (err) {
      console.error("❌ JSON Parse Error:", err.message);
      return {
        title: topic,
        description: `Learn about ${topic} in a fun and engaging way!`,
        example: "Real-world application example",
        formulas: [],
        youtubeLink: "https://www.youtube.com/results?search_query=" + encodeURIComponent(topic),
        resourceLink: "https://en.wikipedia.org/wiki/" + encodeURIComponent(topic)
      };
    }

    return parsed;
  } catch (error) {
    console.error("❌ AI Error (generateCourseModule):", error);
    return {
      title: topic,
      description: `Learn about ${topic} in a fun and engaging way!`,
      example: "Real-world application example",
      formulas: [],
      youtubeLink: "https://www.youtube.com/results?search_query=" + encodeURIComponent(topic),
      resourceLink: "https://en.wikipedia.org/wiki/" + encodeURIComponent(topic)
    };
  }
}

export async function generateCourseWithModules(courseTitle, modules) {
  try {
    const prompt = `
    Create a comprehensive course structure for: ${courseTitle}
    - This course will have the following modules: ${modules.join(", ")}
    - Generate a kid-friendly overall description for the course
    - Provide a real-life example of how this course knowledge is applied
    - Include any relevant formulas that span across modules (if applicable)
    
    Return response in JSON format with these keys:
    {
      "title": "string",
      "description": "string",
      "overview": "string",
      "modules": ["array of module names"],
      "formulas": ["string array"],
      "youtubeLink": "string",
      "resourceLink": "string"
    }
    - Do not add any plain text in output
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    let text = response.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    text = text.replace(/```json|```/g, "").trim();

    console.log("🔹 Raw AI Course Response:", text);

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (err) {
      console.error("❌ JSON Parse Error:", err.message);
      return {
        title: courseTitle,
        description: `A comprehensive course about ${courseTitle}`,
        overview: "This course covers various aspects of the subject in an engaging way",
        modules: modules,
        formulas: [],
        youtubeLink: "https://www.youtube.com/results?search_query=" + encodeURIComponent(courseTitle),
        resourceLink: "https://en.wikipedia.org/wiki/" + encodeURIComponent(courseTitle)
      };
    }

    return parsed;
  } catch (error) {
    console.error("❌ AI Error (generateCourseWithModules):", error);
    return {
      title: courseTitle,
      description: `A comprehensive course about ${courseTitle}`,
      overview: "This course covers various aspects of the subject in an engaging way",
      modules: modules,
      formulas: [],
      youtubeLink: "https://www.youtube.com/results?search_query=" + encodeURIComponent(courseTitle),
      resourceLink: "https://en.wikipedia.org/wiki/" + encodeURIComponent(courseTitle)
    };
  }
}