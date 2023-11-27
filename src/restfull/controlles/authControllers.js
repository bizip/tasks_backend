/* eslint-disable quotes */
import bcrypt from "bcrypt";
import UserService from "../../services/userService";
import dotenv from "dotenv";
import Util from "../../helper/utils";
import { newJwtToken } from "../../helper/tokenGenerator";
import { pick } from "lodash";

dotenv.config();
// const { JWT_SECRET, FRONTEND_URL, EXPIRES_IN } = process.env;
/**
 * @class AuthController
 * @classdesc AuthController
 */

const util = new Util();
class AuthController {
  static async signupWithEmailAndPassword(req, res) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        address: req.body.address,
      };
      const createdUser = await UserService.createUser(newUser);
      return res
        .status(200)
        .json({ message: "User created successfull", data: createdUser });
    } catch (error) {
      return res.status(500).json({ message: error.message || "Failled" });
    }
  }

  static async verifyEmail(req, res) {
    try {
      await UserService.updateAtt(
        {
          isVerified: true,
        },
        {
          id: res.id,
        }
      );
      const { id, RoleId, email } = await UserService.findById(res.id);
      const token = await newJwtToken({ userId: id, RoleId }, "1h");
      const data = { userId: id, email, token };
      const message = "your account was verified!";
      util.setSuccess(200, message, data);
      return util.send(res);
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      console.log(req.body);
      if (!email) {
        return res.status(500).json({ message: "Email Is required" });
      }
      if (!password) {
        return res.status(500).json({ message: "Password is Required" });
      }
      const props = { email };
      const currentUser = await UserService.findByProp(props);
      if (currentUser.length === 0) {
        return res
          .status(500)
          .json({ message: "The user with this email does not exist" });
      }
      const isMatch = await bcrypt.compare(password, currentUser[0].password);
      if (isMatch) {
        const displayData = pick(currentUser[0].dataValues, [
          "firstName",
          "lastName",
          "email",
          "id",
          "RoleId",
        ]);
        const authToken = await newJwtToken(displayData, "5h");
        UserService.updateAtt({ authToken }, { email: displayData.email });
        const data = { displayData, authToken };
        return res.status(200).json({ message: "Loggin successfull", data });
      }
      return res
        .status(401)
        .json({ message: "Incorrect username or password" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async logout(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      await UserService.blacklistToken(token);
      req.user = null;
      return Response.success(res, 200, {
        message: "user logged out",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  }
}

export default AuthController;
