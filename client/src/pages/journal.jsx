// import React, { useState } from 'react';
// import { useAuth } from '../context/AuthContext'; // Adjust the import path as necessary
// import { useNavigate } from 'react-router-dom';

// const apiUrl = import.meta.env.VITE_API_URL;

// const Journal = () => {
//   const [entry, setEntry] = useState('');
//   const { user, logout } = useAuth(); 
//   const userId = user ? user._id : null; // Get user ID from context
//   const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
//   const [mood, setMood] = useState('😄');
//   const navigate = useNavigate();

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const res = await fetch(`${apiUrl}/journal/create`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ entry, date, mood, userId }),
//     });

//     const data = await res.json();

//     if (res.ok) {
//       console.log('Journal saved:', data.message);
//       setEntry('');
//       // optionally reset mood/date if needed
//       // setMood(''); setDate('');
//     } else {
//       console.error('Failed to save journal:', data.message || data);
//     }
//   } catch (error) {
//     console.error('Error submitting journal:', error);
//   }
// };


//     const handleLogout = () => {
//     logout();
//     navigate('/login'); // Redirect to login page after logout
//   };

//   return (
//     <div className="w-screen min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-6 flex flex-col items-center">
//       <div className="w-full max-w-2xl flex justify-end mb-4">
//         {user && (
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow"
//           >
//             Logout
//           </button>
//         )}
//       </div>
//       <h2 className="text-3xl font-bold text-gray-800 mb-6">📝 Journal Entry</h2>

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl space-y-4"
//       >
//         <div className="flex justify-between items-center">
//           <label className="text-gray-700 font-semibold">
//             Date:
//             <input
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               className="ml-2 px-2 py-1 border border-gray-300 rounded"
//             />
//           </label>

//           <label className="text-gray-700 font-semibold">
//             Mood:
//             <select
//               value={mood}
//               onChange={(e) => setMood(e.target.value)}
//               className="ml-2 px-2 py-1 border border-gray-300 rounded"
//             >
//               <option value="😄">😄 Happy</option>
//               <option value="😐">😐 Okay</option>
//               <option value="😔">😔 Sad</option>
//               <option value="😠">😠 Angry</option>
//               <option value="😰">😰 Anxious</option>
//             </select>
//           </label>
//         </div>

//         <textarea
//           value={entry}
//           onChange={(e) => setEntry(e.target.value)}
//           placeholder="Write your thoughts here..."
//           rows={8}
//           className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-purple-700"
//         />

//         <button
//           type="submit"
//           className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-6 py-2 rounded-lg shadow"
//         >
//           Save Entry
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Journal;


// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

// const apiUrl = import.meta.env.VITE_API_URL;

// const Journal = () => {
//   const [entry, setEntry] = useState('');
//   const { user, logout } = useAuth();
//   const userId = user ? user._id : null;
//   const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
//   const [mood, setMood] = useState('😄');
//   const [entries, setEntries] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (userId) {
//       fetch(`${apiUrl}/journal/user/${userId}`)
//         .then(res => res.json())
//         .then(data => setEntries(data.reverse())) // Show recent first
//         .catch(err => console.error('Failed to fetch journals:', err));
//     }
//   }, [userId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(`${apiUrl}/journal/create`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ entry, date, mood, userId }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setEntry('');
//         setEntries(prev => [{ entry, date, mood }, ...prev]);
//       } else {
//         console.error('Failed to save journal:', data.message || data);
//       }
//     } catch (error) {
//       console.error('Error submitting journal:', error);
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <div className="w-screen min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-6 flex flex-col items-center">
//       <div className="w-full max-w-3xl flex justify-between items-center mb-4">
//         <h2 className="text-3xl font-bold text-gray-800">📝 Journal</h2>
//         {user && (
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow"
//           >
//             Logout
//           </button>
//         )}
//       </div>

