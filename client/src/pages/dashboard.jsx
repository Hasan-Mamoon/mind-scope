import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import moment from "moment";
import ReactWordCloud from "react-d3-cloud";

const apiUrl = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const { user } = useAuth();
  const userId = user?._id;
  const [entries, setEntries] = useState([]);
  const [moodData, setMoodData] = useState([]);
  const [timelineData, setTimelineData] = useState([]);
  const [streak, setStreak] = useState(0);
  const [wordData, setWordData] = useState([]);
  const [weeklySummary, setWeeklySummary] = useState(null);
  const [reflectionPrompt, setReflectionPrompt] = useState("");

  const generateWeeklySummary = (entries) => {
    const weekAgo = moment().subtract(7, 'days').startOf('day');
    const recentEntries = entries.filter(entry =>
      moment(entry.date).isSameOrAfter(weekAgo)
    );

    const moodCount = {};
    let totalScore = 0;

    recentEntries.forEach(entry => {
      moodCount[entry.mood] = (moodCount[entry.mood] || 0) + 1;
      totalScore += moodToNumber(entry.mood);
    });

    const mostFrequentMood = Object.entries(moodCount)
      .sort((a, b) => b[1] - a[1])[0]?.[0] || '😐';

    const summary = {
      total: recentEntries.length,
      moodCount,
      mostFrequentMood,
      averageScore: recentEntries.length > 0 ? (totalScore / recentEntries.length).toFixed(2) : 'N/A'
    };

    setWeeklySummary(summary);
    generateReflectionPrompt(summary);
  };

  const generateReflectionPrompt = (summary) => {
    if (!summary || summary.total === 0) return;

    if (summary.averageScore >= 4) {
      setReflectionPrompt("You've had a great week! What made you feel so positive?");
    } else if (summary.averageScore >= 2.5) {
      setReflectionPrompt("This week had its ups and downs. What helped you stay balanced?");
    } else {
      setReflectionPrompt("Seems like it's been a tough week. What’s been bothering you most?");
    }
  };

  useEffect(() => {
    if (!userId) return;
    fetchEntries();
    fetchWordCloud();
  }, [userId]);

  const fetchEntries = async () => {
    const res = await fetch(`${apiUrl}/journal/user/${userId}`);
    const data = await res.json();
    if (res.ok) {
      const sorted = data.sort((a, b) => new Date(a.date) - new Date(b.date));
      setEntries(sorted);
      calculateMoodFrequency(sorted);
      generateTimeline(sorted);
      generateWeeklySummary(sorted);
      calculateStreak(sorted);
    }
  };

  const fetchWordCloud = async () => {
    const res = await fetch(`${apiUrl}/journal/wordcloud/${userId}`);
    const data = await res.json();
    if (res.ok) setWordData(data);
    else console.error("Failed to fetch word cloud data");
  };

  const calculateMoodFrequency = (entries) => {
    const counts = {};
    entries.forEach((entry) => {
      counts[entry.mood] = (counts[entry.mood] || 0) + 1;
    });
    const moodData = Object.entries(counts).map(([mood, count]) => ({
      mood,
      count,
    }));
    setMoodData(moodData);
  };

  const generateTimeline = (entries) => {
    const timeline = entries.map((entry) => ({
      date: moment(entry.date).format("MMM D"),
      mood: moodToNumber(entry.mood),
    }));
    setTimelineData(timeline);
  };

  const calculateStreak = (entries) => {
    let currentStreak = 0;
    let prevDate = null;
    for (let i = entries.length - 1; i >= 0; i--) {
      const date = moment(entries[i].date).startOf("day");
      if (!prevDate) {
        prevDate = date;
        currentStreak++;
      } else {
        const diff = prevDate.diff(date, "days");
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
      case "😄": return 5;
      case "😐": return 3;
      case "😔": return 2;
      case "😠": return 1;
      case "😰": return 1;
      default: return 3;
    }
  };

  const moodScale = {
    5: "😄 Happy",
    3: "😐 Okay",
    2: "😔 Sad",
    1: "😠/😰 Low",
  };

  return (
    <div className="w-screen flex-1 min-h-screen bg-indigo-50 p-10">
      <h2 className="text-4xl font-bold mb-8 text-indigo-700 text-center">
        Dashboard
      </h2>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-7xl mx-auto">
        <div className="bg-white shadow-xl rounded-xl p-6">
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">
            Mood Frequency
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={moodData}>
              <XAxis dataKey="mood" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow-xl rounded-xl p-6">
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">
            Mood Over Time
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timelineData}>
              <CartesianGrid stroke="#e5e7eb" />
              <XAxis dataKey="date" />
              <YAxis ticks={[1, 2, 3, 5]} domain={[1, 5]} />
              <Tooltip formatter={(value) => moodScale[value]} />
              <Line
                type="monotone"
                dataKey="mood"
                stroke="#4f46e5"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {weeklySummary && (
          <div className="col-span-1 xl:col-span-2 bg-white shadow-xl rounded-xl p-6">
            <h3 className="text-2xl font-semibold mb-2 text-gray-700">Weekly Summary</h3>
            <p className="text-lg text-gray-700 mb-2">Total Entries: <span className="font-bold">{weeklySummary.total}</span></p>
            <p className="text-lg text-gray-700 mb-2">Most Frequent Mood: <span className="text-2xl">{weeklySummary.mostFrequentMood}</span></p>
            <p className="text-lg text-gray-700 mb-4">Average Mood Score: <span className="font-bold">{weeklySummary.averageScore}</span></p>
            <div className="flex flex-wrap gap-4">
              {Object.entries(weeklySummary.moodCount).map(([mood, count]) => (
                <div key={mood} className="bg-indigo-100 text-indigo-800 font-medium px-3 py-1 rounded-full shadow">
                  {mood}: {count}
                </div>
              ))}
            </div>
            {reflectionPrompt && (
              <div className="mt-6 p-4 bg-indigo-50 rounded-xl text-indigo-800 border border-indigo-200">
                <h4 className="text-xl font-semibold mb-2">Reflection Prompt</h4>
                <p>{reflectionPrompt}</p>
              </div>
            )}
          </div>
        )}

        <div className="col-span-1 xl:col-span-2 bg-white shadow-xl rounded-xl p-6">
          <h3 className="text-2xl font-semibold mb-4 text-gray-700 text-center">
            Word Cloud of Your Thoughts
          </h3>
          {wordData.length > 0 ? (
            <div
              style={{
                width: "100%",
                height: "300px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <ReactWordCloud
                data={wordData.map((item) => ({
                  text: item.text,
                  value: item.value,
                }))}
                width={400}
                height={100}
                font="Segoe UI, sans-serif"
                fontSize={(word) => Math.sqrt(word.value) * 10}
                random={Math.random}
              />
            </div>
          ) : (
            <p className="text-gray-500 text-center">
              No words to display yet.
            </p>
          )}
        </div>

        <div className="col-span-1 xl:col-span-2 bg-white shadow-xl rounded-xl p-6 text-center">
          <h3 className="text-2xl font-semibold mb-2 text-gray-700">
            Current logging Streak
          </h3>
          <p className="text-5xl font-extrabold text-indigo-600">
            {streak} day{streak !== 1 && "s"} in a row
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
