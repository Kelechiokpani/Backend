import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Access forbidden: Admins only!' });
    }
    next();
};

export default adminMiddleware;
