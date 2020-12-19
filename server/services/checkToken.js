const jwt = require("jsonwebtoken");
const { logOut } = require("../controllers/userController");
exports.checkToken = (req, res, next) => {
  if (req.cookies.jid === "")
    return res.status(401).json({ err: new Error("Must have JWT.") });

  try {
    payload = jwt.verify(req.cookie.jid, "3f5eKxTGOAgf6AbUiP4qB");
  } catch (err) {
    if ((err.name = "TokenExpiredError")) {
      logOut(req, res);
    }
    return res.status(500).json({
      error: err,
    });
  }
  if (!payload) {
    return res.status(401).json({
      error: new Error("invalid User"),
    });
  }
  next();
};
