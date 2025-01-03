// pages/api/bookings.js

import { MongoClient, ObjectId } from 'mongodb';

// MongoDB connection URI and database name
const MONGODB_URI = process.env.MONGODB_URI;  // Ensure this is set in your environment variables
const DB_NAME = process.env.MONGODB_DB_NAME || 'restaurant-booking';  // Adjust if needed

// MongoDB client setup
const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
let db;

// Function to connect to the MongoDB database
const connectDb = async () => {
  if (db) return db;
  await client.connect();
  db = client.db(DB_NAME);
  return db;
};

// DELETE method to delete a booking
const deleteBooking = async (req, res) => {
  if (req.method === 'DELETE') {
    const { id } = req.body;  // Get the booking ID from the request body

    if (!id) {
      return res.status(400).json({ message: 'Booking ID is required' });
    }

    try {
      // Connect to the database
      const db = await connectDb();

      // Delete the booking from the database by its ID
      const result = await db.collection('bookings').deleteOne({ _id: ObjectId(id) });

      if (result.deletedCount === 1) {
        return res.status(200).json({ message: 'Booking deleted successfully' });
      } else {
        return res.status(404).json({ message: 'Booking not found' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Failed to delete booking', error: error.message });
    }
  } else {
    // Return error if method is not DELETE
    res.status(405).json({ message: 'Method not allowed' });
  }
};

// Main handler for API route
export default async function handler(req, res) {
  // Handle the DELETE request
  if (req.method === 'DELETE') {
    return deleteBooking(req, res);
  }

  // Handle unsupported methods
  res.status(405).json({ message: 'Method Not Allowed' });
}
