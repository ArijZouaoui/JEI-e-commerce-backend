const express = require("express");
const router = express.Router();
module.exports = router;
const userCntrl = require("../controllers/userController");
/*this file contains all the application-users- routes*/
router.post("/login", userCntrl.login);
router.post("/logOut", userCntrl.logOut);
router.post("/signUp", userCntrl.signUp);
router.post("/refreshToken", userCntrl.refreshToken);
