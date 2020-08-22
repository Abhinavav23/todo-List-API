const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    trim: true,
  },

  taskOwner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
});

const task = mongoose.model("tasks", taskSchema);

module.exports = task;
