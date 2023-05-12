import express from "express";

import cors from "cors";

import bodyParser from "body-parser";

import { Configuration, OpenAIApi } from "openai";




const config = new Configuration({
  apiKey: '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',
});

const { json } = bodyParser;
const openai = new OpenAIApi(config);

// Setup server

const app = express();
app.use(json());
app.use(cors());

// endpoint for ChatGPT

app.post("/chat", async (req, res) => {
  const { prompt } = req.body;

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    max_tokens: 450,
    temperature: 0.7,
    prompt: prompt,
  });
  res.send(completion.data.choices[0].text);
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

//run node server.js