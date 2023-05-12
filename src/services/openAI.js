import axios from 'axios';
import { Configuration, OpenAIApi } from "openai";
import openai from "openai";


const configuration = new Configuration({
  apiKey: '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',
});

const openaiAxios = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    Authorization: `Bearer ${configuration.apiKey}`,
  },
});

export const openai = new OpenAIApi(configuration, undefined, openaiAxios);
