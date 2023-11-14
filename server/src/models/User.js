
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the address subdocument
const addressSchema = new Schema({
  country: String,
  city: String,
  street: String,
  streetNumber: String,
});

// Define the main schema for the user
const userSchema = new Schema({
  _id: String, // This is a string representing the UUID
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  createdAt: Date,
  updatedAt: Date,
  imageUrl: String,
  address: addressSchema, // Embed the address subdocument
});

// Create a Mongoose model for the user schema

const User = mongoose.model("User", userSchema);

module.exports = User;