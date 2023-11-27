/* eslint-disable no-unused-vars */
import DB from "../";

export const associate = () => {
//   DB.Task.hasMany(DB.User, {
//     as: "Asignees",
//     onDelete: "CASCADE",
//   });

  DB.Task.hasMany(DB.Assigniees, {
    as: "allAsignees",
    onDelete: "CASCADE",
  });

  DB.User.belongsTo(DB.Task, {
    as: "tasks",
    foreignKey: "assignees_id",
  });
};
