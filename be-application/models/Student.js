const mongoose = require("mongoose");

const enrolledTopicSchema = new mongoose.Schema({
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" },
  status: { type: String, enum: ["Pending", "Done"], default: "Pending" }
});

const studentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  enrolledTopics: { type: [enrolledTopicSchema], default: [] },
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
