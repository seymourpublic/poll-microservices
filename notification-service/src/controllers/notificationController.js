const Notification = require('../models/notificationModel');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Create Notification
const createNotification = async (req, res) => {
  try {
    const { userId, message } = req.body;

    const notification = new Notification({ userId, message });
    const savedNotification = await notification.save();

    // Send Email Notification (optional)
    sendEmailNotification(userId, message);

    res.status(201).json({ message: 'Notification created', notification: savedNotification });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Fetch Notifications for a User
const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.userId });
    res.json(notifications);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Mark Notification as Read
const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!notification) return res.status(404).json({ message: 'Notification not found' });
    res.json({ message: 'Notification marked as read', notification });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Helper Function to Send Email Notifications
const sendEmailNotification = (userId, message) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userId, // Assuming userId is an email address
    subject: 'New Notification',
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email error:', error.message);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = { createNotification, getUserNotifications, markAsRead };