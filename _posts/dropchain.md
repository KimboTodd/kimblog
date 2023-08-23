---
title: 'Exploring Languages Through Game Dev'
excerpt: 'I am Building the same game in a few different languages.'
coverImage: '/assets/blog/dropchainCover.png'
coverLink: 'https://www.kimbo.dev/dropchain-react/'
date: '2023-08-14T05:35:07.322Z'
author:
  name: Kim Todd
  picture: '/assets/blog/authors/KimPossibleAvatar.jpeg'
ogImage:
  url: '/assets/blog/kimbotAvatarSmall.png'
---

## Exploring Languages

When it comes to programming languages, each language offers a new perspective and strengths. And as new languages become popular and jobs change, expanding one's toolkit is a perpetual pursuit. But it can be hard to get to know a language and compare apples to apples unless you're comparing apples to apples or in a less metaphorical sense, unless you're building the same project over and over again. So, what better way to compare apples to apples so than by building a game?

## The Logic Behind Game Development

Choosing a project that sustains my **interest** through multiple iterations is crucial. And what's more engaging than a game? Games offer a world of possibilities. They are easy to talk about and share with friends, and their iterative nature makes them an ideal candidate for learning and experimentation.

This side project is just that – a personal endeavor for fun and learning, free from the motivation of a team or client. But that doesn't mean it shouldn't see the light of completion. **Momentum** is key, and that's where the idea of building a game inspired by an existing favorite of mine takes root.

## The Blueprint: A Game Plan

Efficiency matters, especially when you're working solo. So, I've decided to leverage the React ecosystem to expedite the development process along with Tailwind which has been easy to learn and enjoyable to work with. Since this blog itself is built using Next.js, React and tailwind and is already hosted on Vercel, I've got a convenient setup to work within. No need to fuss over hosting or deployments – I can focus on the core code and learning.

## React's Place in Game Development

It's no secret that React isn't the go-to choice for high-performance game development, and that's for good reason. Feel free to do a quick google search if you want to find out more about that topic. But for the purpose of learning more programming languages in depth, and for the specifics of my game, which follows a more leisurely tempo, React's potential performance issues aren't a major concern.

I will be very interested to see if the game runs sluggishly, and learn more about what we can do to fix it. That would also serve as valuable benchmarks for comparing implementations in other languages.

## Meet the Game: Dropchain

Let me introduce you to the game – Dropchain. Think of it as a number matching puzzle mixed with Tetris. Cells drop down a grid from above until they collide with either another cell or the grid's edge.

After a collision, I need to scan for contiguous chains of non-empty cells, both vertically and horizontally. Comparing the chain's length with the values in each contiguous cell is the key. If a match is found, the cell is removed, making room for more cells that continue falling. There's a twist though – the falling speed increases over time, demanding quick decisions akin to Tetris. And, to set it apart, every seven cells materializes a fresh row at the base, pushing all the rest of the cells upwards, adding a layer of complexity. The game ends when there is no more room for the player to land another cell.

Check out the current iteration here: <https://www.kimbo.dev/dropchain-react/>

## Learning and Adapting

Throughout this journey, I've encountered a couple of essential lessons. Firstly, while feature planning and scoping is crucial to the success of a project, it's a lot more difficult to do when working alone on a side project. And diving down rabbit holes, meandering and enjoying the creative process rather than a rigid schedule of tasks is equally important to staying engaged. Striking the right balance between "must-haves" and creative exploration is the key to consistent progress towards a finished game.

Secondly, the value of not abstracting prematurely. With just a rough idea of the broad features I would need, it was easy to create the game code one way, then later realize that I wanted to add on another feature that was incompatible with the way I had assumed the game would work. I fell into relying heavily on too many custom hooks too early and creating a complex, intertwined structure that was difficult to debug.

Of course there were also small bugs along the way that were a good reminder to read the docs closely.

`.fill` fills an array with static values that will all be the **same reference**. Don't try to change one of these values later thinking only one will change.

```js
new Array(LENGTH).fill([value, state]);
```

Use `Array.from` and pass in a function as the second argument if we'll need to modify the elements in the array later.

```js
Array.from(LENGTH, () => [value, state]);
```

#### Update:

After rewriting dropchain in Blazor, the experience has really reinforced my understanding of how a particular language informs that way one thinks. The first day of thinking and planning what I would do differently in Blazor, I just kept thinking about React ways of doing things.

## Challenges of React in Game Development

As with any approach, there are challenges. React isn't inherently tailored for mobile play, which presents hurdles and I will create some buttons for mobile sized screens but won't be creating a native app.

When I move on to adding in more features (like multiplayer), I'll update this section.

## What Lies Ahead

The completion of Dropchain in React isn't the end - the plan is to rewrite it using Blazor then Elixir to compare the experience in both. Then once I have a basic game working, I'd like to add a few features like a leader board using redis, an effective way to convey how to play, and eventually multiplayer. This project is a testament to the iterative nature of learning and development so I'll come back and update this section as I work.

[x] React

[ ] Blazor: now a work in progress

[ ] Elixir

[ ] Leader Board

[ ] Effective tutorial/instructions

[ ] Multiplayer

Update: the Blazor version is now a work in progress progress! Because I'd like to be able to make the game multiplayer, I went with Blazor Server and am hosting it in Azure. For now I'm going to keep it hosted for free (unless it gets really popular 🙃) at this address: <https://dropchain.azurewebsites.net/>.

### Links

The inspiration for this game is Blockchain, a game within a game. But Blockchain itself appears to be another game, originally called Drop7, that's no longer available. Here is a video so you can see Blockchain in action: <https://youtu.be/r11NsHGLExU?t=130/>.

Here is my version in react: <https://www.kimbo.dev/dropchain-react/>
And Blazor: <https://dropchain.azurewebsites.net/>
