import { currentUser, forgotPassword, login, register } from '../controllers/auth';

import { Router, Response } from 'express';
import { requireSignin } from '../middlewares';

const router = Router();

//AUTH

router.post('/register', register);
router.post('/login', login);
router.get('/current-user', requireSignin, currentUser);
router.post('/forgot-password', forgotPassword);

router.get('/', (_, res: Response) => res.json('path live 🚀'));
export default router;
