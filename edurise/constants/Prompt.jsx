export const COURSE_GENERATION_PROMPT = (topic) => `${topic} :: As you are coaching teacher
- user want to learn about the topic
- generate 5 - 7 course titles for study (short)
- make sure it is related to description
- output will be array of strings in JSON format only
- do not add any plain text in output

Output Example (strict format)
{
  "course_titles": [
    "Python Basics: A Gentle Intro",
    "Python Fundamentals: Data & Control",
    "Python Programming: Functions & Modules",
    "Object-Oriented Python: Classes",
    "Python Data Handling: Files & APIs",
    "Intermediate Python: Libraries",
    "Python Project: Build Your First App"
  ]
}`
