const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(success => {
    console.log("Successfully connected to MongoDB!");
  })
  .catch(error => {
    console.err(`Connection couldn't be established! There was an error: ${error}`);
  });

module.exports = mongoose;
