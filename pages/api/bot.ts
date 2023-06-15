import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openAi = new OpenAIApi(config);

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const temperature = request.body?.temperature;
    const prompt = request.body.prompt;

    if (prompt !== undefined) {
      const res = await openAi.createCompletion({
        ...(temperature ? { temperature } : {}),
        frequency_penalty: 0, // frequents_penalty -2 to 2, at higher number, decreases the likely hood of repeating the exact same phrases (literally, literally, literally)
        max_tokens: 100,
        model: "text-davinci-003", // replace with my model when trained
        presence_penalty: 0, // presence_penalty, -2 to 2, at higher numbers, it increases the likely hood of talking about new topics
        prompt: `${prompt}`,
        stop: ["\n", "->"], // these characters let the model know that it has reached the end of a response or prompt
      });

      response.status(200).json({
        response: res.data,
      });
    } else {
      response.status(400).json({ reason: "Missing prompt" });
    }
  } catch (error) {
    response.status(500).json({
      response: error,
    });
  }
}
