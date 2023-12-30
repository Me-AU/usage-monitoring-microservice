const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3000;


// Middleware to parse JSON requests
app.use(express.json());


// MongoDB connection string using environment variables
const mongoUri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@resource-usage.yduizio.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;


// Function to monitor user usage
const monitorUserUsage = async (userId, bandwidthBytes, res) => {
  const client = new MongoClient(mongoUri);
  await client.connect();

  try {
    const db = client.db(process.env.MONGO_DATABASE);
    const collection = db.collection('usage');

    // Check if the user exists and retrieve the document
    const user = await collection.findOne({ userId });

    // Get the current date
    const currentDate = new Date();

    let result; // Declare result outside the conditional blocks

    if (user) {
      // Check if it's a new day
      if (!isSameDay(currentDate, user.lastUpdated)) {
        // Reset usageCount to 0 for a new day
        console.log('New day.');
        result = await collection.findOneAndUpdate(
          { userId },
          { $set: { usageCount: 0, lastUpdated: currentDate } },
          { returnDocument: 'after' } // Retrieve the updated document
        );
      }
      // Increment usageCount for the existing day based on bandwidthBytes
      result = await collection.findOneAndUpdate(
        { userId },
        { $inc: { usageCount: bandwidthBytes } },
        { returnDocument: 'after' } // Retrieve the updated document
      );

      // If the user does not exist, create a new document
    } else {
      await collection.insertOne({
        userId,
        usageCount: bandwidthBytes, // Start usageCount from the provided bandwidthBytes
        lastUpdated: currentDate,
      });
      result = await collection.findOne({ userId });
    }

    res.json({
      success: true,
      message: 'User usage updated successfully.',
      usageInfo: { result },
    });

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  } finally {
    await client.close();
  }
};

// Function to check if two dates represent the same day
const isSameDay = (date1, date2) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};


// Function to alert user on high bandwidth usage
const alertUserOnHighUsage = async (userId, res) => {
  // Connect to MongoDB
  const client = new MongoClient(mongoUri);
  await client.connect();

  try {
    const db = client.db(process.env.MONGO_DATABASE);
    const collection = db.collection('usage');

    // Check if the user exists
    const user = await collection.findOne({ userId });

    if (user) {
      // Implement your logic for alerting the user here
      // This can include sending notifications or emails to the user
      // You can customize this based on your application's requirements
      // For now, let's just simulate a success response
      return true;
    } else {
      console.error('User not found.');
      res.status(404).json({ success: false, message: 'User not found.' });
      return false;
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error.' });
    return false;
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
};


// API endpoint to monitor user usage
app.post('/monitor/:userId', async (req, res) => {
  const userId = req.params.userId;
  const bandwidthBytes = req.body.bandwidthBytes; // Assuming bandwidthBytes is sent in the request body

  try {
    // Check if bandwidthBytes is a valid positive number
    if (!isNaN(bandwidthBytes) && bandwidthBytes >= 0) {
      // Pass the 'res' object and bandwidthBytes to the monitorUserUsage function
      await monitorUserUsage(userId, bandwidthBytes, res);
    } else {
      res.status(400).json({ success: false, message: 'Invalid bandwidthBytes value.' });
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});
  

// API endpoint to alert user on high bandwidth usage
app.post('/alert/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const success = await alertUserOnHighUsage(userId, res);

    if (success) {
      res.json({ success: true, message: 'User alerted on high bandwidth usage.' });
    } 
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
