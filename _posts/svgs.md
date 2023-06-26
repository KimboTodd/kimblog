---
title: 'SVGs and Github READMEs'
excerpt: 'A little about SVGs and a little about using them in a your github profile'
coverImage: '/assets/blog/alohamora.svg'
date: '2023-06-26T05:35:07.322Z'
author:
  name: Kim Todd
  picture: '/assets/blog/authors/KimPossibleAvatar.jpeg'
ogImage:
  url: '/assets/blog/alohamora.svg'
---

## What is an SVG?

SVG (Scalable Vector Graphics) is an XML-based markup language used for describing two-dimensional vector graphics.

[Will this scale?](https://medium.com/conquering-corporate-america/10-tricks-to-appear-smart-during-meetings-27b489a39d1a)
Yes, yes it will. We can resize them without losing image details or clarity. SVGs are great for logos that need to be reproduced at many different sizes.

Vector graphics: in this context, "vector" refers to a mathematical representation of a shape using things like points, lines, curves, and polygons. These are great for simple images, and especially logos.

The alternative is a raster image, which is storing the actual pixels.

## Parts

The main parts of an SVG document are as follows:

**XML Declaration:** Specifies the XML version and character encoding used in the document.

**Root `svg` Element:** Acts as the container for all SVG elements. It defines the coordinate system, dimensions, and other global attributes.

**Shapes and Paths:** SVG provides various elements for defining shapes to be displayed such as `rect` (rectangle), `circle`, `line`, `polyline`, `polygon` (closed shape), and `path` (custom path). The path element is what defines the shape. For example, we often see a path that looks something like this: `<path d="M10 10">`. The `d` is the definition of the path and within the definition we see commands and coordinates. `M` is the move command and are 10 10 for the coordinates of where to move to. See Mozilla [docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths) for details.

**Attributes:** SVG elements have attributes that define their appearance, position, and behavior. Some common attributes include fill (for setting the interior color), stroke (for defining the outline color), stroke-width (for specifying the width of the outline), and transform (for applying transformations like scaling, rotation, and translation).

**Text:** SVG supports the `text` element for displaying text. It can be positioned, styled, and formatted using various attributes.

**Styling:** SVG supports styling using CSS (Cascading Style Sheets). You can apply styles to SVG elements using the style attribute or by linking an external CSS file.

**Gradients and Patterns:** SVG allows the definition of gradients and patterns that can be used to fill shapes or strokes.

**Groups and Layers:** `g` (group) elements are used to logically group and organize other SVG elements. They enable transformations and styling to be applied collectively to a set of elements.

**Clipping and Masking:** SVG provides mechanisms for clipping and masking parts of an image, allowing for selective visibility.

**Interactivity:** SVG supports interactivity through event handling and scripting using JavaScript. You can attach event handlers to SVG elements to respond to user actions.

**Foreign Object:** The `foreignObject` element in SVG allows for the inclusion of non-SVG content within an SVG document. It serves as a container for embedding external XML markup languages such as HTML, MathML, or plain text within an SVG image.

### Foreign Object

Using Foreign Object means we can put our own html and styling into an SVG. This blog post hero image is an SVG. I'll show you how we can add animations to the image.

But what's a little more fun is that we can insert SVGs into a github markdown file like the readme.md, which we can use to create a custom styled profile for our personal github page or for a little more interesting readme file for repos we maintain.

## How To

1. In VSCode, create a file and give it a name with the extension `.svg`. This example will be: `alohamora.svg`
1. Copy and paste this code into the file to create the initial content:

```css
<svg fill="none" viewBox="0 0 600 300" width="600" height="300" xmlns="http://www.w3.org/2000/svg">
  <foreignObject width="100%" height="100%">
    <div xmlns="http://www.w3.org/1999/xhtml">
      <div>
        <h1>
          Alohamora!
        </h1>
      </div>
    </div>
  </foreignObject>
</svg>
```

3. Use an extension in VSCode to view SVGs to make this easy to visually see what is changing as you work. I'm using the extension SVG by jock. Confirm that your preview is working and you can see the initial content of your file.
4. To add CSS styles, add in the `style` tag and whatever styles you like:

```css
...
  <div xmlns="http://www.w3.org/1999/xhtml">
  <style>
      .container {
        display: flex;
        justify-content: center;

        color: white;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
      }
    </style>

    <div class="container">
      <h1>
        Alohamora!
      </h1>
    </div>
  ...
```

5. Add animation using CSS keyframes. Below is an example of defining `wave` and `gradient` keyframes that are used on the wand emoji and background respectively. If you want to pick out your own colors, drop an image in here to pick out the hex values that you want to use. In the hero image, I used colors from the cover of Harry Potter and teh Sorcerer's Stone.

```css
  ...
    <style>
        @keyframes wave  {
            0% { transform: rotate( 0.0deg) }
            10% { transform: rotate(14.0deg) }
            20% { transform: rotate(-8.0deg) }
            30% { transform: rotate(14.0deg) }
            40% { transform: rotate(-4.0deg) }
            50% { transform: rotate(10.0deg) }
            60% { transform: rotate( 0.0deg) }
            100% { transform: rotate( 0.0deg) }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .container {
          --color-main: #9a116e;
          --color-primary: #2330e0;
          --color-secondary: #fa6505;
          --color-tertiary: #ffffff;

          background: linear-gradient(-45deg, var(--color-main), var(--color-primary), var(--color-secondary), var(--color-tertiary));
          background-size: 400% 400%;
          animation: gradient 25s ease infinite;

          width: 100%;
          height: 300px;

          display: flex;
          justify-content: center;
          align-items: center;

          color: white;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        }

        .wave {
          animation: wave 3s ease-in -0.5s infinite;
          display: inline-block;
          transform-origin: 70% 70%;
        }
      </style>

      <div class="container">
        <h1>
          Alohamora!
          <div class="wave">🪄</div>
        </h1>
      </div>
      ...
```

6. Let's respect the preference for folks to who want motion turned off by using a [media query](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Media_queries):

```css
  ...
    <style>
      ....
        @media (prefers-reduced-motion) {
          .container {
            animation: none;
          }

          .wave {
            animation: none;
          }
        }
      </style>

      <div class="container">
        <h1>
          Alohamora!
          <div class="wave">🪄</div>
        </h1>
      </div>
    ...
```

7. What about folks that want dark mode? I'll let you add in the content of this media query, make it whatever you like. If you're new to CSS keep in mind the selectors for each element look just a little different: type selectors look like `h1`, class selectors have a `.` like `.container` and ID selectors use `#` like so `#someID`. [Mozilla docs here](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors)

```css
@media (prefers-reduced-motion) {
  .container {
    animation: none;
  }

  .wave {
    animation: none;
  }
}

@media (prefers-color-scheme: dark) {
  .container {
    background: #0f1116;
  }

  h1 {
    /* something else */
  }
}
```

Check out codepen.io for more ideas. Here is a fun one: https://codepen.io/GeorgePark/pen/MrjbEr. But if you are going to use this in a github readme, I've noticed that it is not possible to `@import` other fonts.

If you want to, you can use the SVG now. This is essentially what I am using for the hero image of this site.

Or if you want to use this as an image in your personal github profile do the following:

1. To create a Profile, follow the instructions here: https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme#adding-a-profile-readme
1. After your repository is created, either clone the repo, or just edit the markdown file in github by going to your own url that looks like: github.com/yourusename/yourusername.
1. We now need to do two things. Add the svg we created to the repository and reference the svg from the README.md file.
1. To do this in the github UI, click the dropdown button that says `Add File`, add a commit message like "added a custom svg", then click `Upload Files`.
1. Click into the README and click the edit pencil icon. Add this below code to your readme, but update the `alohamora.svg` file name to whatever your file actually named.

```html
<div style="width: 100%;">
  <img src="alohamora.svg" style="width: 100%;" alt="A fun image I made" />
</div>
```

1. Go to your profile at a url like: github.com/yourProfileName

### Helpful Links

If you want a more accurate way to see what this will look like in the github rendered, check out this post: <https://pragmaticpineapple.com/adding-custom-html-and-css-to-github-readme/>.

This is similar information, but at the bottom is an understated, effective use of adding a little animation that isn't overdone:
<https://omrilotan.medium.com/rich-html-in-github-readme-bfb3de791441>

Some fun things you can do to turn your github profile into your myspace page: https://github.com/DenverCoder1/readme-typing-svg and a little inspiration https://github.com/8BitJonny
