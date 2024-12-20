const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const voteRoutes = require('./routes/voteRoutes');
const serverless = require('serverless-http');
require('dotenv').config();

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/votes', voteRoutes);

module.exports.handler = serverless(app);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Voting service running on port ${PORT}`));