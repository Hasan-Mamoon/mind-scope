// import { useEffect, useState } from 'react';
// import { useAuth } from '../context/AuthContext';
// import Navbar from '../components/NavBar';
// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
//   LineChart, Line, CartesianGrid,
// } from 'recharts';
// import moment from 'moment';

// const apiUrl = import.meta.env.VITE_API_URL;

// const Dashboard = () => {
//   const { user } = useAuth();
//   const userId = user?._id;
//   const [entries, setEntries] = useState([]);
//   const [moodData, setMoodData] = useState([]);
//   const [timelineData, setTimelineData] = useState([]);
//   const [streak, setStreak] = useState(0);

//   useEffect(() => {
//     const fetchEntries = async () => {
//       if (!userId) return;
//       const res = await fetch(`${apiUrl}/journal/user/${userId}`);
//       const data = await res.json();
//       if (res.ok) {
//         const sorted = data.sort((a, b) => new Date(a.date) - new Date(b.date));
//         setEntries(sorted);
//         calculateMoodFrequency(sorted);
//         generateTimeline(sorted);
//         calculateStreak(sorted);
//       }
//     };
//     fetchEntries();
//   }, [userId]);

//   const calculateMoodFrequency = (entries) => {
//     const counts = {};
//     entries.forEach((entry) => {
//       counts[entry.mood] = (counts[entry.mood] || 0) + 1;
//     });
//     const moodData = Object.entries(counts).map(([mood, count]) => ({ mood, count }));
//     setMoodData(moodData);
//   };

//   const generateTimeline = (entries) => {
//     const timeline = entries.map(entry => ({
//       date: moment(entry.date).format('MMM D'),
//       mood: moodToNumber(entry.mood),
//     }));
//     setTimelineData(timeline);
//   };

//   const calculateStreak = (entries) => {
//     let currentStreak = 0;
//     let prevDate = null;

//     for (let i = entries.length - 1; i >= 0; i--) {
//       const date = moment(entries[i].date).startOf('day');
//       if (!prevDate) {
//         prevDate = date;
//         currentStreak++;
//       } else {
//         const diff = prevDate.diff(date, 'days');
//         if (diff === 1) {
//           currentStreak++;
//           prevDate = date;
//         } else if (diff > 1) break;
//       }
//     }

//     setStreak(currentStreak);
//   };

//   const moodToNumber = (mood) => {
//     switch (mood) {
//       case '😄': return 5;
//       case '😐': return 3;
//       case '😔': return 2;
//       case '😠': return 1;
//       case '😰': return 1;
//       default: return 3;
//     }
//   };

//   const moodScale = {
//     5: '😄 Happy',
//     3: '😐 Okay',
//     2: '😔 Sad',
//     1: '😠/😰 Low',
//   };

//   return (
//     <div className=" w-screen flex-1 min-h-screen bg-indigo-50 p-20">
//       <h2 className="text-4xl font-bold mb-8 text-indigo-700 text-center">Dashboard</h2>

//       <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-7xl mx-auto">
//         {/* Mood Frequency */}
//         <div className="bg-white shadow-xl rounded-xl p-6">
//           <h3 className="text-2xl font-semibold mb-4 text-gray-700">Mood Frequency</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={moodData}>
//               <XAxis dataKey="mood" />
//               <YAxis allowDecimals={false} />
//               <Tooltip />
//               <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="bg-white shadow-xl rounded-xl p-6">
//           <h3 className="text-2xl font-semibold mb-4 text-gray-700">Mood Over Time</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={timelineData}>
//               <CartesianGrid stroke="#e5e7eb" />
//               <XAxis dataKey="date" />
//               <YAxis ticks={[1, 2, 3, 5]} domain={[1, 5]} />
//               <Tooltip formatter={(value) => moodScale[value]} />
//               <Line type="monotone" dataKey="mood" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4 }} />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>


//         <div className="col-span-1 xl:col-span-2 bg-white shadow-xl rounded-xl p-6 text-center">
//           <h3 className="text-2xl font-semibold mb-2 text-gray-700">🔥 Current logging Streak</h3>
//           <p className="text-5xl font-extrabold text-indigo-600">{streak} day{streak !== 1 && 's'} in a row</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/NavBar';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid,
} from 'recharts';
import WordCloud from 'react-wordcloud';
import moment from 'moment';

