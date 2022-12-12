import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Category = new Schema ({
    id: {
        type: String
    },
    name: {
        type: String
    }
})

module.exports = mongoose.model("Category", Category);
