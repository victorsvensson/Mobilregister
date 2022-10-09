const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
        min: 0,
    },
    model: {
        type: String,
        required: true,
    },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
