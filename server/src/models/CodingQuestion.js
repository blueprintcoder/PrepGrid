import mongoose from "mongoose";

const codingQuestionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    default: "Easy",
  },
  topic: { type: String, required: true },
  inputFormat: String,
  outputFormat: String,
  constraints: String,
  sampleInput: String,
  sampleOutput: String,
  testCases: [
    {
      input: String,
      expectedOutput: String,
      isSample: { type: Boolean, default: false },
    },
  ],
  solutionCode: {
    language: String,
    code: String,
  },
  createdAt: { type: Date, default: Date.now },
});

const CodingQuestion = mongoose.model("CodingQuestion", codingQuestionSchema);
export default CodingQuestion;
