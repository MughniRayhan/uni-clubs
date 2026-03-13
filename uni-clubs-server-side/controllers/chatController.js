const Groq = require("groq-sdk");
const { SYSTEM_PROMPT, buildUserPrompt } = require('../utils/prompt');
require('dotenv').config();
const Club = require('../models/clubModel');

// Create the client the same way as docs show
const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Message is required' });

    const clubs = await Club.find();
    const context = { clubs: clubs.map(c => ({ name: c.name, description: c.description })) };

    const userPrompt = buildUserPrompt(message, context);

    // Use the chat.completions API exactly as docs show
    const response = await client.chat.completions.create({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      model: process.env.GROQ_MODEL, // e.g., "llama3-8b-8192" or similar
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'AI is unavailable at the moment.' });
  }
};

module.exports = { chatWithAI };