const apiUrl = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const { user } = useAuth();
  const userId = user?._id;
  const [entries, setEntries] = useState([]);
  const [moodData, setMoodData] = useState([]);
  const [timelineData, setTimelineData] = useState([]);
  const [streak, setStreak] = useState(0);
  const [wordCloudData, setWordCloudData] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      if (!userId) return;
      const res = await fetch(`${apiUrl}/journal/user/${userId}`);
      const data = await res.json();
      if (res.ok) {
        const sorted = data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setEntries(sorted);
        calculateMoodFrequency(sorted);
        generateTimeline(sorted);
        calculateStreak(sorted);
      }
    };

    const fetchWordCloud = async () => {
      if (!userId) return;
      const res = await fetch(`${apiUrl}/journal/wordcloud/${userId}`);
      const data = await res.json();
      if (res.ok) {
        setWordCloudData(data);
      } else {
        console.error('Error fetching word cloud:', data.message);
      }
    };

    fetchEntries();
    fetchWordCloud();
  }, [userId]);

  const calculateMoodFrequency = (entries) => {
    const counts = {};
    entries.forEach((entry) => {
      counts[entry.mood] = (counts[entry.mood] || 0) + 1;
    });
    const moodData = Object.entries(counts).map(([mood, count]) => ({ mood, count }));
    setMoodData(moodData);
  };

  const generateTimeline = (entries) => {
    const timeline = entries.map(entry => ({
      date: moment(entry.date).format('MMM D'),
      mood: moodToNumber(entry.mood),
    }));
    setTimelineData(timeline);
  };

  const calculateStreak = (entries) => {
    let currentStreak = 0;
    let prevDate = null;

    for (let i = entries.length - 1; i >= 0; i--) {
      const date = moment(entries[i].date).startOf('day');
      if (!prevDate) {
        prevDate = date;
        currentStreak++;
      } else {
        const diff = prevDate.diff(date, 'days');
        if (diff === 1) {
          currentStreak++;
          prevDate = date;
        } else if (diff > 1) break;
      }
    }

    setStreak(currentStreak);
  };

  const moodToNumber = (mood) => {
    switch (mood) {
      case '😄': return 5;
      case '😐': return 3;
      case '😔': return 2;
      case '😠':
      case '😰': return 1;
      default: return 3;
    }
  };

  const moodScale = {
    5: '😄 Happy',
    3: '😐 Okay',
    2: '😔 Sad',
    1: '😠/😰 Low',
  };

  return (
    <div className="w-screen flex-1 min-h-screen bg-indigo-50 p-20">
      <h2 className="text-4xl font-bold mb-8 text-indigo-700 text-center">Dashboard</h2>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* Mood Frequency */}
        <div className="bg-white shadow-xl rounded-xl p-6">
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">Mood Frequency</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={moodData}>
              <XAxis dataKey="mood" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Mood Timeline */}
        <div className="bg-white shadow-xl rounded-xl p-6">
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">Mood Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timelineData}>
              <CartesianGrid stroke="#e5e7eb" />
              <XAxis dataKey="date" />
              <YAxis ticks={[1, 2, 3, 5]} domain={[1, 5]} />
              <Tooltip formatter={(value) => moodScale[value]} />
              <Line type="monotone" dataKey="mood" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Word Cloud */}
        <div className="bg-white shadow-xl rounded-xl p-6 col-span-1 xl:col-span-2">
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">Common Themes</h3>
          {wordCloudData.length === 0 ? (
            <p className="text-gray-500">No data yet.</p>
          ) : (
            <div className="w-full h-[300px]">
              <WordCloud
                words={wordCloudData}
                options={{
                  fontSizes: [16, 60],
                  rotations: 2,
                  rotationAngles: [0, 90],
                }}
              />
            </div>
          )}
        </div>

        {/* Streak */}
        <div className="col-span-1 xl:col-span-2 bg-white shadow-xl rounded-xl p-6 text-center">
          <h3 className="text-2xl font-semibold mb-2 text-gray-700">🔥 Current logging Streak</h3>
          <p className="text-5xl font-extrabold text-indigo-600">{streak} day{streak !== 1 && 's'} in a row</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

