module.exports = {
  getToken: (req) => {
    return req.headers.authorization.replace("Bearer ", "");
  },
  isLogin: (req, res, next) => {
    require("dotenv").config();
    const jwt = require("jsonwebtoken");

    if (req.headers.authorization != null) {
      const token = req.headers.authorization.replace("Bearer ", "");
      const secret = process.env.secret;

        try {
          const verify = jwt.verify(token, secret);
          if (verify) {
            return next();
          }
        } catch (err) {
        }
      } else {
        return res.status(401).json({ error: "Authorization failed" });
      }
  },
};
