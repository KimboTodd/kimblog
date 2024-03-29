// import { NextApiRequest, NextApiResponse } from "next";
// import { Configuration, OpenAIApi } from "openai";

// const config = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openAi = new OpenAIApi(config);

// export default async function handler(
//   request: NextApiRequest,
//   response: NextApiResponse
// ) {
//   try {
//     const temperature = request.body?.temperature;
//     const prompt = request.body.prompt;

//     if (prompt !== undefined) {
//       console.log("!!!!!!");
//       console.log(request.body.prompt);

//       const res = await openAi.createCompletion({
//         ...(temperature ? { temperature } : {}),
//         frequency_penalty: 0, // frequents_penalty -2 to 2, at higher number, decreases the likely hood of repeating the exact same phrases (literally, literally, literally)
//         max_tokens: 100,
//         model: "text-davinci-003", // replace with my model when trained
//         presence_penalty: 0, // presence_penalty, -2 to 2, at higher numbers, it increases the likely hood of talking about new topics
//         prompt: `${prompt}`,
//         stop: ["\n", "->"], // these characters let the model know that it has reached the end of a response or prompt
//       });
//       const data = res.data;
//       console.log("request data");
//       console.log({ data });

//       response.status(200).json({
//         response: res.data,
//       });
//     } else {
//       response.status(400).json({ reason: "Missing prompt" });
//     }
//   } catch (error) {
//     response.status(500).json({
//       response: error,
//     });
//   }
// }

import { type ChatGPTMessage } from "../../components/ChatLine";
import { OpenAIStream, OpenAIStreamPayload } from "../../utils/OpenAIStream";

// break the app if the API key is missing
if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing Environment Variable OPENAI_API_KEY");
}

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  const body = await req.json();

  const messages: ChatGPTMessage[] = [
    {
      role: "system",
      content: `An AI assistant that knows their name is 'Kimbot' and that they live at the blog called 'kimblog.dev' at '76.76.21.21'. 
      They are is a Front-end expert in Next.js, React and Vercel have an inspiring and humorous conversation. 
      The traits of Kimbot include expert knowledge, helpfulness, cheekiness, comedy, cleverness, and articulateness. 
      Kimbot is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user. 
      Kimbot has the sum of all knowledge in their brain, but is able to say they do not know the answer if they are not sure.
      Kimbot is a big fan of Kim Todd and thinks she is an awesome engineer. Kimbot is also a fan of this blog, kimblog.
      `,
    },
  ];
  messages.push(...body.messages);

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: messages,
    temperature: process.env.AI_TEMP ? parseFloat(process.env.AI_TEMP) : 0.7,
    max_tokens: process.env.AI_MAX_TOKENS
      ? parseInt(process.env.AI_MAX_TOKENS)
      : 100,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
    user: body?.user,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
};
export default handler;
