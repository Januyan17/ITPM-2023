var mongoose = require("mongoose");

var stationaryschema = new mongoose.Schema({
  productno: {
    type: String,
    required: true,
  },
  productname: {
    type: String,
    required: true,
  },
  productdescription: {
    type: String,
    required: true,
  },

  image: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = new mongoose.model("Stationary", stationaryschema);
