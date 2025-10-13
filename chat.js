// Netlify Serverless Function
exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { message } = JSON.parse(event.body);

    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Message is required' })
      };
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

    const systemContext = `You are an AI career guidance assistant specialized in nature and environmental careers in Suriname. You MUST answer ALL questions related to nature, environment, wildlife, conservation, education, and careers.

EDUCATION PATHWAY IN SURINAME:
1. Secondary Education (MULO/HAVO/VWO)
2. MBO Level: NATIN (Agriculture, Forestry, Environmental Technology), PTC
3. HBO Level: IOL (Environmental Education), FHR
4. University: Anton de Kom University (Environmental Science, Biology, Forestry)
5. Specialized Training: STINASU (Nature guides), NGO programs

KEY INSTITUTIONS:
- Anton de Kom University: Environmental Science, Biology, Forestry
- NATIN: Agriculture, Forestry, Environmental Technology (MBO)
- PTC: Agricultural Sciences
- IOL: Environmental Education (HBO)
- STINASU: Nature guide certifications

Keep responses helpful, structured with bullet points, and use emojis (🌿 🎓 🌳).`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${systemContext}\n\nUser question: ${message}`
          }]
        }]
      })
    });

    const data = await response.json();

    let aiResponse = '';
    if (data.candidates && data.candidates[0] && 
        data.candidates[0].content && 
        data.candidates[0].content.parts && 
        data.candidates[0].content.parts[0]) {
      aiResponse = data.candidates[0].content.parts[0].text;
    }

    if (!aiResponse) {
      throw new Error('No response from AI');
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ response: aiResponse })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to generate response',
        message: error.message 
      })
    };
  }
};