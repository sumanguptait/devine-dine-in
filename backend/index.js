const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const port = 3100;
const mongoDB = require("./db");
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
mongoDB();
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(express.json());
app.use("/api", require("./routes/CreateUser"));
app.use("/api", require("./routes/DisplayData"));
app.use("/api", require("./routes/OrderData"));
app.use("/api", require("./routes/Payment.js"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
