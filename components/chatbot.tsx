import Image from "next/image";
import Container from "./container";
import { useState } from "react";
import { type ChatGPTMessage, ChatLine, LoadingChatLine } from "./ChatLine";

type Props = {
  preview?: boolean;
};

const InputMessage = ({ input, setInput, sendMessage }: any) => (
  <div className="mt-6 flex clear-both">
    <input
      type="text"
      aria-label="chat input"
      required
      className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
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
      className="ml-4 flex-none"
      onClick={() => {
        sendMessage(input);
        setInput("");
      }}
    >
      Say
    </button>
  </div>
);

// const css = `:root {
//   --border-rad-lg: 15px;
//   --medium-light-text: #586e88;
//   --light-text: #fcfcfc;
// }

// *,
// *::before,
// *::after {
//   box-sizing: border-box;
// }

// /* chatbot elements */

// .chatbot-container {
//   background-color: #16202c;
//   width: 360px;
//   min-height: 380px;
//   border-radius: var(--border-rad-lg);
//   display: flex;
//   flex-direction: column;
//   padding: 1em;
// }

// .chatbot-container > * {
//   padding: 0.5em;
// }

// .chatbot-header {
//   display: grid;
//   grid-template-areas:
//     "logo . ."
//     "logo title supportId"
//     "logo subtitle clear-btn";
// }

// .chatbot-header > * {
//   margin: 0.11em;
// }

// .logo {
//   grid-area: logo;
//   width: 45px;
// }

// .supportId {
//   font-size: 10px;
//   grid-area: supportId;
//   text-align: center;
// }

// .clear-btn {
//   grid-area: clear-btn;
//   height: 20px;
//   padding: 0;
//   width: 80%;
//   color: var(--medium-light-text);
//   font-size: 12px;
//   margin: 0 auto;
// }

// .clear-btn:hover {
//   border: 1px solid #24976f;
//   color: #24976f;
//   cursor: pointer;
// }

// .chatbot-conversation-container {
//   max-height: 250px;
//   min-height: 250px;
//   overflow-y: scroll;
//   margin: 1em 0;
// }

// /* stop ugly scroll bar on some browsers */
// .chatbot-conversation-container::-webkit-scrollbar {
//   display: none;
// }

// .chatbot-conversation-container::-moz-scrollbar {
//   display: none;
// }

// .speech {
//   padding: 1em;
//   margin: 1em auto;
//   max-width: 260px;
//   color: var(--light-text);
//   min-width: 100%;
//   border-radius: var(--border-rad-lg);
// }

// .speech:first-child {
//   margin-top: 0;
// }

// .speech-ai {
//   background: #253b4b;
//   border-top-left-radius: 0;
// }

// .speech-human {
//   background: #24976f;
//   border-top-right-radius: 0;
// }

// .chatbot-input-container {
//   display: flex;
// }

// input[type="text"],
// button {
//   background-color: transparent;
//   border: 1px solid var(--medium-light-text);
//   border-radius: 15px;
//   padding: 1em;
// }

// input[type="text"] {
//   color: #fcfcfc;
//   width: 100%;
//   border-right: 0;
//   border-top-right-radius: 0;
//   border-bottom-right-radius: 0;
// }

// .submit-btn {
//   border-left: 0;
//   border-top-left-radius: 0;
//   border-bottom-left-radius: 0;
// }

// .send-btn-icon {
//   width: 20px;
//   display: block;
// }

// /* text */

// h1 {
//   font-size: 15px;
//   color: var(--light-text);
//   grid-area: title;
// }

// h2,
// p {
//   color: var(--medium-light-text);
// }

// h2 {
//   font-size: 11px;
//   font-weight: 700;
//   grid-area: subtitle;
//   text-transform: uppercase;
// }

// /* The cursor */

// @keyframes cursor-blink {
//   0% {
//     opacity: 0;
//   }
//   100% {
//     opacity: 1;
//   }
// }

// .blinking-cursor::after {
//   content: "|";
//   font-weight: 700;
//   display: inline-block;
//   animation: cursor-blink 0.5s steps(2) infinite;
// }
// `;

function ClearChat(e): void {
  const chatbotConversation = document.getElementById("chatbot-conversation");
  chatbotConversation.innerHTML =
    '<div class="speech speech-ai">How can I help you?</div>';
}

