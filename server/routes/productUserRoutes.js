const express = require("express");
const router = express.Router();
module.exports = router;
const productUserCntrl = require("../controllers/productUserController");
/*this file contains all the application-users- routes*/
router.post("/post", productUserCntrl.postOne);
router.get("/get/:UserId", productUserCntrl.get);
router.delete("/delete/:UserId" , productUserCntrl.delete);
router.delete("/deleteOne/:productId/:userId" , productUserCntrl.deleteOne);


