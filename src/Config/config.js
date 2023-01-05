const MONGO_URL = "mongodb://localhost:27017/api-new-database";

module.exports = {
  MONGO_URL,
};

// mongoose
//   .connect("mongodb://localhost:27017/api-db", {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })

//   .then(() => {
//     console.log("connection is successful");
//   })
//   .catch((e) => {
//     console.log("No connect");
//   });
