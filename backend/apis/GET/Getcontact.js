const connectDB = require("../../db/dbconnnect");

let GetContacts = async (req, res) => {
  try {
    let db = await connectDB();

    let collection = db.collection("contacts");

    let contacts = await collection
      .find({ status: "Active" })
      .sort({ createdAt: -1 })
      .toArray();

    return res.status(200).send({
      success: true,
      contacts,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { GetContacts };