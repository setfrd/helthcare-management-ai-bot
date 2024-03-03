// pages/api/openai.js
import axios from 'axios';

function constructUserProfileMessage(userProfile) {
    // Construct a clear and concise message based on user profile fields
    let userProfileMessage = `User's healthcare profile: Age ${userProfile.age} years, Height ${userProfile.height}, Weight ${userProfile.weight}, Heart Rate ${userProfile.heartRate} bpm, VO2 Max ${userProfile.vo2Max}.`;

    // Add guidance for the type of information or advice the chatbot should provide
    userProfileMessage += " Provide insights and recommendations related to general wellness, fitness, and healthy living. Avoid giving specific medical advice or diagnosing health conditions.";

    return userProfileMessage;
}


export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { userProfile, userQuestion, messages } = req.body;


        messages.push({ role: "user", content: userQuestion })
        const data = {
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: constructUserProfileMessage(userProfile) },
                { role: "system", content: "Answers can be only 1000 characters long." },
                { role: "system", content: "Only answer healhcare and fitness related questions. Reject answering questions about other topics." },
                // { role: "user", content: userQuestion },
                ...messages, // include the full message history
            ]
        };


        console.log("OpenAI Request:", data.messages)
        const headers = {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
        };

        try {
            const response = await axios.post('https://api.openai.com/v1/chat/completions', data, { headers: headers });
            res.status(200).json(response.data);
        } catch (error) {
            console.error('Error communicating with OpenAI:', error);
            res.status(500).json({ message: 'Error communicating with OpenAI', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

