const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const pollRoutes = require('./routes/pollRoutes');
const serverless = require('serverless-http');
require('dotenv').config();

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/polls', pollRoutes);

module.exports.handler = serverless(app);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Poll service running on port ${PORT}`));