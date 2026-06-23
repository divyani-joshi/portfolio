const connectDB = require("../../db/dbconnect");

let GetFeedbacks = async (req, res) => {
  try {
    let db = await connectDB();

    let collection = db.collection("feedbacks");

    let feedbacks = await collection
      .find({ status: "Active" })
      .sort({ createdAt: -1 })
      .toArray();

    return res.status(200).send({
      success: true,
      feedbacks
    });

  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message
    });
  }
};

module.exports = { GetFeedbacks };