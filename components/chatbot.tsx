import { useState } from 'react';
import { type ChatGPTMessage, ChatLine, LoadingChatLine } from './ChatLine';

const Chatbot = () => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatGPTMessage[]>([
    { role: 'assistant', content: 'How can I help you?' },
  ]);

  const sendMessage = async (message: string) => {
    setLoading(true);
    const newMessages = [
      ...messages,
      { role: 'user', content: message } as ChatGPTMessage,
    ];
    setMessages(newMessages);
    const last10messages = newMessages.slice(-10); // remember last 10 messages

    const response = await fetch('/api/bot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: last10messages,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    let lastMessage = '';

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);

      lastMessage = lastMessage + chunkValue;

      setMessages([
        ...newMessages,
        { role: 'assistant', content: lastMessage } as ChatGPTMessage,
      ]);

      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border-zinc-100  p-3 shadow-inner shadow-orange-600/20 md:border md:p-5 lg:border lg:p-6">
      {messages.map(({ content, role }, index) => (
        <ChatLine key={index} role={role} content={content} />
      ))}

      {loading && <LoadingChatLine />}

      <div className="clear-both mt-6 flex">
        <input
          type="text"
          aria-label="chat input"
          required
          className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10
      bg-white px-2 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5
      placeholder:text-zinc-400 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/10 sm:text-sm"
          value={input}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              sendMessage(input);
              setInput('');
            }
          }}
          onChange={e => {
            setInput(e.target.value);
          }}
          placeholder="Type a message to start the conversation"
        />
        <button
          type="submit"
          className="ml-4 inline-flex flex-none items-center justify-center gap-2 
      rounded-md bg-zinc-600 px-3 py-2 text-sm font-semibold 
      text-zinc-100 outline-offset-2 transition hover:bg-zinc-400
      hover:ring-4 hover:ring-purple-500/10 active:bg-zinc-800 active:text-zinc-100/70 active:transition-none"
          onClick={() => {
            sendMessage(input);
            setInput('');
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
