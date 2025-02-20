import { Request, Response, NextFunction } from 'express';
import jwt, {JwtPayload} from 'jsonwebtoken';
import __User, { IUser } from "../../models/user/User.js";


const authMiddleware = async (req: Request, res: any, next: NextFunction) => {
    // const token = req.cookies['n-token'] || (req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1] : null);
    // const token = req.cookies.token;
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized user!" });
    }
    try {
        // const decoded = jwt.verify(token, process.env.JWT_SECRET || "CLIENT_SECRET_KEY")  as IUser;
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "CLIENT_SECRET_KEY")  as JwtPayload & { id: string };
        const user = await __User.findById(decoded.id);
        if (!user || user.currentToken !== token) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        req.user = user; // Attach user details to the request
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: "Unauthorized user!" });
    }
};

export default authMiddleware;

