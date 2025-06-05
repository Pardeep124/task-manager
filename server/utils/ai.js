const { InferenceClient } = require("@huggingface/inference");

const client = new InferenceClient(process.env.HF_TOKEN);

const getTaskAISuggestions = async (
  title,
  description
) => {
  const prompt = `
Given the following task details:

Title: "${title}"
Description: "${description}"

Determine the priority level of the task (High, Medium, Low) and suggest up to 3 relevant tags.

Respond in the following JSON format:
{
  "priority": "High" | "Medium" | "Low",
  "tags": ["tag1", "tag2", "tag3"]
}

Your response:
`;

  const chatCompletion = await client.chatCompletion({
    model: "deepseek-ai/DeepSeek-R1-0528",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const aiMessage = chatCompletion.choices[0].message.content;

  const jsonMatch = aiMessage.match(/{[\s\S]*?}/);

  console.log("Full AI Message:", aiMessage);
  console.log("Extracted JSON string:", jsonMatch ? jsonMatch[0] : null);

  if (!jsonMatch) {
    throw new Error("No JSON response found in AI message.");
  }

  let aiData;
  try {
    aiData = JSON.parse(jsonMatch[0]);
  } catch (err) {
    throw new Error("Failed to parse JSON from AI message: " + err.message);
  }
  return aiData;
};

module.exports = { getTaskAISuggestions }