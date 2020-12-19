const jwt = require("jsonwebtoken");
exports.createAccessToken = (user) => {
  return jwt.sign({ userId: user.id }, "3f5eKxTGOAgf6AbUiP4qB", {
    expiresIn: "15m",
  });
};

exports.createRefreshToken = (user) => {
  return jwt.sign(
    { userId: user.id, userName: user.userName },
    "bjqvbvvbjlkqfvuijkrfqv",
    {
      expiresIn: "15m",
    }
  );
};

exports.sendRefreshToken = (res, token) => {
  res.cookie("jid", token, {
    httpOnly: true,
    path: "/",
  });
};
