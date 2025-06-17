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

export {router as journalRoutes}