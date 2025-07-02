from flask import Flask, request, jsonify
from transformers import pipeline
from pyngrok import ngrok
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)

CORS(app)

# Load sentiment analysis pipeline
classifier = pipeline("sentiment-analysis")

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    text = data.get('text', '')
    result = classifier(text)
    return jsonify(result)

# Start ngrok tunnel
public_url = ngrok.connect(5000)
print("🚀 Public URL for frontend:", public_url)

# Run Flask app
app.run(port=5000)
