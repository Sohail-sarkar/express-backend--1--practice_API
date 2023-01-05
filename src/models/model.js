const { Schema, model } = require("mongoose");
const validator = require("validator");

const Useridentity = new Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
    unique: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, "Please provide your email "],
    unique: [true, "Email id is present already"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new error("invalid Email");
      }
    },
  },

  password: {
    type: String,
    minLength: 6,
    maxLength: 8,
  },

  gender: {
    type: String,
    enum: { values: ["male", "female"], massage: "{Value} is not supported" },
  },
});

module.exports = model("Shadow", Useridentity);
