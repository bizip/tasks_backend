/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { joiValidationError } from "../../helper/joiErrorTemplate";
import Util from "../../helper/utils";
import { signupValidateSchema } from "../../helper/validateSchemas";
import UserService from "../../services/userService";
import { decodeToken } from "../verifications/verifyToken";

const util = new Util();
class Validator {
  static async signupValidate(req, res, next) {
    try {
      const getEmail = await UserService.findByProp({
        email: req.body.email,
      });
      if (getEmail[0]) {
        util.setError(409, "Email already exists");
        return util.send(res);
      }
      const { error } = signupValidateSchema.validate({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
      });
      return joiValidationError(req, res, next, error);
    } catch (error) {
      util.setError(
        500,
        error.message
          .replace("/", "")
          .replace(/"/g, "")
          .replace("WHERE parameter", "")
      );
      return util.send(res);
    }
  }

  static async verifyEmail(req, res, next) {
    try {
      const data = await decodeToken(req.params.token);
      const userExist = await UserService.findByProp({
        id: data.userId,
      });
      if (userExist[0]) {
        const isVerified = await UserService.findByProp({
          isVerified: true,
          id: data.userId,
        });
        if (isVerified[0]) {
          util.setError(422, "Your account is already verified");
          return util.send(res);
        }
        res.id = data.userId;
        next();
      } else {
        util.setError(404, "Sorry we can't find your account");
        return util.send(res);
      }
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }
  }
}

export default Validator;
