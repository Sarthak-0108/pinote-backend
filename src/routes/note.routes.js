import express from 'express';
import noteController from '../controllers/note.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router()

router.post('/', authMiddleware.authUser, noteController.createNote)

router.put('/:noteId', authMiddleware.authUser, noteController.updateNote)

export default router