var mongoose = require('mongoose');

var donerstationary = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
});

module.exports = new mongoose.model('DonerDetail', donerstationary);
