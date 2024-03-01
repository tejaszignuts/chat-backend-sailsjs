const { constants } = require("../../config/constants");
const jwt = constants.jwt;

const jwtVerify = (id) => {
  let key = "Secret";
  return jwt.verify(id, key);
};

module.exports = async function (req, res, next) {
  const { token } = req.headers;
  if (!token) {
    return res.send("You must be registered first");
  }

  const authUser = jwtVerify(token);

  if (!authUser.id) {
    return res.send("Invalid token please register with another account");
  }
  // User is logged in, proceed to the next policy or controller action
  return next();
};
