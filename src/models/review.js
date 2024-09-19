const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  body: {
    type: String,
    required: [true, "Farm must have a name"],
  },
  rating: {
    type: String,
  },
});
module.exports = mongoose.model("Review", reviewSchema);
