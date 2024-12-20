const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const connectRabbitMQ = require('./services/rabbitMQ');
const notificationRoutes = require('./routes/notificationRoutes');
require('dotenv').config();

const app = express();
connectDB();
connectRabbitMQ();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/notifications', notificationRoutes);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Notification service running on port ${PORT}`));
