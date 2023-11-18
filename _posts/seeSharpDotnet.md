---
title: 'See Sharp .NET'
excerpt: 'C# and .NET through new lenses.'
coverImage: '/assets/blog/windowsCover.png'
date: '2023-03-16T05:35:07.322Z'
author:
  name: Kim Todd
  picture: '/assets/blog/authors/KimPossibleAvatar.jpeg'
ogImage:
  url: '/assets/blog/windowsCover.png'
---

## In the Beginning

There was no documentation... at least not for me. In college, I learned Java, but I have zero memories of any (useful) Java documentation (I'll return to this thought, I swear). At the same time, while taking classes, I continued learning HTML, CSS, and JavaScript on my own through accessible and exciting blog posts. At my first software engineering job, I worked as a Frontend Dev in React. However, I learned that once the JavaScript code wasn't simply in my own personal repository, and I needed to work with other people's code and maintain it, the charm faded. I wasn't a fan of the kind of squirrely language that used what felt like hundreds of libraries. As soon as you thought you had grasped one, it would wiggle away toward the next best functional framework, or teammates adding new libraries and changing our standards overnight, and so on. I switched to work on the Windows team in C#, which was closer to the Java code that I had enjoyed. We made apps in WPF, UWP, and interacted with the company's web API. I found the Windows documentation contained too many assumptions and generally felt like it was written for people who had been programming since they were kids. I had a great team, but for online resources, I turned to Stack Overflow and a handful of blog posts when needed. Dot Net didn't feel particularly welcoming, especially with my bootcamped MacBook, but I did enjoy it, and Visual Studio was amazing compared to Eclipse.

Some years later, I switched to a team that was helping the engineers at our company move toward a service-oriented architecture. We were tasked with creating templates and documenting best practices through documentation, as well as through code examples. This gave me a great chance to explore web technologies like TypeScript, delve into different frameworks like NestJS, use web tools that are commonplace like Prettier and ESLint, and learn how to use bots for whatever we can offload, such as automatic dependency updates. We figured out Kubernetes and Helm charts, paid attention to not only how our documentation was written but also learned more about how well-written documentation is created. I read more documentation than I ever had before. I really enjoyed learning from mentors and teammates about metrics and how to measure success. Having book clubs for books like _Accelerate: The Science of Lean Software and DevOps: Building and Scaling High-Performing Technology Organizations, by Dr. Nicole Forsgren, Jez Humble, and Gene Kim_ has been really helpful to stay engaged and feel a sense of community.

## Some Time Later

On a new project, I found myself returning to C# and .NET. The transition was both exciting because I would be able to learn Blazor and worrisome because I remembered learning new things in .NET being rather difficult. As I discovered, a lot has changed, not only in .NET and C# development but also in my own style. In this article, I'll share the lessons I learned along the way, embracing the web's influence on my personal development.

### Learning in Open Source

Upon my return to .NET, I was pleasantly surprised by the open-source community's thriving presence. While working with web tech, whenever I had questions or uncertainties, I could directly examine the codebase, GitHub issues, and even revisions of open-source documentation, gaining invaluable insights and finding solutions more efficiently. Having this level of transparency not only enhanced my understanding but also accelerated my learning process. As it turns out, this was also possible in .NET.

Some of the ways open source has helped me learn:

- Examining the source code directly to find the root of bugs or undocumented options and understand how "it" works.
- GitHub issues, including active discussions from maintainers. You can also follow/watch and be notified about issues/pull requests activity that will help you incorporate bug fixes or workarounds faster.
- Discussions, including proposals or reasoning behind decisions, are interesting and help to make sure that I'm using the library for its intended purpose or make a decision to move on to another.
- Stars and insights can also help to decide if I should adopt a library or move on to another. Lots of open issues and no pull requests coming through mean I probably won't use that library.
- Finding further resources through GitHub readme, including Discord, live example sites, and getting to know who the maintainers are. Especially when you start to see the same folks around, you can start to build a sense of understanding and possibly trust.
- Release notes: As a producer, using tools like semantic versioning help to automate the process of creating release notes and posting to GitHub. As a consumer, release notes with links to specific pull requests help to build excitement for new features and reduce frustration when things break.

### Embracing the Momentum of the Web

The web development world operates at a quick pace and is constantly evolving. I fully embraced and loved the continuous deploys philosophy, and I'll suggest a read-through of "Accelerate" if you haven't yet. Returning to .NET but in .NET web development, I realized the importance of sharing this momentum on my new team and getting us started on the right foot, especially after having terrible release days in my last Windows desktop product. Quick cycle time and frequent deploys shape the feedback loop, encouraging a faster time to value, and honestly, it's just more fun to see your hard work out there that much faster.

Embracing the web's dynamic nature allowed me to infuse new energy into my .NET development projects.

### A Kaleidoscope of Documentation

The diversity of documentation available in the web development and software engineering ecosystem is truly amazing. I had a different career before becoming a Software Engineer, and being able to find some help on an Excel formula or buying a Management Self-Help book was the most help I could hope to find online. We should take a moment every now and then to be grateful for the documentation, forums, and people we have writing for our benefit. If you write good documentation - THANK YOU!

We are no longer limited to a few sources of information - of course there will always be official docs, but there are also a myriad of other learning platforms, blogs, podcasts, and authors sharing their expertise. Take these [.NET 7 docs](https://learn.microsoft.com/en-us/dotnet/whats-new/dotnet-7-docs), for example, there are over a hundred articles organized and linked. There are breaking changes at the top, fundamentals, architecture guides, language guides, and they have even included community contributors and how many pull requests each person merged - cool!

Reading release notes enables you to absorb new language features and get ready for what's next in whichever libraries you are using. You can find bug fixes and incorporate them sooner.

Exploring different sources or information allowed me to find and follow authors like [Scott Hanselman](https://www.hanselman.com/) that present information in a digestible and friendly way. And also to find folks that are a little less approachable but really interesting to learn from like [Casey Muratori](https://www.youtube.com/watch?v=99dKzubvpKE&t).

### Embracing the Library Culture

The web's vast collection of libraries has made it easier than ever to dive into new ideas and remain interested. Programming doesn't ever get old when it's always changing.

One of JavaScript's greatest strengths lies in its rich library ecosystem. While not as extensive as JavaScript's offerings, .NET Core, being cross-platform, and the expanding collection of .NET libraries and frameworks like Blazor have made it easier than ever for folks to adopt .NET and get involved to bring their own ideas or contributions.

### The Rise of VSCode and Metadata

When I moved away from .NET, I was genuinely sad to leave Visual Studio behind. VSCode surely couldn't be as good. But VSCode has undergone a significant transformation and is the most popular IDE according to the Stack Overflow annual survey. The rise of Visual Studio Code and its vast ecosystem of plugins has enabled some really neat things.

- Offloads stylistic choices (and arguments) to a configuration, enforced locally by a VSCode team-shared configuration, and enforced remotely through continuous integration.
- Out of the box provides in-line library documentation when you hover.
- Plugins can provide all kinds of quick fixes for common code errors or calculated values like for Tailwind CSS classes.
- Plugins for Git enable the integration of metadata for more comprehensive tracking of file changes and enriched collaboration - Who changed this file last? When was the last line touched in this file? What is the associated PR for this line of code?
- I now incorporate nice formatting with markdown and links to relevant documentation in my commit messages, and those are quickly accessed in the future by hovering over the line in question.

### Developer's Gunna Develop

Returning to .NET after a couple of years was an eye-opening experience. I probably shouldn't be as surprised as I am; after all, Microsoft owns/produces tech that I use every day regardless of what project I'm working on - .NET libraries, C#, GitHub, VSCode, TypeScript, and Azure.

Could it be that it was actually me that changed?
