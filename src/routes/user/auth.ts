import {Router, Request, Response, NextFunction} from 'express';
import AuthDatasource from "../../controllers/user/auth.js";
// import authMiddleware from "../../middleware/user/middleware.js";


const router = Router();
const Auth = new AuthDatasource();

    router.post('/register', async (req: Request, res: any, next: NextFunction) => {
            try {
                const result = await Auth.registerUser(req.body);
                if (result.success) {
                    return res.status(201).json(result);
                }
                return res.status(400).json({result});
            } catch (error) {
                next(error);
            }
        });

    router.post('/sendVerification', async (req: Request, res: any, next: NextFunction) => {
            try {
                const result = await Auth.sendVerification(req.body);
                if (result.success) {
                    return res.status(201).json(result);
                }
                return res.status(400).json({result});
            } catch (error) {
                next(error);
            }
        });

    router.post('/verify', async (req: Request, res: any, next: NextFunction) => {
            try {
                const result = await Auth.verifyEmail(req.body);
                if (result.success) {
                    return res.status(201).json(result);
                }
                return res.status(400).json({result});
            } catch (error) {
                next(error);
            }
        });




    router.post('/login', async (req: Request, res: any, next: NextFunction) => {
            try {
                const result = await Auth.userLogin(req.body, res);
                if (result.success) {
                    return res.status(200).json(result);
                  }
                return res.status(400).json({result});
            } catch (error) {
                next(error);
            }
        });

    router.post('/forgotPassword', async (req: Request, res: any, next: NextFunction) => {
        try {
            const result = await Auth.forgotUserPassword(req.body);
            if (result.success) {
                return res.status(200).json(result);
            }
            return res.status(400).json({result});
        } catch (error) {
            next(error);
        }
    });

    router.post('/resendOTP', async (req: Request, res: any, next: NextFunction) => {
        try {
            const result = await Auth.forgotUserPassword(req.body);
            if (result.success) {
                return res.status(200).json(result);
            }
            return res.status(400).json({result});
        } catch (error) {
            next(error);
        }
    });

    router.post('/resetPassword', async (req: Request, res: any, next: NextFunction) => {
        try {
            const result = await Auth.resetPassword(req.body);
            if (result.success) {
                return res.status(200).json(result);
            }
            return res.status(400).json({result});
        } catch (error) {
            next(error);
        }
    });




export default router;
