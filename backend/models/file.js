const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FileSchema = new Schema({
  file_name: { type: String, required: true },
  file_size: { type: Number, require: true },
  created_at: { type: Date, required: true },
});

module.exports = mongoose.model("File", FileSchema);
