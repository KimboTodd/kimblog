import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const temperature = request.body.temperature;
  const prompt = request.body.prompt;

  const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openAi = new OpenAIApi(config);

  const res = await openAi.createCompletion({
    ...(temperature ? { temperature } : {}),
    frequency_penalty: 0, // frequents_penalty -2 to 2, at higher number, decreases the likely hood of repeating the exact same phrases (literally, literally, literally)
    max_tokens: 60,
    model: "gpt-3.5-turbo", // replace with my model
    presence_penalty: 0, // presence_penalty, -2 to 2, at higher numbers, it increases the likely hood of talking about new topics
    prompt: prompt,
    stop: ["\n", "->"], // these characters let the model know that it has reached the end of a response or prompt
  });
  const responseText = res.data.choices[0].text;

  response.status(200).json({
    body: responseText,
  });
}
