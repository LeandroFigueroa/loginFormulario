import { Router } from 'express'
import {
    renderRegisterController,
    renderLoginController,
    renderRegisterErrorController,
    renderLoginErrorController
} from '../controllers/userController.js'
const router = Router();

router.get('/register', renderRegisterController)
router.get('/login', renderLoginController)
router.get('/register/Error', renderRegisterErrorController)
router.get('/login/Error', renderLoginErrorController)

export default router