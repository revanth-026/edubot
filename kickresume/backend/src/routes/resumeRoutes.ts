import express from 'express';
import {
  createResume,
  getResumeById,
  updateResume,
  deleteResume,
  getAllResumesByUser,
} from '../controllers/resumeController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/').post(protect, createResume).get(protect, getAllResumesByUser);
router.route('/:id').get(protect, getResumeById).put(protect, updateResume).delete(protect, deleteResume);

export default router;
