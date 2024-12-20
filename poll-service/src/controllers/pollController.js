const Poll = require('../models/pollModel');

// Create Poll
const createPoll = async (req, res) => {
  try {
    const { title, description, options, creator, expiresAt } = req.body;

    const poll = new Poll({ title, description, options, creator, expiresAt });
    const savedPoll = await poll.save();

    res.status(201).json({ message: 'Poll created', poll: savedPoll });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Polls
const getAllPolls = async (req, res) => {
  try {
    const polls = await Poll.find();
    res.json(polls);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Poll by ID
const getPollById = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).json({ message: 'Poll not found' });
    res.json(poll);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update Poll
const updatePoll = async (req, res) => {
  try {
    const updates = req.body;
    const poll = await Poll.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!poll) return res.status(404).json({ message: 'Poll not found' });

    res.json({ message: 'Poll updated', poll });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Poll
const deletePoll = async (req, res) => {
  try {
    const poll = await Poll.findByIdAndDelete(req.params.id);
    if (!poll) return res.status(404).json({ message: 'Poll not found' });

    res.json({ message: 'Poll deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createPoll, getAllPolls, getPollById, updatePoll, deletePoll };
