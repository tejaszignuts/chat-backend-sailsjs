const { constants } = require("../../config/constants");
const jwt = constants.jwt;

const jwtVerify = (id) => {
  let key = "Secret";
  return jwt.verify(id, key);
};

module.exports = async function (req, res, next) {
  const { token } = req.headers;
  if (!token) {
    return res.send("Invalid url");
  }

  const authUser = jwtVerify(token);

  if (!authUser.id) {
    return res.send("Invalid token please register with another account");
  }

  //find user in database after the check the token
  const user = await User.findOne(authUser.id);
  if (!user) {
    return res.send("Invalid Account Please register first");
  }
  // User is logged in, proceed to the next policy or controller action
  return next();
};
