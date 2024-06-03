const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
  let token = req.headers["authorization"];
  console.log(token)

  if (token) {
    // eslint-disable-next-line no-undef
    jwt.verify(token, process.env.SECRET_KEY, (err,decoded) => {
      if (err) {
        res.status(401).json({
          message: "Token is Invalid, Unauthorised User",
        });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({
      message: "Token not available, Unauthorised User",
    });
  }
};
module.exports = verifyUser;
