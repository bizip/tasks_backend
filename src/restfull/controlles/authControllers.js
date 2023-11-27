/* eslint-disable quotes */
import bcrypt from "bcrypt";
import UserService from "../../services/userService";
// import AuthTokenHelper from '../helpers/AuthTokenHelper';
import dotenv from "dotenv";
import Util from "../../helper/utils";
import { sendLink } from "../../helper/SendVerificationLink";
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
  /**
   * Login Callback method.
   * @function loginCallback
   * @param {Object} req request Object.
   * @param {Object} res response Object.
   * @returns {Object} response Object.
   */
  static async signupWithEmailAndPassword(req, res) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        isVerified: req.body.isVerified,
        address: req.body.address,
      };

      const createdUser = await UserService.createuser(newUser);
      return sendLink(res, createdUser);
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
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
      if (email === null) {
        util.message = "Email is Required";
        util.statusCode = 400;
        return util.send(res);
      }
      if (password === null) {
        util.message = "Password is Required";
        util.statusCode = 400;
        return util.send(res);
      }
      const props = { email };
      const currentUser = await UserService.findByProp(props);
      if (!currentUser) {
        util.message = "User not exist";
        util.statusCode = 404;
        return util.send(res);
      }
      if (currentUser.isVerified === false) {
        util.message = "Please Verify your account";
        util.statusCode = 400;
        return util.send(res);
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

        const authToken = await newJwtToken(displayData, "1h");
        UserService.updateAtt({ authToken }, { email: displayData.email });
        util.statusCode = 200;
        util.type = "success";
        util.message = "User Logged in Successfully";
        util.data = { displayData, authToken };
        return util.send(res);
      }
      util.setError(401, "Incorrect username or password");
      return util.send(res);
    } catch (err) {
      console.log(err);
      util.setError(500, err.message);
      return util.send(res);
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
      console.log(error);
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  }
}

export default AuthController;
