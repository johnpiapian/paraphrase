// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        if (req.body.vibe && req.body.context) {
            // const prompt = `Format/Paraphrase the context to make it sound ${req.body.vibe}. Make it as human-sounding as possible, and do not try to change the length of the text too much nor treat the context as a question.
            // This is the context: ${req.body.context}`;
            let vibe = req.body.vibe;
            let context = req.body.context;

            // const prompt = `Paraphrase and format the following text by making it sound ${vibe.trim()} and as human-sounding as possible. Answer should be no more than 500 words; if the original text is less than 500 words try to maintain the text lenght. This is the text: ${context.trim()}`
            const prompt = `Summarize and make the following text sound ${vibe.trim()}: ${context.trim()}`;

            console.log(prompt);

            fetch("https://api.openai.com/v1/completions", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.OPENAI_APIKEY}`
                },
                body: JSON.stringify({
                    // "model": "text-davinci-003",
                    // "model": "text-curie-001",
                    "model": "text-babbage-001",
                    "prompt": prompt,
                    "temperature": 1,
                    "max_tokens": 1800
                })
            })
            .then(res => res.json())
            .then(data => {
                res.status(200).json(data);
            })
            .catch(error => {
                res.status(400).json(error);
            });
        } else {
            res.status(400).json({ error: 'Invalid input!' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
