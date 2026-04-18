import express from 'express';
import CodingQuestion from '../models/CodingQuestion.js';
import User from '../models/User.js';

const router = express.Router();

// Middleware: Check if user is admin (Assuming clerkId starts with admin_ for debug)
const isAdmin = (req, res, next) => {
  // Replace this logic with your actual admin verification (e.g., Clerk roles or specific admin list)
  if (req.auth && (req.auth.userId.startsWith('admin_') || req.auth.claims?.role === 'admin')) {
    next();
  } else {
    // For Hackathon bypass - during development allow all
    next();
    // res.status(403).json({ message: 'Access denied: Admin only' });
  }
};

router.use(isAdmin);

// Create new coding question
router.post('/questions', async (req, res) => {
  try {
    const question = new CodingQuestion(req.body);
    await question.save();
    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update coding question
router.put('/questions/:id', async (req, res) => {
  try {
    const question = await CodingQuestion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete coding question
router.delete('/questions/:id', async (req, res) => {
  try {
    await CodingQuestion.findByIdAndDelete(req.params.id);
    res.json({ message: 'Question deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all users for admin with activity stats
router.get('/users', async (req, res) => {
  try {
    const usersWithStats = await User.aggregate([
      {
        $lookup: {
          from: 'interviewsessions',
          localField: '_id',
          foreignField: 'userId',
          as: 'sessions'
        }
      },
      {
        $project: {
          name: 1,
          email: 1,
          clerkId: 1,
          isPro: 1,
          streak: 1,
          createdAt: 1,
          solvedQuestionsCount: { $size: { $ifNull: ["$solvedQuestions", []] } },
          interviewCount: { 
            $size: { 
              $filter: { 
                input: "$sessions", 
                as: "s", 
                cond: { $eq: ["$$s.status", "completed"] } 
              } 
            } 
          }
        }
      }
    ]);
    res.json(usersWithStats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Basic Analytics
router.get('/analytics', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalQuestions = await CodingQuestion.countDocuments();
    
    // Most attempted topic logic (aggregate from users' solved questions or quiz results)
    const userStats = await User.aggregate([
      { $unwind: "$quizResults" },
      { $group: { _id: "$quizResults.topic", count: { $sum: 1 }, avgScore: { $avg: "$quizResults.score" } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      totalUsers,
      totalQuestions,
      topicStats: userStats
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
