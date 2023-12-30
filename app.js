const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const PORT = 3000;

// MongoDB connection string using environment variables
const mongoUri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@resource-usage.yduizio.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;

app.get('/usage/:userId', async (req, res) => {
  const userId = req.params.userId;

  // Connect to MongoDB
  const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();

  try {
    const db = client.db(process.env.MONGO_DATABASE);
    const collection = db.collection('usage');

    // Example: Retrieve usage data for a specific user
    const result = await collection.findOne({ userId });
    res.json(result);
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
