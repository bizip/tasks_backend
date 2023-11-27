/* eslint-disable no-unused-vars */
import DB from "../";

export const associate = () => {
  DB.Task.hasMany(DB.User, {
    as: "allAsignees",
    onDelete: "CASCADE",
    foreignKey: "id",
  });
};
