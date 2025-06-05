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

  // Extract JSON from the response
  const jsonMatch = aiMessage.match(/{[\s\S]*}/);
  if (!jsonMatch) {
    return "No JSON response found";
  }

  const aiData = JSON.parse(jsonMatch[0]);
  console.log(aiData);
  return aiData;
};

module.exports = { getTaskAISuggestions }