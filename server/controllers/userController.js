const User = require("../../models/User");
const { v4: uuidv4 } = require("uuid");
const { Error } = require("sequelize");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verify } = require("jsonwebtoken");
const tokenHandler = require("../utils/tokenHandler");
const { sendRefreshToken } = require("../utils/tokenHandler");
const { createRefreshToken } = require("../utils/tokenHandler");
const { createAccessToken } = require("../utils/tokenHandler");
//all the user logic  : Mohamed Achich
exports.signUp = (req, res) => {
  //handle signup requests

  console.log(req.body);
  //search for a user with the same username or email  in the DB
  User.findOne({
    where: {
      [Op.or]: [{ userName: req.body.userName }, { email: req.body.email }],
    },
  })
    .then((user) => {
      if (!user) {
        //  cryptage du mdp avant le stockage dans la DB
        bcrypt.hash(req.body.password, 10).then((hashedPassword) => {
          const user = User.build({
            id: uuidv4(),
            userName: req.body.userName,
            address: req.body.address,
            email: req.body.email,
            password: hashedPassword,
            admin: 0,
            phoneNumber: req.body.phoneNumber,
          });
          user
            .save()
            .then(() => {
              res.status(201).json({
                message: "User added successfully!",
              });
            })
            .catch((error) => {
              console.log(error);
              res.status(500).json({
                error: error,
              });
            });
        });
      } else {
        /*error a user with this email already exists*/
        res.status(409).json({
          error: new Error("user already exists !"),
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
      console.log(error);
    });
};

exports.login = (req, res) => {
  //handle login requests
  User.findOne({ where: { userName: req.body.userName } })
    .then((user) => {
      if (!user) {
        console.log(user);
        return res.status(401).json({
          error: new Error("user not found !"),
        });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              error: new Error(" password and email address do not match !"),
            });
          }

          sendRefreshToken(res, createRefreshToken(user));
          const AccessToken = tokenHandler.createAccessToken(user);
          return res.status(200).json({
            userName: user.userName,
            admin: user.admin,
            userId: user.id,
            accessToken: AccessToken,
          });
        })
        .catch((error) => {
          console.log(error);

          return res.status(500).json({
            error: error,
          });
        });
    })
    .catch((error) => {
      console.log(error);

      return res.status(500).json({
        error: error,
      });
    });
};

exports.logOut = (req, res) => {
  sendRefreshToken(res, "");
  return res.status(200).json({
    message: "user logedOut successfully",
  });
};

exports.refreshToken = (req, res) => {
  //to check if the user  already signed up when he opens the app or refreshes if true then he automatically logedIn
  const refreshT = req.cookies.jid;
  console.log(req.cookies);
  if (!refreshT) {
    return res.status(401).json({ error: new Error("user not loged in !") });
  } else {
    let payload = null;
    try {
      payload = jwt.verify(refreshT, "bjqvbvvbjlkqfvuijkrfqv");
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        jwt.sign();
      }
      return res.status(500).json({
        message: payload,
        error: err,
      });
    }
    // token is valid and
    // we can send back an access token
    console.log(payload);
    User.findOne({ where: { userName: payload.userName } })
      .then((user) => {
        if (!user) {
          return res.status(401).json({ error: new Error("user not found !") });
        }
        if (user.tokenVersion !== payload.tokenVersion) {
          return res
            .status(401)
            .json({ error: new Error("user not authorized TV do not !") });
        }
        sendRefreshToken(res, createRefreshToken(user));
        res.status(200).json({
          accessToken: createAccessToken(user),
          userId: user.id,
          userName: user.userName,
          admin: user.admin,
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
};
