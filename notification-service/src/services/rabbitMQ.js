const amqp = require('amqplib');
require('dotenv').config();

const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URI);
    const channel = await connection.createChannel();
    await channel.assertQueue('notifications');
    console.log('RabbitMQ connected');

    // Consume messages from the queue
    channel.consume('notifications', (msg) => {
      const { userId, message } = JSON.parse(msg.content.toString());
      console.log(`New notification for user ${userId}: ${message}`);
      channel.ack(msg);
    });
  } catch (error) {
    console.error('RabbitMQ connection error:', error.message);
  }
};

module.exports = connectRabbitMQ;