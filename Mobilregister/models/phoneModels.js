const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PhoneSchema = new mongoose.Schema({
    modelName: {
        type: String,
        required: true,
    },
});

const PhoneModel = mongoose.model("PhoneModel", PhoneSchema);

module.exports = PhoneModel;
