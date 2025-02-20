import jwt from 'jsonwebtoken';
import __User from "../../models/user/User.js";
const authMiddleware = async (req, res, next) => {
    // const token = req.cookies['n-token'] || (req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1] : null);
    // const token = req.cookies.token;
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized user!" });
    }
    try {
        // const decoded = jwt.verify(token, process.env.JWT_SECRET || "CLIENT_SECRET_KEY")  as IUser;
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "CLIENT_SECRET_KEY");
        const user = await __User.findById(decoded.id);
        if (!user || user.currentToken !== token) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        req.user = user; // Attach user details to the request
        next();
    }
    catch (error) {
        res.status(401).json({ success: false, message: "Unauthorized user!" });
    }
};
export default authMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9taWRkbGV3YXJlL3VzZXIvbWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEdBQWlCLE1BQU0sY0FBYyxDQUFDO0FBQzdDLE9BQU8sTUFBaUIsTUFBTSwyQkFBMkIsQ0FBQztBQUcxRCxNQUFNLGNBQWMsR0FBRyxLQUFLLEVBQUUsR0FBWSxFQUFFLEdBQVEsRUFBRSxJQUFrQixFQUFFLEVBQUU7SUFDeEUsK0lBQStJO0lBQy9JLG1DQUFtQztJQUNuQyxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsT0FBTyxFQUFFLEtBQUssSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0UsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ1QsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBQ0QsSUFBSSxDQUFDO1FBQ0QsOEZBQThGO1FBQzlGLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxJQUFJLG1CQUFtQixDQUFpQyxDQUFDO1FBQ2pILE1BQU0sSUFBSSxHQUFHLE1BQU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLEtBQUssRUFBRSxDQUFDO1lBQ3ZDLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDO1FBQzdFLENBQUM7UUFDRCxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLHFDQUFxQztRQUN0RCxJQUFJLEVBQUUsQ0FBQztJQUNYLENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUM7SUFDNUUsQ0FBQztBQUNMLENBQUMsQ0FBQztBQUVGLGVBQWUsY0FBYyxDQUFDIn0=