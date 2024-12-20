const express = require('express');
const { castVote, getVotesForPoll, getUserVote } = require('../controllers/voteController');
const router = express.Router();

router.post('/', castVote);
router.get('/poll/:pollId', getVotesForPoll);
router.get('/poll/:pollId/user/:userId', getUserVote);

module.exports = router;
