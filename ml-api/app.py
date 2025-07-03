from flask import Flask, request, jsonify
from transformers import pipeline
from pyngrok import ngrok
from flask_cors import CORS
import re
from collections import Counter

app = Flask(__name__)

CORS(app)

classifier = pipeline(
    "text-classification",
    model="j-hartmann/emotion-english-distilroberta-base",
    return_all_scores=False  
)

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    text = data.get('text', '')
    result = classifier(text)
    return jsonify(result)

public_url = ngrok.connect(5000)
print("🚀 Public URL for frontend:", public_url)


app.run(port=5000)
