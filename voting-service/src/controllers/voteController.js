const Vote = require('../models/voteModel');
const mongoose = require('mongoose');
const Poll = require('/Users/naled/Desktop/poll-microservices/poll-service/src/models/pollModel.js'); 

// Cast a Vote
const castVote = async (req, res) => {
  try {
    const { pollId, userId, optionIndex } = req.body;

    // Check if the poll exists
    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).json({ message: 'Poll not found' });

    // Check if the user has already voted
    const existingVote = await Vote.findOne({ pollId, userId });
    if (existingVote) return res.status(400).json({ message: 'User has already voted' });

    // Validate the option index
    if (optionIndex < 0 || optionIndex >= poll.options.length) {
      return res.status(400).json({ message: 'Invalid option index' });
    }

    // Save the vote
    const vote = new Vote({ pollId, userId, optionIndex });
    await vote.save();

    // Update the poll vote count
    poll.options[optionIndex].votes += 1;
    await poll.save();

    res.status(201).json({ message: 'Vote cast successfully', vote });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Votes for a Poll
const getVotesForPoll = async (req, res) => {
  try {
    const votes = await Vote.find({ pollId: req.params.pollId });
    res.json(votes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get User's Vote for a Poll
const getUserVote = async (req, res) => {
  try {
    const { pollId, userId } = req.params;
    const vote = await Vote.findOne({ pollId, userId });
    if (!vote) return res.status(404).json({ message: 'Vote not found' });
    res.json(vote);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { castVote, getVotesForPoll, getUserVote };
