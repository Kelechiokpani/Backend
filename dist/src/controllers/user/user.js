import __User from '../../models/user/User.js';
import { AccountValidation, } from "../../validation/index.js";
import Base from "../../../base.js";
import { isDev } from "../../helpers/config.js";
const ErrorMessage = "User ID is required to Continue";
const InvalidCredential = "Invalid user credential email is not registered";
const InvalidLogin = "Invalid login credentials";
class UserDatasource extends Base {
    constructor() {
        super(...arguments);
        this.userLogout = async (data, res) => {
            try {
                await new AccountValidation().userLogout(data);
                const { userId } = data;
                if (!userId) {
                    return { success: false, message: ErrorMessage };
                }
                // Find the user by their _id safely
                const user = await __User.findById(userId);
                if (!user) {
                    return { success: false, message: "User not found" };
                }
                user.currentToken = null;
                await user.save();
                res.cookie("token", "", { httpOnly: true,
                    secure: !isDev,
                    sameSite: "strict",
                    expires: new Date(0) });
                return ({ success: true, message: "Logout successful" });
            }
            catch (error) {
                const errorMessage = error.message.includes("Cast to ObjectId failed for value")
                    ? "Invalid User ID provided."
                    : error.message || "Unable to complete logout process";
                return ({ success: false, message: errorMessage });
            }
        };
    }
}
export default UserDatasource;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb250cm9sbGVycy91c2VyL3VzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxNQUE0QixNQUFNLDJCQUEyQixDQUFDO0FBQ3JFLE9BQU8sRUFDSCxpQkFBaUIsR0FFcEIsTUFBTSwyQkFBMkIsQ0FBQztBQUNuQyxPQUFPLElBQUksTUFBTSxrQkFBa0IsQ0FBQztBQUNwQyxPQUFPLEVBQWMsS0FBSyxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFHM0QsTUFBTSxZQUFZLEdBQUcsaUNBQWlDLENBQUM7QUFDdkQsTUFBTSxpQkFBaUIsR0FBRyxpREFBaUQsQ0FBQztBQUM1RSxNQUFNLFlBQVksR0FBRywyQkFBMkIsQ0FBQztBQUdqRCxNQUFNLGNBQWUsU0FBUSxJQUFJO0lBQWpDOztRQUVXLGVBQVUsR0FBRyxLQUFLLEVBQUUsSUFBbUIsRUFBRSxHQUFRLEVBQWtELEVBQUU7WUFDeEcsSUFBSSxDQUFDO2dCQUNELE1BQU0sSUFBSSxpQkFBaUIsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDL0MsTUFBTSxFQUFDLE1BQU0sRUFBQyxHQUFHLElBQUksQ0FBQTtnQkFDckIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNWLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsQ0FBQztnQkFDckQsQ0FBQztnQkFDRCxvQ0FBb0M7Z0JBQ3BDLE1BQU0sSUFBSSxHQUFRLE1BQU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDaEQsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO29CQUNSLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxDQUFDO2dCQUN6RCxDQUFDO2dCQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO2dCQUN6QixNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDbEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUNsQixFQUFFLFFBQVEsRUFBRSxJQUFJO29CQUNaLE1BQU0sRUFBRSxDQUFDLEtBQUs7b0JBQ2QsUUFBUSxFQUFFLFFBQVE7b0JBQ2xCLE9BQU8sRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2hDLE9BQU8sQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLENBQUMsQ0FBQztZQUM3RCxDQUFDO1lBQUMsT0FBTyxLQUFVLEVBQUUsQ0FBQztnQkFDbEIsTUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsbUNBQW1DLENBQUM7b0JBQzVFLENBQUMsQ0FBQywyQkFBMkI7b0JBQzdCLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLG1DQUFtQyxDQUFDO2dCQUMzRCxPQUFPLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUMsQ0FBQyxDQUFDO1lBQ3RELENBQUM7UUFDTCxDQUFDLENBQUM7SUFJTixDQUFDO0NBQUE7QUFFRCxlQUFlLGNBQWMsQ0FBQyJ9