import express from 'express';
import multer from 'multer';
import { 
  processResume, 
  startSession, 
  submitResponse, 
  getResults, 
  getUserHistory,
  getUserProfile 
} from '../controllers/interviewController.js';
import { getUserGrowth } from '../controllers/analyticsController.js';
import { checkTierLimit } from '../services/tierMiddleware.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }).single('resume');

router.post('/upload-resume', checkTierLimit, (req, res, next) => {
    console.log('[MULTER] Received upload-resume request...');
    upload(req, res, (err) => {
        if (err) {
            console.error('[MULTER ERROR] Failed to handle file upload:', err);
            return res.status(500).json({ message: 'File upload error', error: err.message });
        }
        console.log('[MULTER] File upload parsed successfully.');
        next();
    });
}, processResume);
router.post('/start-session', checkTierLimit, startSession);
router.post('/submit-turn', submitResponse); 
router.get('/results/:sessionId', getResults);
router.get('/history', getUserHistory);
router.get('/user-profile', getUserProfile);
router.get('/growth/:userId', getUserGrowth);

export default router;
