var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var SynopsisSchema = new Schema({
  // `title` is required and of type String
  title: {
    type: String,
    required: true
  },
  // `excerpt` is required and of type String
  excerpt: {
    type: String,
    required: true
  },

});

// This creates our model from the above schema, using mongoose's model method
var Synopsis = mongoose.model("Synopsis", SynopsisSchema);

// Export the Synopsis model
module.exports = Synopsis;
