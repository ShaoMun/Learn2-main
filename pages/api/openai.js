// pages/api/openai.js

import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.sk-proj-RjT060HylsmXjtKeYLz8T3BlbkFJrFuKACri0lEweh6JyWr3,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { action, message, questions, responses, multipleChoiceAnswer, subjectiveAnswer } = req.body;

    try {
      if (action === 'generateLearningContent') {
        const prompt = `You are a professional investor and financial expert. Create learning content on the topic of 'Saving Money'. Provide three scenes or stories to teach the concept, followed by a multiple-choice question and a subjective question. Ensure the content is suitable for a general audience. Return the content in the following JSON format:
        
        {
          "Scene1": "Your first scene goes here.",
          "Scene2": "Your second scene goes here.",
          "Scene3": "Your third scene goes here.",
          "MCQ": {
            "Q": "Your multiple-choice question goes here.",
            "A": "Option A",
            "B": "Option B",
            "C": "Option C",
            "D": "Option D"
          },
          "Subjective": "Your subjective question goes here."
        }`;

        const response = await openai.chat.completions.create({
          model: 'gpt-4',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
          max_tokens: 500,
        });

        res.status(200).json({ message: response.choices[0].message.content.trim() });
      } else if (action === 'evaluateQuiz') {
        const prompt = `You are a professional investor and financial expert. Evaluate the following answers:

          Multiple Choice Question:
          Q: What is the primary purpose of a budget?
          A: ${multipleChoiceAnswer}

          Subjective Question:
          Q: Why is it important to save a part of your earnings regularly?
          A: ${subjectiveAnswer}

          Provide feedback on whether the answers are good and explain why.`;

        const response = await openai.chat.completions.create({
          model: 'gpt-4',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
          max_tokens: 500,
        });

        res.status(200).json({ message: response.choices[0].message.content.trim() });
      } else {
        res.status(400).json({ error: 'Invalid action or missing parameters' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
