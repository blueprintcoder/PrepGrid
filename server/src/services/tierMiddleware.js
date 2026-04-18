import User from '../models/User.js';
import InterviewSession from '../models/InterviewSession.js';

/* Middleware to check if the user has exceeded their free tier limits.
   LIMITS: 
   - Max 5 interviews per month for FREE users.
   - Max 10 practice questions for FREE users.

   */
export const checkTierLimit = async (req, res, next) => {
  try {
    let clerkId = req.auth?.userId;
    
    if (!clerkId) {
      const latestUser = await User.findOne().sort({ createdAt: -1 });
      if (!latestUser) return next();
      clerkId = latestUser.clerkId;
    }

    const user = await User.findOne({ clerkId });
    if (!user) return next();

    // If user is Pro, bypass all limits.
    if (user.isPro) return next();

    // INTERVIEW LIMIT: 5 per month (last 30 days)
    if (req.url.includes('/upload-resume') || req.url.includes('/start-session')) {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const monthlyInterviewCount = await InterviewSession.countDocuments({ 
        userId: user._id, 
        status: 'completed',
        createdAt: { $gte: thirtyDaysAgo }
      });

      if (monthlyInterviewCount >= 5) {
        return res.status(403).json({ 
          message: 'Free tier limit reached (5 interviews per month). Upgrade to Pro for unlimited access!', 
          error: 'LIMIT_REACHED',
          type: 'INTERVIEW',
          isPro: false 
        });
      }
    }

    // PRACTICE LIMIT: 15 questions total for free users
    if (req.url.includes('/practice/submit') || req.url.includes('/practice/run')) {
      if ((user.solvedQuestions || []).length >= 10) {
        return res.status(403).json({ 
          message: 'Free tier limit reached (10 practice questions). Upgrade to Pro for unlimited access!', 
          error: 'LIMIT_REACHED',
          type: 'PRACTICE',
          isPro: false 
        });
      }
    }

    next();
  } catch (error) {
    console.error('[Tier Middleware Error]:', error);
    next();
  }
};
