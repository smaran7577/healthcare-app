import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey : "AIzaSyBnIt0SXcJM4GRMd6okp9-hrwltrT56HMk"
});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Explain how AI works in a few words",
  });
  console.log(response.text);
}

await main();