//       {/* Entry Form */}
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white rounded-xl shadow-lg p-6 w-full max-w-3xl space-y-4 mb-8"
//       >
//         <div className="flex justify-between items-center">
//           <label className="text-gray-700 font-semibold">
//             Date:
//             <input
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               className="ml-2 px-2 py-1 border border-gray-300 rounded"
//             />
//           </label>

//           <label className="text-gray-700 font-semibold">
//             Mood:
//             <select
//               value={mood}
//               onChange={(e) => setMood(e.target.value)}
//               className="ml-2 px-2 py-1 border border-gray-300 rounded"
//             >
//               <option value="😄">😄 Happy</option>
//               <option value="😐">😐 Okay</option>
//               <option value="😔">😔 Sad</option>
//               <option value="😠">😠 Angry</option>
//               <option value="😰">😰 Anxious</option>
//             </select>
//           </label>
//         </div>

//         <textarea
//           value={entry}
//           onChange={(e) => setEntry(e.target.value)}
//           placeholder="Write your thoughts here..."
//           rows={6}
//           className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-purple-700"
//         />

//         <button
//           type="submit"
//           className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-6 py-2 rounded-lg shadow"
//         >
//           Save Entry
//         </button>
//       </form>

//       {/* Previous Entries */}
//       <div className="w-full max-w-3xl space-y-4">
//         {entries.length === 0 ? (
//           <p className="text-center text-gray-600">No entries yet.</p>
//         ) : (
//           entries.map((item, idx) => (
//             <div
//               key={idx}
//               className="bg-white shadow-md rounded-lg p-4 border-l-4 border-indigo-400"
//             >
//               <div className="flex justify-between mb-2 text-sm text-gray-600">
//                 <span>{new Date(item.date).toLocaleDateString()}</span>
//                 <span className="text-xl">{item.mood}</span>
//               </div>
//               <p className="text-gray-800 whitespace-pre-line">{item.entry}</p>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Journal;

// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { motion} from 'framer-motion';

// const apiUrl = import.meta.env.VITE_API_URL;

// const Journal = () => {
//   const [entry, setEntry] = useState('');
//   const { user, logout } = useAuth();
//   const userId = user?._id;
//   const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
//   const [mood, setMood] = useState('😄');
//   const [entries, setEntries] = useState([]);
//   const navigate = useNavigate();

