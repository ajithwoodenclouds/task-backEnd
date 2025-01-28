import express from 'express';
import { register, login, getUsers } from '../controllers/auth.controller';
import {protect} from "../middlewares/auth.middleware"

const router = express.Router();

router.post('/register', register as any);
router.post('/login', login as any);
router.get('/users', protect as any, getUsers); 


export default router;
