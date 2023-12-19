const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String },
  age: { type: Number },
});

const schemaOfUser = mongoose.model("graphql_api", userSchema);
module.exports = schemaOfUser;
