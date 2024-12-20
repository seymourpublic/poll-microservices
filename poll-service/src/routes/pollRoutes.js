const express = require('express');
const { createPoll, getAllPolls, getPollById, updatePoll, deletePoll } = require('../controllers/pollController');
const router = express.Router();

router.post('/', createPoll);
router.get('/', getAllPolls);
router.get('/:id', getPollById);
router.put('/:id', updatePoll);
router.delete('/:id', deletePoll);

module.exports = router;