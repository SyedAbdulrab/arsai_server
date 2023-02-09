const mongoose = require("mongoose");

const promptSchema = mongoose.Schema({
  body: String,
});
const Prompt = mongoose.model("Prompt", promptSchema);
export default Prompt
