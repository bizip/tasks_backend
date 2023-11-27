import UserService from "../../services/userService";
import { decodeToken } from "../verifications/verifyToken";
export default class Auth {
  static async isTokenExist(req, res, next) {
    try {
      if (!req.headers.authorization) {
        return res.status(401).json({ message: "Token not found" });
      }
      return next();
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  }

  static async isTokenValid(req, res, next) {
    try {
      const authToken = req.headers.authorization;
      const { email } = await decodeToken(authToken);
      if (!email) {
        return res.status(401).json({ message: "Invalid Token" });
      }
      res.email = email;
      return next();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async isUserExists(req, res, next) {
    try {
      const user = await UserService.findByEmail(res.email);
      const authToken = req.headers.authorization;
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      if (user.authToken == null) {
        return res.status(401).json({ message: "user not logged in" });
      }
      if (authToken !== user.authToken) {
        return res.status(403).json({ message: "Invalid Token" });
      }
      res.id = user.id;
      return next();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}
