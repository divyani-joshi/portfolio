const connectDB = require("../../db/dbconnect");

let AddFeedback = async (req, res) => {
  try {
    const { name, rating, message } = req.body;

    if (!name || !rating || !message) {
      return res.status(400).send({
        success: false,
        message: "All fields are required"
      });
    }

    let db = await connectDB();

    let collection = db.collection("feedbacks");
    console.log("Rating Received:", rating);
console.log("Type:", typeof rating);

   const parsedRating = parseInt(rating);

if (isNaN(parsedRating)) {
  return res.status(400).send({
    success: false,
    message: "Invalid rating"
  });
}

await collection.insertOne({
  name,
  rating: parsedRating,
  message,
  status: "Active",
  createdAt: new Date()
});

    return res.status(201).send({
      success: true,
      message: "Feedback added successfully"
    });

  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message
    });
  }
};

module.exports = { AddFeedback };