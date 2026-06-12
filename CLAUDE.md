# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun run dev          # Start development server
bun run build        # Production build
bun run start        # Serve the production build
bun run lint         # ESLint
bun run format       # Prettier — write changes in place
bun run format:check # Prettier — check only (used in CI)
bun run typecheck    # TypeScript type check (tsc)
bun run test         # Playwright E2E tests (requires a prior build)
bun run test:ui      # Playwright with interactive UI
```

Always use these scripts rather than running tools (prettier, eslint, tsc, playwright) directly. Never manually format code — run `bun run format` instead.

## Architecture

**Personal blog + game** — a Next.js 14 app using the Pages Router with static generation. Deployed automatically to Vercel on every commit.

### Blog posts

- Markdown files live in `/_posts/`, parsed at build time via `gray-matter` (frontmatter) and rendered with `markdown-to-jsx`.
- `lib/posts.ts` is the single data layer: `getPostBySlug`, `getAllPosts` — both call `getStaticProps`/`getStaticPaths` patterns in `pages/posts/[slug].tsx`.
- Post frontmatter fields: `title`, `date`, `slug`, `author`, `coverImage`, `coverLink`, `ogImage`, `excerpt`.
- The `<Chatbot />` component can be embedded in any post body using `<Chatbot />` as a JSX tag inside Markdown (markdown-to-jsx overrides handle this in `pages/posts/[slug].tsx`).

### Chatbot (Kimbot)

- `components/chatbot.tsx` → `pages/api/bot.ts` (Edge Runtime) → OpenAI `gpt-3.5-turbo` streaming via `utils/OpenAIStream.ts`.
- Requires `OPENAI_API_KEY` env var; optional `AI_TEMP` and `AI_MAX_TOKENS`.
- Streams the response token-by-token using the Web Streams API.

### DropChain game

- A Tetris-like browser game at `/dropchain-react`.
- Game state is split across custom hooks in `lib/dropchain/`: `usePlayer`, `useBoard`, `useScore`, `useInterval`.
- `components/dropchain/dropchain.tsx` is the root game component; keyboard events are handled there (`←`, `→`, `↓` to move, `S` to start).
- Collision detection: `lib/dropchain/checkCollision.ts`. Grid creation: `lib/dropchain/grid.ts`.
- Audio feedback on collide/game-over uses files from `public/assets/blog/dropchain/`.
- Desktop-only — mobile shows a fallback message.

### Styling

Tailwind CSS with the `@tailwindcss/typography` plugin (used for `prose` class in post bodies). Prettier is configured with `prettier-plugin-tailwindcss` for class sorting.
