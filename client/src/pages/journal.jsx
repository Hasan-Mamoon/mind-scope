import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_URL;

const Journal = () => {
  const [entry, setEntry] = useState('');
  const { user, logout } = useAuth(); 
  const userId = useAuth.user ? useAuth.user._id : null; // Get user ID from context
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [mood, setMood] = useState('😊');
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch(`${apiUrl}/journal/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ entry, date, mood, userId }),
    });

    const data = await res.json();

    if (res.ok) {
      console.log('Journal saved:', data.message);
      setEntry('');
      // optionally reset mood/date if needed
      // setMood(''); setDate('');
    } else {
      console.error('Failed to save journal:', data.message || data);
    }
  } catch (error) {
    console.error('Error submitting journal:', error);
  }
};


    const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl flex justify-end mb-4">
        {user && (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow"
          >
            Logout
          </button>
        )}
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">📝 Journal Entry</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl space-y-4"
      >
        <div className="flex justify-between items-center">
          <label className="text-gray-700 font-semibold">
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="ml-2 px-2 py-1 border border-gray-300 rounded"
            />
          </label>

          <label className="text-gray-700 font-semibold">
            Mood:
            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="ml-2 px-2 py-1 border border-gray-300 rounded"
            >
              <option value="😄">😄 Happy</option>
              <option value="😐">😐 Okay</option>
              <option value="😔">😔 Sad</option>
              <option value="😠">😠 Angry</option>
              <option value="😰">😰 Anxious</option>
            </select>
          </label>
        </div>

        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Write your thoughts here..."
          rows={8}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-purple-700"
        />

        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-6 py-2 rounded-lg shadow"
        >
          Save Entry
        </button>
      </form>
    </div>
  );
};

export default Journal;
