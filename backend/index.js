require("dotenv").config();
const express = require("express")
const cors = require("cors")
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8000;
const connectDB = require("./db/dbconnect");
const { GetFeedbacks } = require("./apis/GET/Getfeedback");
const { AddFeedback } = require("./apis/POST/Addfeddback");

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
app.post("/addfeedback" , AddFeedback)

app.listen(PORT, ()=>{
    console.log(`Portfoilo server started on PORT ${PORT}`);
});