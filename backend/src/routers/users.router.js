import express from 'express'
import { authentication } from '../middlewares/auth.middleware.js'
import { UserController } from '../controllers/user.controller.js'
const router = express.Router()
router.get('/myInfo',authentication,UserController)

export default router



