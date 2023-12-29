const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 3000;

// MongoDB connection string (replace with your MongoDB Atlas connection string)
const mongoUri = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database>?retryWrites=true&w=majority';

app.get('/usage/:userId', async (req, res) => {
  const userId = req.params.userId;

  // Connect to MongoDB
  const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();

  try {
    const db = client.db('your_database_name');
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
