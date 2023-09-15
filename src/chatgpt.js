import OpenAI from "openai";
import config from "config";

const CHATGPT_MODEL = "gpt-3.5-turbo";

const ROLES = {
  ASSISTANT: "assistant",
  SYSTEM: "system",
  USER: "user",
};

const openai = new OpenAI({
  apiKey: config.get("OPENAI_KEY"),
});

const getMessage = (m) => `
Based on these thesis write coherent, emotional story: ${m}

These thesis describes key parts of a day, i need the story i would remember and tell my friends. Pay special attention to emotional storytelling and coherence – not size.
`;

export async function chatGPT(message = " ") {
  const messages = [
    {
      role: ROLES.SYSTEM,
      content:
        "You are high experienced copywriter, who writes short, emotional articles for social media",
    },
    { role: ROLES.USER, content: getMessage(message) },
  ];
}

try {
  const completion = await openai.chat.completions.create({
    messages,
    model: CHATGPT_MODEL,
  });

  return completion.choices[0].message;
} catch (e) {
  console.log("Error while chat completion", e.message);
}
