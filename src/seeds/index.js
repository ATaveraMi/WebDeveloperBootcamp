const cities = require("./cities");
const mongoose = require("mongoose");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");
}
main();
const db = mongoose.connection;
db.on("error", console.error.bind(console));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 150; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 2000) + 10;
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      latitude: cities[random1000].latitude,
      longitude: cities[random1000].longitude,
      image: `https://picsum.photos/400?random=${Math.random()}`,
      price: price,
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo officia illum ab perferendis porro excepturi distinctio ad repellat laborum soluta. Repudiandae doloribus ipsam excepturi fuga debitis? Culpa reprehenderit praesentium ipsum?",
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
  console.log("Database closed");
});
