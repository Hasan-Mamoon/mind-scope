import React, { useState } from 'react';

const apiUrl = 'https://6c0c-34-125-86-28.ngrok-free.app';

const SentimentForm = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeSentiment = async () => {
    setLoading(true);
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error('Sentiment analysis failed', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">🧠 AI Sentiment Analyzer</h1>
      <textarea
        className="w-full p-4 border rounded mb-4"
        rows="5"
        placeholder="Type something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={analyzeSentiment}
        disabled={loading || !text}
        className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:bg-gray-400"
      >
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>

      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded border">
          <p><strong>Label:</strong> {result.label}</p>
          <p><strong>Confidence:</strong> {(result.score * 100).toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
};

export default SentimentForm;
