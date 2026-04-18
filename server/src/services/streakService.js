import User from '../models/User.js';

/* Updates the user's daily streak based on their last active date.
   Logic:
   - If last active is TODAY: Do nothing (already maintained).
   - If last active was YESTERDAY: Increment streak.
   - If last active was BEFORE YESTERDAY: Reset streak to 1.
*/
export const updateStreak = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastActive = new Date(user.lastActive || 0);
    lastActive.setHours(0, 0, 0, 0);

    const diffTime = Math.abs(today - lastActive);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      // Kal active that ? 
      user.streak += 1;
    } else if (diffDays > 1) {
      // 1 ya usse jyada din miss ho gye ?
      user.streak = 1;
    } else if (user.streak === 0) {
      // peheli baar h ?
      user.streak = 1;
    }

    user.lastActive = new Date();
    await user.save();
    console.log(`[Streak] User ${userId} streak updated to ${user.streak}`);
    return user.streak;
  } catch (error) {
    console.error('[Streak Error]:', error);
  }
};
