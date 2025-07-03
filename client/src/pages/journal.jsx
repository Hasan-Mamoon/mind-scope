import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const apiUrl = import.meta.env.VITE_API_URL;
const mlapiUrl = import.meta.env.VITE_ML_API_URL;

const getReflectionPrompt = (mood) => {
  switch (mood) {
    case '😄':
      return "What contributed to your positive feelings today?";
    case '😐':
      return "Is there anything on your mind you'd like to unpack?";
    case '😔':
      return "What made you feel this way? Is there something that might help?";
    case '😠':
      return "What triggered your anger? How can you address it constructively?";
    case '😰':
      return "What's causing the anxiety? Is there a way to regain calm?";
    default:
      return "Start typing to get insights...";
  }
};

const Journal = () => {
  const [entry, setEntry] = useState('');
  const { user } = useAuth();
  const userId = user?._id;
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [mood, setMood] = useState('default');
  const [entries, setEntries] = useState([]);
  const [analyzing, setAnalyzing] = useState(false);

  const analyzeSentiment = async (text) => {
    if (!text || text.length < 10) return;
    try {
      setAnalyzing(true);
      const res = await fetch(`${mlapiUrl}/analyze`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const result = await res.json();
      const label = result[0].label.toLowerCase();
      if (label === 'joy') setMood('😄');
      else if (label === 'neutral') setMood('😐');
      else if (label === 'sadness') setMood('😔');
      else if (label === 'anger') setMood('😠');
      else if (label === 'fear') setMood('😰');
    } catch (error) {
      console.error('Sentiment analysis failed:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (entry.length > 10) analyzeSentiment(entry);
    }, 1000);
    if(entry.length < 10) setMood('default');
    return () => clearTimeout(timeout);
  }, [entry]);

  const fetchEntries = async () => {
    try {
      const res = await fetch(`${apiUrl}/journal/user/${userId}`);
      const data = await res.json();
      if (res.ok) setEntries(data.reverse());
      else console.error('Error fetching entries:', data.message);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${apiUrl}/journal/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entry, date, mood, userId }),
      });
      const data = await res.json();
      if (res.ok) {
        setEntry('');
        fetchEntries();
      } else {
        console.error('Failed to save journal:', data.message);
      }
    } catch (error) {
      console.error('Error submitting journal:', error);
    }
  };


  useEffect(() => {
    if (userId) fetchEntries();
  }, [userId]);

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-6 flex flex-col items-center">
 

      {/* Journal Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white/60 backdrop-blur-md border border-white/30 rounded-xl shadow-lg p-6 w-full max-w-2xl space-y-4"
      >
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <label className="text-gray-700 font-medium">
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="ml-2 px-2 py-1 border border-gray-300 rounded"
            />
          </label>

          <label className="text-gray-700 font-medium">
            Mood:
            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="ml-2 px-2 py-1 border border-gray-300 rounded"
            >
              <option value="default">Start Typing..</option>
              <option value="😄">😄 Happy</option>
              <option value="😐">😐 Okay</option>
              <option value="😔">😔 Sad</option>
              <option value="😠">😠 Angry</option>
              <option value="😰">😰 Anxious</option>
            </select>
          </label>
        </div>

        {analyzing && (
          <p className="text-sm italic text-indigo-500">Analyzing sentiment...</p>
        )}

        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Write your thoughts here..."
          rows={6}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-purple-700"
        />

        {getReflectionPrompt(mood) && (
          <div className="mt-2 text-sm text-gray-600 italic bg-purple-100 border-l-4 border-purple-400 p-3 rounded">
            {getReflectionPrompt(mood)}
          </div>
        )}

        <button
          type="submit"
          className="custom-button bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg shadow"
        >
          Save Entry
        </button>
      </form>

      {/* Past Entries Section */}
      <h3 className="text-2xl font-bold text-gray-700 mt-10 mb-4">Past Entries</h3>

      <div className="relative w-full max-w-2xl h-96 overflow-y-auto pr-2 custom-scrollbar border-l-4 border-indigo-300 pl-6">
        {entries.length === 0 ? (
          <p className="text-gray-500">No past entries yet.</p>
        ) : (
          entries.map((entry, idx) => (
            <motion.div
              key={entry._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="relative bg-white/80 backdrop-blur-lg shadow-md border border-white/30 rounded-lg p-4 mb-6"
            >
              <div className="absolute w-6 h-6 bg-indigo-500 text-white rounded-full -left-[1.75rem] top-4 flex items-center justify-center text-sm">
                {entry.mood}
              </div>
              <p className="text-sm text-gray-500">{new Date(entry.date).toDateString()}</p>
              <p className="text-gray-800 mt-2 whitespace-pre-line">{entry.entry}</p>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Journal;
