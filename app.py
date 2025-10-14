from flask import Flask, request, jsonify
import requests
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allows requests from your Netlify / GitHub site

# Replace with your Gemini API key
GEMINI_API_KEY = "YOUR_GEMINI_API_KEY_HERE"
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"

@app.route("/")
def home():
    return jsonify({"message": "Gemini Career Chatbot Backend is running 🌿"})

@app.route("/ask", methods=["POST"])
def ask_gemini():
    try:
        data = request.get_json()
        user_message = data.get("message", "")

        if not user_message:
            return jsonify({"error": "Missing message"}), 400

        # System context for your career chatbot
        system_context = (
            "You are an AI career guidance assistant specialized in nature and environmental careers in Suriname. "
            "You MUST answer all questions clearly and helpfully — especially about nature, environment, wildlife, "
            "education, and general guidance for users who are unsure. Keep your tone kind, helpful, and motivating. "
            "Use emojis where appropriate (🌿🎓💬)."
        )

        payload = {
            "contents": [{
                "parts": [{
                    "text": f"{system_context}\n\nUser: {user_message}"
                }]
            }],
            "generationConfig": {
                "temperature": 0.8,
                "topK": 40,
                "topP": 0.9,
                "maxOutputTokens": 800,
            }
        }

        headers = {"Content-Type": "application/json"}
        response = requests.post(f"{GEMINI_API_URL}?key={GEMINI_API_KEY}", json=payload, headers=headers)
        response.raise_for_status()
        data = response.json()

        ai_text = data.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "")
        if not ai_text:
            ai_text = "Sorry, I couldn’t get a response from Gemini right now."

        return jsonify({"response": ai_text})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
