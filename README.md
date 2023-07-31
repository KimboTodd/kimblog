Kim's Blog

## Created With:

- [Tailwind CSS](https://tailwindcss.com)
- Template: [blog-starter](https://github.com/vercel/next.js/tree/canary/examples/blog-starter)
- Typescript
- NextJs's [Static Generation](https://nextjs.org/docs/basic-features/pages)
- Blog posts dynamically created from every markdown file stored in  `/_posts` directory
- [`remark`](https://github.com/remarkjs/remark) and [`remark-html`](https://github.com/remarkjs/remark-html) to convert the Markdown files into an HTML string and then send it down as a prop to the page.
- The metadata of every post is handled by [`gray-matter`](https://github.com/jonschlinkert/gray-matter) and also sent in props to the page.

## Deployed

Hosted and Deployed with vercel on every commit.
