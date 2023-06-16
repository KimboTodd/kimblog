import { useState } from "react";
import { type ChatGPTMessage, ChatLine, LoadingChatLine } from "./chatLine";

type Props = {
  preview?: boolean;
};

const Chatbot = ({ preview }: Props) => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatGPTMessage[]>([
    { role: "assistant", content: "How can I help you?" },
  ]);

  const sendMessage = async (message: string) => {
    setLoading(true);
    const newMessages = [
      ...messages,
      { role: "user", content: message } as ChatGPTMessage,
    ];
    setMessages(newMessages);
    const last10messages = newMessages.slice(-10); // remember last 10 messages

    const response = await fetch("/api/bot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

    let lastMessage = "";

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);

      lastMessage = lastMessage + chunkValue;

      setMessages([
        ...newMessages,
        { role: "assistant", content: lastMessage } as ChatGPTMessage,
      ]);

      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border-zinc-100  lg:border lg:p-6 m-9">
      {messages.map(({ content, role }, index) => (
        <ChatLine key={index} role={role} content={content} />
      ))}

      {loading && <LoadingChatLine />}

      {messages.length < 2 && (
        <span className="mx-auto flex flex-grow text-gray-600 clear-both">
          Type a message to start the conversation
        </span>
      )}

      <div className="mt-6 flex clear-both">
        <input
          type="text"
          aria-label="chat input"
          required
          className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10
      bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5
      placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
          value={input}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage(input);
              setInput("");
            }
          }}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button
          type="submit"
          className="ml-4 flex-none inline-flex items-center gap-2 justify-center 
      rounded-md py-2 px-3 text-sm outline-offset-2 transition 
      active:transition-none bg-zinc-600 font-semibold text-zinc-100
      hover:bg-zinc-400 active:bg-zinc-800 active:text-zinc-100/70"
          onClick={() => {
            sendMessage(input);
            setInput("");
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
