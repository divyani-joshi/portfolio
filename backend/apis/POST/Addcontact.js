const connectDB = require("../../db/dbconnect");

let AddContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    let db = await connectDB();

    let collection = db.collection("contacts");

    let result = await collection.insertOne({
      name,
      email,
      subject,
      message,
      status: "Active",
      createdAt: new Date(),
    });

    return res.status(201).send({
      success: true,
      message: "Contact submitted successfully",
      result,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { AddContact };