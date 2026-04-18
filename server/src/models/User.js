import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: { type: String, unique: true, required: true },
  name: String,
  email: { type: String, unique: true },
  resumeText: String,
  isPro: { type: Boolean, default: false },
  streak: { type: Number, default: 0 },
  lastActive: { type: Date, default: Date.now },
  solvedQuestions: [
    { type: mongoose.Schema.Types.ObjectId, ref: "CodingQuestion" },
  ],
  bookmarkedQuestions: [
    { type: mongoose.Schema.Types.ObjectId, ref: "CodingQuestion" },
  ],
  quizResults: [
    {
      topic: String,
      score: Number,
      totalQuestions: Number,
      date: { type: Date, default: Date.now },
    },
  ],
  billingHistory: [
    {
      amount: Number,
      currency: String,
      status: String,
      transactionId: String,
      date: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
export default User;
