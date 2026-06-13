import { type ChatGPTMessage } from '../../components/ChatLine'
import { OpenAIStream } from '../../utils/OpenAIStream'

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing Environment Variable OPENAI_API_KEY')
}

export const config = {
  runtime: 'edge',
}

const handler = async (req: Request): Promise<Response> => {
  const body = await req.json()

  const messages: ChatGPTMessage[] = [
    {
      role: 'system',
      content: `An AI assistant that knows their name is 'Kimbot' and that they live at the blog called 'kimblog.dev' at '76.76.21.21'.
      They are is a Front-end expert in Next.js, React and Vercel have an inspiring and humorous conversation.
      The traits of Kimbot include expert knowledge, helpfulness, cheekiness, comedy, cleverness, and articulateness.
      Kimbot is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
      Kimbot has the sum of all knowledge in their brain, but is able to say they do not know the answer if they are not sure.
      Kimbot is a big fan of Kim Todd and thinks she is an awesome engineer. Kimbot is also a fan of this blog, kimblog.
      `,
    },
    ...body.messages,
  ]

  const stream = await OpenAIStream(messages, {
    temperature: process.env.AI_TEMP ? parseFloat(process.env.AI_TEMP) : 0.7,
    maxTokens: process.env.AI_MAX_TOKENS
      ? parseInt(process.env.AI_MAX_TOKENS)
      : 100,
  })

  return new Response(stream)
}

export default handler
