// importing the dependencies
const express = require("express");
const mongoose = require("mongoose");
const myRoute = require("./src/routes/myRoute.js");
const app = express();
// We make a file config folder were the data is stored.Or connect to the mongodb
const config = require("./src/Config/config");
const routers = require("./src/routes/myRoute.js");
const port = process.env.PORT || 8000;

//mongoose connection
mongoose
  .connect(config.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection is successful");
  })
  .catch((error) => {
    console.log("No connection", error);
  });

//Route connection
app.use(express.json());
app.use("/api", myRoute);
app.use(express.static("public")); //It's help to show in chrome
app.use("/uploads", express.static("uploads"));

app.listen(port, () => {
  console.log(`Server Started at ${8000}`);
});
module.exports = routers;