const requestResponseFromAPI = async ({ prompt }) => {
  const res = await fetch("/api/bot", {
    method: "POST",
    headers: {
      "content-type": "text/plain",
    },
    body: prompt,
  });

  const data = await res.json();
  console.log(data);
  return data;
};

const Chatbot = ({ preview }: Props) => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [conversationContext, setConversationContext] = useState("");
  const [displayMessages, setDisplayMessages] = useState([
    { role: "assistant", text: "How can I help you?" },
  ]);
  const [messages, setMessages] = useState<ChatGPTMessage[]>([
    { role: "assistant", content: "How can I help you?" },
  ]);

  // send message to API /api/chat endpoint
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

    console.log("Edge function returned.");

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

  const sendChat = async (message: string) => {
    try {
      if (!loading) {
        setLoading(true);

        // Create loading text bubble
        // const newSpeechBubble = document.createElement("div");
        // newSpeechBubble.classList.add("speech", "speech-ai", "blinking-cursor");
        // chatbotConversation.appendChild(newSpeechBubble);

        // const currentUserInput = document.getElementById("user-input");
        let formattedConvo = `${conversationContext} ${message} + ->`;
        const stuff = { prompt: formattedConvo };
        // Request next reply
        // const botResponse = await fetch("/api/bot", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(stuff),
        // });
        // const data = await botResponse.json();
        const data = {
          data: {
            id: "cmpl-7RpeADyU7t1JS9vrFoSyRljQsYm5v",
            object: "text_completion",
            created: 1686867742,
            model: "text-davinci-003",
            choices: [{ text: "a fake rely" }],
            usage: { prompt_tokens: 4, completion_tokens: 2, total_tokens: 6 },
          },
        };

        console.log({ data });
        // const botResponse = await requestResponseFromAPI({
        //   prompt: formattedConvo,
        // });
        const responseText = data.data.choices[0].text;
        // console.log({ openaiRes: botResponse });
        console.log({ responseText });

        // // Render reply in typewriter fashion
        // let i = 0;
        // const interval = setInterval(() => {
        //   newSpeechBubble.textContent += responseText.slice(i - 1, i);
        //   if (responseText.length === i) {
        //     clearInterval(interval);
        //     newSpeechBubble.classList.remove("blinking-cursor");
        //   }
        //   i++;
        //   chatbotConversation.scrollTop = chatbotConversation.scrollHeight;
        // }, 20);

        formattedConvo += ` ${responseText} \n`;
        setConversationContext(formattedConvo);

        setDisplayMessages([
          ...displayMessages,
          { role: "you", text: message },
          { role: "assistant", text: message },
        ]);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="rounded-2xl border-zinc-100  lg:border lg:p-6">
        {messages.map(({ content, role }, index) => (
          <ChatLine key={index} role={role} content={content} />
        ))}

        {loading && <LoadingChatLine />}

        {messages.length < 2 && (
          <span className="mx-auto flex flex-grow text-gray-600 clear-both">
            Type a message to start the conversation
          </span>
        )}
        <InputMessage
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
        />
      </div>
      {/* <style>{css}</style> */}
      {/* <Container>
        <section className="chatbot-container">
          <div className="chatbot-header">
            <Image
              src="/images/owl-logo.png"
              className="logo"
              alt="logo"
              width={45}
              height={45}
            />
            <h1>ChatGPT Chatbot</h1>
            <h2>Ask me anything!</h2>
            <p className="supportId">User ID: 2344</p>
            <button className="clear-btn" id="clear-btn" onClick={ClearChat}>
              start over
            </button>
          </div>
          <div
            className="chatbot-conversation-container"
            id="chatbot-conversation"
          >
            {displayMessages.map(({ role, text }, index) => (
              // if loading display a loading thing
              <div className="speech speech-ai" key={index}>
                {text}
              </div>
            ))}
            {loading && (
              <div className="speech speech-ai blinking-cursor">...</div>
            )}
          </div>
          <form id="form" className="chatbot-input-container">
            <input
              name="user-input"
              type="text"
              id="user-input"
              required
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />

            <button
              id="submit-btn"
              className="submit-btn"
              onClick={() => {
                setDisplayMessages([
                  // ...displayMessages,
                  { role: "you", text: input },
                ]);
                setInput("");
              }}
            >
              <Image
                src="/images/send-btn-icon.png"
                className="send-btn-icon"
                alt="send icon"
                width={16}
                height={16}
              />
            </button>
          </form>
        </section>
      </Container> */}
    </div>
  );
};

export default Chatbot;
