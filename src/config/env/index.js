/* eslint-disable @typescript-eslint/no-var-requires */
const local = require("./local");

const env = process.env.BUILD_ENV;

const envObj = {
  local: { ...local },
};

/**
 * @type {typeof prod}
 **/
module.exports = envObj[env || "local"];
