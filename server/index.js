require("dotenv").config();
const express = require("express");
const cors = require('cors')
const app = express();
const router = require("./router/transaction");
const connectDB = require("./database/db");

//middleware should be before routes
app.use(express.json());
app.use(cors())
app.use("/api", router);

app.get("/", (req, res) => {
  res.status(200).send("hello world");
});

connectDB().then(() => {
  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(`server running at port: ${PORT}`);
  });
});