//   const fetchEntries = async () => {
//     try {
//       const res = await fetch(`${apiUrl}/journal/user/${userId}`);
//       const data = await res.json();
//       if (res.ok) setEntries(data.reverse()); // newest first
//       else console.error('Error fetching entries:', data.message);
//     } catch (err) {
//       console.error('Fetch error:', err);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(`${apiUrl}/journal/create`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ entry, date, mood, userId }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setEntry('');
//         fetchEntries(); // Refresh entries
//       } else {
//         console.error('Failed to save journal:', data.message);
//       }
//     } catch (error) {
//       console.error('Error submitting journal:', error);
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   useEffect(() => {
//     if (userId) fetchEntries();
//   }, [userId]);

//   return (
//     <div className="w-screen min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-6 flex flex-col items-center">
//       <div className="w-full max-w-2xl flex justify-end mb-4">
//         {user && (
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow"
//           >
//             Logout
//           </button>
//         )}
//       </div>

//       <h2 className="text-3xl font-bold text-gray-800 mb-6">📝 Journal Entry</h2>

//       {/* Journal Form */}
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl space-y-4"
//       >
//         <div className="flex justify-between items-center">
//           <label className="text-gray-700 font-semibold">
//             Date:
//             <input
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               className="ml-2 px-2 py-1 border border-gray-300 rounded"
//             />
//           </label>

//           <label className="text-gray-700 font-semibold">
//             Mood:
//             <select
//               value={mood}
//               onChange={(e) => setMood(e.target.value)}
//               className="ml-2 px-2 py-1 border border-gray-300 rounded"
//             >
//               <option value="😄">😄 Happy</option>
//               <option value="😐">😐 Okay</option>
//               <option value="😔">😔 Sad</option>
//               <option value="😠">😠 Angry</option>
//               <option value="😰">😰 Anxious</option>
//             </select>
//           </label>
//         </div>

//         <textarea
//           value={entry}
//           onChange={(e) => setEntry(e.target.value)}
//           placeholder="Write your thoughts here..."
//           rows={6}
//           className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-purple-700"
//         />

//         <button
//           type="submit"
//           className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-6 py-2 rounded-lg shadow"
//         >
//           Save Entry
//         </button>
//       </form>

//       {/* Timeline Section */}
//       <h3 className="text-2xl font-bold text-gray-700 mt-10 mb-4">📖 Past Entries</h3>
//       <div className="relative border-l-4 border-indigo-300 pl-6 ml-4 w-full max-w-2xl space-y-8">
//         {entries.map((entry, idx) => (
//           <motion.div
//             key={entry._id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: idx * 0.1 }}
//             className="relative bg-white shadow-md rounded-lg p-4"
//           >
//             <div className="absolute w-5 h-5 bg-indigo-400 rounded-full -left-[1.65rem] top-4 flex items-center justify-center text-white text-sm">
//               {entry.mood}
//             </div>
//             <p className="text-sm text-gray-500">{new Date(entry.date).toDateString()}</p>
//             <p className="text-gray-800 whitespace-pre-line mt-2">{entry.entry}</p>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Journal;

// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';

// const apiUrl = import.meta.env.VITE_API_URL;

// const Journal = () => {
//   const [entry, setEntry] = useState('');
//   const { user, logout } = useAuth();
//   const userId = user?._id;
//   const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
//   const [mood, setMood] = useState('😄');
//   const [entries, setEntries] = useState([]);
//   const navigate = useNavigate();

//   const analyzeSentiment = async (text) => {
//   try {
//     setAnalyzing(true);
//     const res = await fetch('http://localhost:5000/analyze', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ text }),
//     });
//     const result = await res.json();

//     // Convert label to emoji
//     const label = result[0].label.toLowerCase();
//     if (label === 'positive') setMood('😄');
//     else if (label === 'neutral') setMood('😐');
//     else setMood('😔');

//   } catch (error) {
//     console.error('Sentiment analysis failed:', error);
//   } finally {
//     setAnalyzing(false);
//   }
// };

//   const fetchEntries = async () => {
//     try {
//       const res = await fetch(`${apiUrl}/journal/user/${userId}`);
//       const data = await res.json();
//       if (res.ok) setEntries(data.reverse());
//       else console.error('Error fetching entries:', data.message);
//     } catch (err) {
//       console.error('Fetch error:', err);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(`${apiUrl}/journal/create`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ entry, date, mood, userId }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setEntry('');
//         fetchEntries();
//       } else {
//         console.error('Failed to save journal:', data.message);
//       }
//     } catch (error) {
//       console.error('Error submitting journal:', error);
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   useEffect(() => {
//     if (userId) fetchEntries();
//   }, [userId]);

//   return (
//     <div className="w-screen min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-6 flex flex-col items-center">
//       <div className="w-screen max-w-2xl flex justify-between items-center mb-6">
//         <h2 className="text-3xl font-bold text-indigo-700">MindScope </h2>
//         {user && (
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow"
//           >
//             Logout
//           </button>
//         )}
//       </div>

//       {/* Journal Form */}
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white/60 backdrop-blur-md border border-white/30 rounded-xl shadow-lg p-6 w-full max-w-2xl space-y-4"
//       >
//         <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
//           <label className="text-gray-700 font-medium">
//             Date:
//             <input
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               className="ml-2 px-2 py-1 border border-gray-300 rounded"
//             />
//           </label>

//           <label className="text-gray-700 font-medium">
//             Mood:
//             <select
//               value={mood}
//               onChange={(e) => setMood(e.target.value)}
//               className="ml-2 px-2 py-1 border border-gray-300 rounded"
//             >
//               <option value="😄">😄 Happy</option>
//               <option value="😐">😐 Okay</option>
//               <option value="😔">😔 Sad</option>
//               <option value="😠">😠 Angry</option>
//               <option value="😰">😰 Anxious</option>
//             </select>
//           </label>
//         </div>

//         <textarea
//           value={entry}
//           onChange={(e) => setEntry(e.target.value)}
//           placeholder="Write your thoughts here..."
//           rows={6}
//           className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-purple-700"
//         />

//         <button
//           type="submit"
//           className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg shadow"
//         >
//           Save Entry
//         </button>
//       </form>

//       {/* Past Entries Section */}
//       <h3 className="text-2xl font-bold text-gray-700 mt-10 mb-4">Past Entries</h3>

//       <div className="relative w-full max-w-2xl h-96 overflow-y-auto pr-2 custom-scrollbar border-l-4 border-indigo-300 pl-6">
//         {entries.length === 0 ? (
//           <p className="text-gray-500">No past entries yet.</p>
//         ) : (
//           entries.map((entry, idx) => (
//             <motion.div
//               key={entry._id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4, delay: idx * 0.1 }}
//               className="relative bg-white/80 backdrop-blur-lg shadow-md border border-white/30 rounded-lg p-4 mb-6"
//             >
//               <div className="absolute w-6 h-6 bg-indigo-500 text-white rounded-full -left-[1.75rem] top-4 flex items-center justify-center text-sm">
//                 {entry.mood}
//               </div>
//               <p className="text-sm text-gray-500">{new Date(entry.date).toDateString()}</p>
//               <p className="text-gray-800 mt-2 whitespace-pre-line">{entry.entry}</p>
//             </motion.div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Journal;

// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';

// const apiUrl = import.meta.env.VITE_API_URL;

// const Journal = () => {
//   const [entry, setEntry] = useState('');
//   const { user, logout } = useAuth();
//   const userId = user?._id;
//   const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
//   const [mood, setMood] = useState('😄');
//   const [entries, setEntries] = useState([]);
//   const [analyzing, setAnalyzing] = useState(false);
//   const navigate = useNavigate();

//   // Analyze sentiment and auto-suggest mood
//   const analyzeSentiment = async (text) => {
//     if (!text || text.length < 10) return;
//     try {
//       setAnalyzing(true);
//       const res = await fetch('https://703b-34-74-144-41.ngrok-free.app/analyze', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ text }),
//       });
//       const result = await res.json();
//       const label = result[0].label.toLowerCase();
//       if (label === 'joy') setMood('😄');
//       else if (label === 'neutral') setMood('😐');
//       else if (label == 'sadness') setMood('😔');
//       else if (label == 'anger') setMood('😠');
//       else if (label == 'fear') setMood('😰');
//     } catch (error) {
//       console.error('Sentiment analysis failed:', error);
//     } finally {
//       setAnalyzing(false);
//     }
//   };

//   // Debounce sentiment analysis
//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       if (entry.length > 10) analyzeSentiment(entry);
//     }, 1000);
//     return () => clearTimeout(timeout);
//   }, [entry]);

//   const fetchEntries = async () => {
//     try {
//       const res = await fetch(`${apiUrl}/journal/user/${userId}`);
//       const data = await res.json();
//       if (res.ok) setEntries(data.reverse());
//       else console.error('Error fetching entries:', data.message);
//     } catch (err) {
//       console.error('Fetch error:', err);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(`${apiUrl}/journal/create`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ entry, date, mood, userId }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setEntry('');
//         fetchEntries();
//       } else {
//         console.error('Failed to save journal:', data.message);
//       }
//     } catch (error) {
//       console.error('Error submitting journal:', error);
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   useEffect(() => {
//     if (userId) fetchEntries();
//   }, [userId]);

//   return (
//     <div className="w-screen min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-6 flex flex-col items-center">
//       <div className="w-screen max-w-2xl flex justify-between items-center mb-6">
//         <h2 className="text-3xl font-bold text-indigo-700">MindScope</h2>
//         {user && (
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow"
//           >
//             Logout
//           </button>
//         )}
//       </div>

//       {/* Journal Form */}
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white/60 backdrop-blur-md border border-white/30 rounded-xl shadow-lg p-6 w-full max-w-2xl space-y-4"
//       >
//         <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
//           <label className="text-gray-700 font-medium">
//             Date:
//             <input
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               className="ml-2 px-2 py-1 border border-gray-300 rounded"
//             />
//           </label>

//           <label className="text-gray-700 font-medium">
//             Mood:
//             <select
//               value={mood}
//               onChange={(e) => setMood(e.target.value)}
//               className="ml-2 px-2 py-1 border border-gray-300 rounded"
//             >
//               <option value="😄">😄 Happy</option>
//               <option value="😐">😐 Okay</option>
//               <option value="😔">😔 Sad</option>
//               <option value="😠">😠 Angry</option>
//               <option value="😰">😰 Anxious</option>
//             </select>
//           </label>
//         </div>

//         {analyzing && (
//           <p className="text-sm italic text-indigo-500">Analyzing sentiment...</p>
//         )}

//         <textarea
//           value={entry}
//           onChange={(e) => setEntry(e.target.value)}
//           placeholder="Write your thoughts here..."
//           rows={6}
//           className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-purple-700"
//         />

//         <button
//           type="submit"
//           className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg shadow"
//         >
//           Save Entry
//         </button>
//       </form>

//       {/* Past Entries Section */}
//       <h3 className="text-2xl font-bold text-gray-700 mt-10 mb-4">Past Entries</h3>

//       <div className="relative w-full max-w-2xl h-96 overflow-y-auto pr-2 custom-scrollbar border-l-4 border-indigo-300 pl-6">
//         {entries.length === 0 ? (
//           <p className="text-gray-500">No past entries yet.</p>
//         ) : (
//           entries.map((entry, idx) => (
//             <motion.div
//               key={entry._id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4, delay: idx * 0.1 }}
//               className="relative bg-white/80 backdrop-blur-lg shadow-md border border-white/30 rounded-lg p-4 mb-6"
//             >
//               <div className="absolute w-6 h-6 bg-indigo-500 text-white rounded-full -left-[1.75rem] top-4 flex items-center justify-center text-sm">
//                 {entry.mood}
//               </div>
//               <p className="text-sm text-gray-500">{new Date(entry.date).toDateString()}</p>
//               <p className="text-gray-800 mt-2 whitespace-pre-line">{entry.entry}</p>
//             </motion.div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Journal;

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const apiUrl = import.meta.env.VITE_API_URL;

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
      return null;
  }
};

const Journal = () => {
  const [entry, setEntry] = useState('');
  const { user, logout } = useAuth();
  const userId = user?._id;
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [mood, setMood] = useState('default');
  const [entries, setEntries] = useState([]);
  const [analyzing, setAnalyzing] = useState(false);
  const navigate = useNavigate();

  const analyzeSentiment = async (text) => {
    if (!text || text.length < 10) return;
    try {
      setAnalyzing(true);
      const res = await fetch('https://67d0-34-73-41-73.ngrok-free.app/analyze', {
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

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    if (userId) fetchEntries();
  }, [userId]);

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-6 flex flex-col items-center">
      <div className="w-screen max-w-2xl flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-indigo-700">MindScope</h2>
        {user && (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow"
          >
            Logout
          </button>
        )}
      </div>

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
            🧠 {getReflectionPrompt(mood)}
          </div>
        )}

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg shadow"
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
