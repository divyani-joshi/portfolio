require("dotenv").config();
const express = require("express")
const cors = require("cors")
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8000;
const connectDB = require("./db/dbconnect");
const { GetFeedbacks } = require("./apis/GET/Getfeedback");
const { AddFeedback } = require("./apis/POST/Addfeddback");
const { GetContacts } = require("./apis/GET/Getcontact");
const { AddContact } = require("./apis/POST/Addcontact");

app.use(express.json());
app.use(cors({
  origin: true,
  credentials: true
}));
connectDB();


app.get("/", (req,res) => {
    res.send("welcom to the portfolio API")
});
app.get("/getfeedback", GetFeedbacks)
app.get("/getcontact" , GetContacts)
app.post("/addfeedback" , AddFeedback)
app.post("/addcontact", AddContact)

app.listen(PORT, ()=>{
    console.log(`Portfoilo server started on PORT ${PORT}`);
});