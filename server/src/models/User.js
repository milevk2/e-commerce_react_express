const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { cartSchema } = require('./Cart.js');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: String,
  userName: String,
  email: String,
  password: String,
  createdAt: Date,
  cart: [cartSchema],
});


userSchema.virtual("repassword").set(function (value) {

  if (value != this.password) {
    throw new mongoose.MongooseError("Password missmatch!");
  }
});


userSchema.pre("save", async function () {

  const hash = await bcrypt.hash(String(this.password), 10);
  this.password = hash;

});

const User = mongoose.model("User", userSchema);
module.exports = User;