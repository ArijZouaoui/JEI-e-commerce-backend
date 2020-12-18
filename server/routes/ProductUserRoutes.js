const express = require("express");
const router = express.Router();
module.exports = router;
const productUserCntrl = require("../controllers/productUserController");
/*this file contains all the application-users- routes*/
router.post("/post", productUserCntrl.postOne);
router.get("/get", productUserCntrl.get);
router.delete("/delete" , productUserCntrl.delete);
router.delete("/delete/:id" , productUserCntrl.deleteOne);


