import { Router } from "express";

import journal from "../models/journal.js";

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
    const entries = await Journal.find({ userId: req.params.userId });
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


export {router as journalRoutes}