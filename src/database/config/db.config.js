const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  development: {
    use_env_variable: process.env.DEV_DATABASE_URL,
  },
  test: {
    use_env_variable: process.env.TEST_DATABASE_URL,
    // dialect: "postgres",
    dialectOptions: {
      ssl: process.env.NODE_ENV === "production", // set this value based on your environment
    },
  },
  production: {
    use_env_variable: process.env.DEV_DATABASE_URL,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
