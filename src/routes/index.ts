import { register } from '../controllers/auth';

const express = require('express');

const router = express.Router();

//AUTH

router.post('/register', register);

export default router;
