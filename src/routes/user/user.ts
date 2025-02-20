import {Router, Request, Response, NextFunction} from 'express';
import UserDatasource from "../../controllers/user/user.js";


const router = Router();
const User = new UserDatasource();


router.post('/logout', async (req: Request, res: any, next: NextFunction) => {
    try {
        const result = await User.userLogout(req.body, res);
        if (result.success) {
            return res.status(200).json(result);
        }
        return res.status(400).json({result});
    } catch (error) {
        console.log(error, "response error")
        next(error);
    }
});


export default router;
