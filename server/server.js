const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/index");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => console.log("Error connecting database", err));

app.use("/api", routes);

// Start the server, listening on port 5000.
const port = process.env.PORT ||5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
