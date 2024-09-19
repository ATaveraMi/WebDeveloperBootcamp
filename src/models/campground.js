const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { isLoggedIn } = require("../middleware/auth.js");

const CampGroundSchema = new Schema({
  title: String,
  price: Number,
  description: String,
  location: String,
  latitude: mongoose.Decimal128,
  longitude: mongoose.Decimal128,
  image: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});
CampGroundSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});
module.exports = mongoose.model("CampGround", CampGroundSchema);
