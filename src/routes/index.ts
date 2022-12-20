import { login, register } from '../controllers/auth';

import { Router, Response } from 'express';

const router = Router();

//AUTH

router.post('/register', register);
router.post('/login', login);

router.get('/', (_, res: Response) => res.json('path live 🚀'));
export default router;
