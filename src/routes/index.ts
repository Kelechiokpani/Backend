
import { Router } from 'express';
import authRoutes from './user/auth.js';
import userRoutes from './user/user.js';
import authMiddleware from "../middleware/user/middleware.js";


const router = Router();

// Use route prefixes for each route file

router.use('/auth', authRoutes);
router.use('/user', userRoutes, authMiddleware);

// router.use('/users', userRoutes);



export default router;


