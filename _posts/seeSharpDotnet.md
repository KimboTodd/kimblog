---
title: 'See Sharp .NET'
excerpt: 'C# and .NET through new lenses'
coverImage: '/assets/blog/hello-world/cover.jpg'
date: '2020-03-16T05:35:07.322Z'
author:
  name: Kim Todd
  picture: '/assets/blog/authors/KimPossibleAvatar.jpeg'
ogImage:
  url: '/assets/blog/hello-world/cover.jpg'
---

## In the Beginning

There was no documentation... at least not for me. In college I learned Java and I have 0 memories of any Java documentation. At the same time while taking classes, I continued learning HTML, CSS and JavaScript on my own through blog posts which were very accessible and exciting. At my first software engineer job, I worked as a Frontend Dev in React, but I learned that once JavaScript wasn't just in my own personal repo, and I needed to work with other folk's code and maintain it - the charm faded. I wasn't a fan of the kind of squirrely language that as soon as you thought you had grasped, would wiggle away towards the next best functional framework whatever. I switched to work on the Windows team in C# which was closer to Java that I enjoyed. We made apps in WPF, UWP and interacted with the company's web API. I found the Windows docs to be confusing and written for people that had been programming since they were kids. I had a great team, but for online resources, I turned to stack overflow and a handful of blog posts when needed. .Net didn't feel particularly welcoming, especially with my bootcamped MacBook but it wasn't so bad and Visual Studio was amazing compared to Eclipse.

Some years later I switched to a team that was helping the engineer's at our company move towards a service oriented architecture and we were tasked with creating templates and documenting best practices through docs as well as through code examples. This gave me a great chance to explore web technologies like TypeScript, delving into different frameworks like NestJS, web tooling that is commonplace like prettier and eslint, using bots for whatever we can offload like automatic dependency updates, figuring out Kubernetes and Helm charts, paying attention to not only how our docs were written but learning more about how well written docs are written well, and reading more docs that I ever had before. I really enjoyed learning from mentors and teammates about metrics and how to measure success. Having book clubs for books like _Accelerate: The Science of Lean Software and DevOps: Building and Scaling High Performing Technology Organizations, Dr. Nicole Forsgren, Jez Humble and Gene Kim_ has been really helpful to stay engaged and feel a sense of community.

> Paying attention to not only how our docs were written but learning more about how well written docs are written well

## Some Time Later

On a new project, I found myself returning C# and .NET. The transition was both exciting because I would be able to learn Blazor and worrisome because I remembered learning new things in .NET being rather difficult. As I discovered, a lot has changed, not only in .NET and C# development but also in my own style. In this article, I'll share the lessons I learned along the way, embracing the web's influence my personal development.

### Learning in Open Source

Upon my return to .NET, I was pleasantly surprised by the open-source community's thriving presence. While working with web tech, whenever I had questions or uncertainties, I could directly examine the codebase, the github Issues, and even revisions of open source documentation gaining invaluable insights and finding solutions more efficiently. Having this level of transparency not only enhanced my understanding but also accelerated my learning process. As it turns out this was also possible in .NET.

Some of the ways open source has helped me learn:

- Examine the source code directly to find bugs or undocumented options and understand how it works.
- Issues (including active discussions from Maintainers). You can also follow/watch and be notified about Issues/Pull Requests activity that will help you incorporate bug fixes or workarounds faster.
- Discussions (including proposals or reasoning behind decisions) are interesting, and help to make sure that I'm using the library for it's intended purpose or make a decision to move on to another.
- Stars and Insights can also help to decide if I should adopt a library or move on to another. Lots of open issues and no pull requests coming through means I probably won't use that library.
- Find further resources through github readme including Discord, live example sites, and get to know who the Maintainers are. Especially when you start to see the same folks around, you can start to build a sense of understanding and possibly trust.
- Release notes: As a producer using tools like semantic versioning help to automate the process of creating release notes and posting to github, and as a consumer release notes with links to specific pull requests help to build excitement for new features and reduce frustration when things break.

### Embracing the Momentum of the Web

The web development world operates at a quick pace, and is constantly evolving. I fully embraced and loved the continuous deploys philosophy, and again will suggest a read through of Accelerate if you haven't yet. Returning to .NET but in .NET web dev, I realized the importance of sharing this momentum on my new team and getting us started on the right foot especially after having terrible release days in my last windows desktop product. Quick cycle time, and frequent deploys shapes the feedback loop, encouraging a faster time to value and honestly it's just more fun to see your hard work out there that much faster.

Embracing the web's dynamic nature allowed me to infuse a new energy into my .NET development projects.

### A Kaleidoscope of Documentation

The diversity of documentation available in the web development and software engineering ecosystem is truly amazing. I had a different career before being a Software Engineer and being able to find some help on an excel formula or buying a management self help book was about the most help I could hope to find online and even that is overlapping in the venn diagram with programming. I just need to take a moment every once in a while to be grateful for the docs and people we have writing.

We are no longer limited to a single source of information - there will always be official docs, but there are also a myriad of other learning platforms, blogs, podcasts and authors sharing their expertise. Take these [.NET 7 docs](https://learn.microsoft.com/en-us/dotnet/whats-new/dotnet-7-docs) for example, there are over a hundred articles organized and linked. There are breaking changes at the top, fundamentals, architecture guides, language guides, and they have even included community contributors and how many pull requests each person merged - cool!

Reading release notes enables you to absorb new language features and get ready for what's next in whichever libraries you are using. You can find bug fixes and incorporate them sooner.

Exploring different sources or information allowed me to find and following authors like [Scott Hanselman](https://www.hanselman.com/) that present information in a digestible and friendly way. And also to find folks that are a little less approachable but really interesting to learn from like [Casey Muratori](https://www.youtube.com/watch?v=99dKzubvpKE&t).

### Embracing the Library Culture

The web's vast collection of libraries has made it easier than ever to dive into new ideas and remain interested. Programming doesn't ever get old when it's always changing.

One of the web's greatest strengths lies in its rich library ecosystem. While not as extensive as the web's offerings, .NET core being cross platform and the expanding collection of .NET libraries and frameworks like Blazor has made it easier than ever for folks to adopt .NET and get involved with their own ideas.

### The Rise of VSCode and Metadata

When I moved away from .NET I was genuinely sad to leave Visual Studio behind. VSCode surely couldn't be as good. But VSCode with it's integrated development environments (IDEs) has undergone a significant transformation and is the most popular IDE according to the stack overflow annual survey. The rise of Visual Studio Code and its vast ecosystem of plugins has enabled some really neat things.

- Offloads stylistic choices (and arguments) to a configuration, enforced locally by a vscode team shared configuration, and enforced remotely through continuous integration
- Out of the box provides in IDE library documentation when you hover
- Plugins can provide all kinds of quick fixes for common code errors or calculated values like for Tailwind css classes
- Plugins for git enable the integration of metadata for more comprehensive tracking of file changes and enriched collaboration - Who changed this file last? When was the last line touched in this file? What is the associated PR for this line of code?
- I now incorporate nice formatting with markdown and links to relevant documentation in my commit messages and those are quickly accessed in the future by hovering over the line in question.

### Developer's Gunna Develop

Returning to .NET after a couple years was an eye-opening experience. I probably shouldn't be as surprised as I am, after all Microsoft owns/produces tech that I use every single day for the past many years regardless of what project I'm working on - .NET libraries, C#, github, vscode, TypeScript, and Azure.

Could it be that it was actually me that changed?
