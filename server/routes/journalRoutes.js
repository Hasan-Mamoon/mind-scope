import { Router } from "express";

import journal from "../models/journal.js";
import moment from 'moment';

const router = Router();

router.post("/create", async (req, res) => {
  try {
    const {entry, date, mood, userId } = req.body;

    console.log("Creating journal entry:", { entry, date, mood, userId });
    // Validate required fields
    if (!entry || !date || !mood || !userId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create new journal entry
    const journalEntry = new journal({
      entry,
      date,
      mood,
      userId,
    });

    await journalEntry.save();

    res.status(201).json({ message: "Journal entry created successfully", journalEntry });
  } catch (error) {
    res.status(500).json({ message: "Error creating journal entry", error: error.message });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const entries = await journal.find({ userId: req.params.userId });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch entries', error: error.message });
  }
});

router.get('/wordcloud/:userId', async (req, res) => {
  try {
    const entries = await journal.find({ userId: req.params.userId });
    const text = entries.map(e => e.entry).join(' ').toLowerCase();
    const stopwords = new Set([
      'the', 'and', 'is', 'in', 'at', 'of', 'a', 'to', 'it', 'on', 'for', 'with', 'was', 'that', 'this', 'i',
    ]);
    const counts = {};
    text.split(/\s+/).forEach(word => {
      const cleaned = word.replace(/[^\w]/g, '');
      if (cleaned && !stopwords.has(cleaned)) {
        counts[cleaned] = (counts[cleaned] || 0) + 1;
      }
    });

    const topWords = Object.entries(counts)
      .map(([text, value]) => ({ text, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 50);

    res.json(topWords);
  } catch (err) {
    res.status(500).json({ message: 'Word cloud generation failed.' });
  }
});



router.get('/weekly-summary/:userId', async (req, res) => {
  try {
    const oneWeekAgo = moment().subtract(6, 'days').startOf('day').toDate();
    const entries = await Journal.find({
      userId: req.params.userId,
      date: { $gte: oneWeekAgo }
    });

    const summary = {};
    const moodCounts = { '😄': 0, '😐': 0, '😔': 0, '😠': 0, '😰': 0 };

    entries.forEach(entry => {
      const day = moment(entry.date).format('dddd');
      summary[day] = summary[day] || [];
      summary[day].push(entry.mood);
      moodCounts[entry.mood]++;
    });

    const dailyAvg = Object.entries(summary).map(([day, moods]) => {
      const average = moods.reduce((acc, mood) => acc + moodScore(mood), 0) / moods.length;
      return { day, average };
    });

    const mostFrequentMood = Object.entries(moodCounts)
      .sort((a, b) => b[1] - a[1])[0][0];

    res.json({
      dailyAvg,
      dominantMood: mostFrequentMood,
      moodCounts
    });
  } catch (err) {
    res.status(500).json({ message: 'Could not generate summary.' });
  }
});

function moodScore(mood) {
  switch (mood) {
    case '😄': return 5;
    case '😐': return 3;
    case '😔': return 2;
    case '😠': return 1;
    case '😰': return 1;
    default: return 3;
  }
}



export {router as journalRoutes}