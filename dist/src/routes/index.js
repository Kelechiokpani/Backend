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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcm91dGVzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDakMsT0FBTyxVQUFVLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEMsT0FBTyxVQUFVLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEMsT0FBTyxjQUFjLE1BQU0sa0NBQWtDLENBQUM7QUFHOUQsTUFBTSxNQUFNLEdBQUcsTUFBTSxFQUFFLENBQUM7QUFFeEIseUNBQXlDO0FBRXpDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ2hDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxjQUFjLENBQUMsQ0FBQztBQUVoRCxvQ0FBb0M7QUFJcEMsZUFBZSxNQUFNLENBQUMifQ==