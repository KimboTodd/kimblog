import OpenAI from 'openai';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

export type { ChatCompletionMessageParam as ChatGPTMessage };

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function OpenAIStream(
  messages: ChatCompletionMessageParam[],
  options: { temperature: number; maxTokens: number }
) {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages,
    stream: true,
    temperature: options.temperature,
    max_tokens: options.maxTokens,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  const encoder = new TextEncoder();
  return new ReadableStream<Uint8Array>({
    async start(controller) {
      for await (const chunk of response) {
        const text = chunk.choices[0]?.delta?.content ?? '';
        if (text) {
          controller.enqueue(encoder.encode(text));
        }
      }
      controller.close();
    },
  });
}
