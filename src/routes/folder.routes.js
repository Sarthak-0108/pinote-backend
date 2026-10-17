import express from 'express'
import folderController from '../controllers/folder.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/', authMiddleware.authUser, folderController.createFolder);
router.get('/:folderId/notes', authMiddleware.authUser, folderController.getFolderNotes)
router.get('/', authMiddleware.authUser, folderController.getFolders)

export default router;