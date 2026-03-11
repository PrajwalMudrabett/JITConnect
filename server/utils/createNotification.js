import Notification from '../models/Notification.js';

const createNotification = async (recipientId, senderId, type, message, link = '', relatedData = {}) => {
  try {
    const notification = await Notification.create({
      recipient: recipientId,
      sender: senderId,
      type,
      message,
      link,
      ...relatedData
    });
    return notification;
  } catch (error) {
    console.error('Error creating notification:', error);
    return null;
  }
};

export default createNotification;
