---
title: 'Tuning OpenAI Chatbot'
excerpt: 'Learning how to train OpenAI Chatbot with custom data'
coverImage: '/assets/blog/kimbotAvatarCover.png'
date: '2020-06-16T05:35:07.322Z'
author:
  name: Kim Todd
  picture: '/assets/blog/authors/KimPossibleAvatar.jpeg'
ogImage:
  url: '/assets/blog/kimbotAvatar.png'
---

## AI, So Hot Right Now

I learned how to use the OpenAI API and how to train a model with custom data. After poking around and seeing how easy it was to get started, I have a few ideas of how I can use this in the future. I think this is one of those things that is easy to learn, but hard to master. I'll summarize what I've learned and give leave some links for further reading.

<Chatbot/>

## Easy to Learn

To kickstart my AI exploration, I found a fantastic free course on [Scrimba](https://scrimba.com/learn/buildaiapps) by Tom Chant that taught me how to use the OpenAI API effectively. Using a really nifty integrated development environment (IDE) in the browser that is able to let the instructor in my own IDE in browser, and take the focus of the screen to slides, as well as run the app for me in the browser where I can see the console output myself. This nice in-browser IDE combined with simply working with css, html and js made it easy to focus on OpenAI rather than a framework or language specific lessons. I recommend giving this course a watch, and if you don't want to sign up for Scrimba, you can find the same course in youtube and follow along in your own IDE.

### Model Comparison and Pricing

We looked at different models and the pricing, [https://openai.com/pricing](https://openai.com/pricing), for each as well as a nice way to be able to compare functionality, [https://gpttools.com/comparisontool](https://gpttools.com/comparisontool), so that you can choose the least expensive option that gets the job done.

### Completion API: Movie Pitch Generator

We built a movie pitch generator using the [OpenAI SDK](https://platform.openai.com/docs/libraries/node-js-library) and the [Completion API](https://platform.openai.com/docs/guides/gpt/completions-api) which gives a response to a fairly simple prompt like so:

```js
const response = await openai.createCompletion({
  model: 'text-davinci-003',
  prompt: `Generate a catchy movie title for this synopsis: ${synopsis}`,
  max_tokens: 25,
  temperature: 0.7,
});
```

The `temperature` parameter influenced the output's consistency and creativity, with lower values resulting in more consistent outputs and higher values producing more diverse and imaginative results.

### Create Image API: Unleashing DALL-E's Creativity

Utilizing the Create Image API was straightforward, but take a look at the [docs](https://platform.openai.com/docs/guides/images/usage) for in depth details. The interesting thing here is that you can use openAi to create a prompt that is used to create the image, and you can tweak the prompt in other ways like making sure there isn't any text in the image. DALL-E doesn't know what the text is that it is adding into images so it looks all wrong, which is why we will make sure that there isn't any text in our images.

```js
const response = await openai.createImage({
  prompt: `${aiGeneratedPrompt}. There should be no text in this image.`,
  n: 1,
  size: '256x256',
  response_format: 'b64_json',
});
```

### Chat Completion API

The chat completions API can be used to indicate the role of the "speaker" such at system, user or assistant and can make an ongoing conversation more clear and realistic or just to change the tone of the conversation without the user knowing.

I stored these conversations in Firebase to highlight the ability to leave the conversation, return, and pick up where chatGPT and I left off. This is made possible because the history of the chat conversation is saved and later fed in with each request to gpt-4.

It's important to note that the model doesn't remember conversations between requests, so the previous context needs to be fed in for a realistic conversation.

It also isn't learning as we are "chatting" with it through the API. OpenAI says that it won’t use any data submitted through its API for “service improvements,” including AI model training, unless a customer or organization opts in. In addition, the company has implementing a 30-day data retention policy for API users.

```js
const response = await openai.createChatCompletion({
  model: 'gpt-4',
  messages: (messages = [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'Who won the world series in 2020?' },
    {
      role: 'assistant',
      content: 'The Los Angeles Dodgers won the World Series in 2020.',
    },
    { role: 'user', content: 'Where was it played?' },
  ]),
  presence_penalty: 0,
  frequency_penalty: 0.3,
});
```

#### Frequency_penalty

This parameter is used to discourage the model from repeating the same words or phrases too frequently within the generated text. A higher value will result in fewer repeated tokens.

> Literally, it's like literally being able to have a literal new thought. Like literally.

#### Presence_penalty

This parameter is used to encourage the model to include a diverse range of tokens in the generated text. A higher value will result in the model being more likely to generate tokens that have not yet been included in the generated text.

This will encourage it to move on to different topics more quickly.

> Lately I've been doing really well. The weather has been sunny! There are hardly any clouds and it's warm out. Rain isn't predicted for the next week. I'm looking forward to more sun.`

vs.

> Lately I've been doing really well. The weather has been sunny, the weekend is coming up, my kid graduated last month, and I'm about to go on vacation.`

Take a look at this OpenAI article for more in depth information on Chat Completions vs Completions: <https://platform.openai.com/docs/guides/gpt/chat-completions-vs-completions>

### Fine Tuning the Model

We can do neat things to tweak the way gpt-4 interacts with the users like telling it that it should act like a polite assistant, giving answers to specific questions and feeding in the history of the conversation on each new request, but what if we want it to be an expert on our company? And if this is an expert on our company, we also want it to give out the contact information for a human when it doesn't know the answer rather than lie.

We can use model fine-tuning for this. Here is a link to the [docs](https://platform.openai.com/docs/guides/fine-tuning) since those will stay the most up to date, but essentially here are the steps to fine-tune a model:

1. Finding good data to train the model with. Customer support conversations with humans work well. It is recommended to have a few hundred of these. If you want the model to be able to say "I don't know. Please contact us at xxx-xxx-xxxx", add in a number of examples with that response.
1. Install the OpenAI command line interface (CLI): `pip install openai[datalib]`
1. Format your data using the CLI: `openai tools fine_tunes.prepare_data -f data.csv`
1. Pick your model. [Docs here](https://platform.openai.com/docs/guides/fine-tuning/what-models-can-be-fine-tuned).
1. Begin the tuning process `openai api fine_tunes.create -t data_prepared.jsonl -m davinci`
1. After you have begun the tuning process is where you will get a time and cost estimate. This can take many hours, depending on the models queued before you. If you need to cancel the process, run: `openai api fine_tunes.cancel -i your-model-id`

## Hard to Master

Working with OpenAI has been a fun experience. The power of the models is truly remarkable, especially when fine-tuned and tweaked to suit specific needs using the knobs that we have access to, such as temperature, frequency_penalty, and presence_penalty, hidden prompts, or custom trained models. As surprising and enjoyable as the conversations are, the models lack actual intelligence, which often leads to unexpected or incorrect responses.

For example, when requesting a pirate movie where the pirate was actually a flock of parrots in a coat pretending to be pirates, it almost always produces a synopsis and cast with the main character named Jack Sparrow and portrayed by Johnny Depp. The MS Paint-esque hero image in this post was created by DALL-E when asked to create a simple image of Kim Possible if she were secretly an evil robot. We have all seen amazing images produced by DALL-E, but it is just as easy to generate both incredible and amateurish results.

OpenAI provides an exciting playground for exploration, and with better understanding of how it works and what knobs are available to us, it offers many possibilities for innovation and creativity.

### Additional Reading

Brex has a great overview and list of tips that I recommend checking out: [What is a prompt?](https://github.com/brexhq/prompt-engineering#what-is-a-prompt)
