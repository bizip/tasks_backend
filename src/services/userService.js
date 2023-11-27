/* eslint-disable no-console */
/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
import DB from "../database";

const { User, BlacklistedToken } = DB;

/** Class representing user services. */

class UserService {
  static async createUser(newUser) {
    try {
      const users = await User.create(newUser);
      return users;
    } catch (error) {
      throw error;
    }
  }

  static async findByProp(prop) {
    try {
      const users = await User.findAll({
        where: prop,
      });
      return users;
    } catch (error) {
      throw error;
    }
  }

  static updateAtt(set, prop) {
    return User.update(set, {
      where: prop,
    });
  }

  static findById(modelId) {
    return User.findOne({
      where: { id: modelId },
    });
  }

  static async findAllUsers(param) {
    try {
      const users = await User.findAll({
        where: param,
      });
      return users;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Creates a new message.
   * @param {object} param details of a message.
   * @returns {object} users new message.
   */
  static async findOneUser(param) {
    try {
      const users = await User.findOne({
        where: param,
      });
      return users;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Creates returns a User.
   * @param {object} param details of a message.
   * @returns {object} users new message.
   */
  static async find(param) {
    try {
      const users = await User.findOne({
        where: param,
      });
      return users;
    } catch (error) {
      throw error;
    }
  }

  static async findOrCreateUser(_user) {
    try {
      const [user, created] = await User.findOrCreate({
        where: { microsoftId: _user.microsoftId },
        defaults: _user,
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async blacklistToken(token) {
    try {
      const blacklistedToken = await BlacklistedToken.create({
        token,
        blacklistedAt: new Date(),
      });
      return blacklistedToken;
    } catch (error) {
      throw error;
    }
  }

  static async findBlacklistedToken(token) {
    try {
      const blacklistedToken = await BlacklistedToken.findOne({
        where: {
          token,
        },
      });
      return blacklistedToken;
    } catch (error) {
      throw error;
    }
  }

  static async updateUser(body, param) {
    try {
      const users = await User.update(body, {
        where: param,
        returning: true,
      });
      return users;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
