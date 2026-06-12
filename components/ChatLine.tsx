import Avatar from './avatar';

type ChatGPTAgent = 'user' | 'system' | 'assistant';

export interface ChatGPTMessage {
  role: ChatGPTAgent;
  content: string;
}

// loading placeholder animation for the chat line
export const LoadingChatLine = () => (
  <div className="mb-5 flex min-w-full animate-pulse rounded-lg bg-white p-3 shadow-sm ring-1 shadow-orange-500/10 ring-orange-600/20 hover:ring-2 sm:px-6">
    <div className="flex flex-grow space-x-3">
      <div className="min-w-0 flex-1">
        <Avatar
          name={'kimbot'}
          picture={'/assets/blog/kimbotAvatarSmall.png'}
        />
        <div className="space-y-4 pt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-2 rounded bg-zinc-300"></div>
            <div className="col-span-1 h-2 rounded bg-zinc-300"></div>
          </div>
          <div className="h-2 rounded bg-zinc-300"></div>
        </div>
      </div>
    </div>
  </div>
);

// util helper to convert new lines to <br /> tags
const convertNewLines = (text: string) =>
  text.split('\n').map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ));

export function ChatLine({ role = 'assistant', content }: ChatGPTMessage) {
  if (!content) {
    return null;
  }
  const formattedMessage = convertNewLines(content);

  return role === 'assistant' ? (
    <div className={'float-left clear-both'}>
      <div className="mb-5 rounded-lg bg-white p-3 shadow-sm ring-1 shadow-orange-500/10 ring-orange-600/20 hover:ring-2 sm:px-6">
        <div className="flex space-x-3">
          <div className="flex-1 gap-4">
            <Avatar
              name={'kimbot'}
              picture={'/assets/blog/kimbotAvatarSmall.png'}
            />
            <p className={'text font-'}>{formattedMessage}</p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className={'float-right clear-both'}>
      <div className="mb-5 rounded-lg bg-white p-3 shadow-sm ring-1 shadow-purple-500/10 ring-purple-500/10 hover:ring-2 sm:px-6">
        <div className="flex space-x-3">
          <div className="flex-1 gap-4">
            <p className={'text m-0 text-gray-700'}>{formattedMessage}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
