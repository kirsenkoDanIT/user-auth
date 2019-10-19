const { Schema, model } = require('mongoose');

const schema = new Schema({
  password: { type: String, required: true },
  login: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true }
});

module.exports = model('User', schema);
