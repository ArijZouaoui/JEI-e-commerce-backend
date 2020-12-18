const User = require("../../models/User");
const { v4: uuidv4 } = require("uuid");
const { Error } = require("sequelize");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ProductUser = require("../../models/ProductUser");
User.hasMany(ProductUser, { as: "ProductUser" });
exports.signUp = (req, res) => {
  console.log(req.body);
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
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
          console.log(user);
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
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res.status(401).json({
          error: new Error("user not found !"),
        });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            res.status(401).json({
              error: new Error(" password and email address do not match !"),
            });
          }
          const token = jwt.sign(
            { userId: user._id },
            "3f5eKxTGOAgf6AbUiP4qB",
            { expiresIn: "24h" }
          );
          res.status(200).json({
            userId: user._id,
            token: token,
          });
        })
        .catch((error) => {
          res.status(500).json({
            error: error,
          });
          console.log(error);
        });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
      console.log(error);
    });
};
