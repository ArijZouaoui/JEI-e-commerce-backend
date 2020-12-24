
const User =require("../../models/User");
const ProductUser =require("../../models/ProductUser");

ProductUser.belongsTo(User , {
    foreignKey: "UserId",

});

exports.get = (req,res) => {

    const  id  = req.params.UserId;
    ProductUser.findAll({where:{UserId:id}})
        .then((products) => {
            console.log('this is the cart' + products)
            res.send(products);
        })
        .catch((err) => {
            console.log(">> Error : ", err);
        });
};

exports.postOne = (req, res) => {
    res.send(req.body)
};


exports.getOne = (req, res) => {};
exports.post = (req, res) => {};

exports.delete = (req, res) => {
    const { UserId} = req.params;
    return ProductUser.destroy({where:{UserId: UserId}})
        .then(() => {
            console.log('cart cleared')
            res.send(status);
        })
        .catch((error) => {
            console.error(">> Error : ", error);
        });

}
exports.deleteOne =  (req, res) => {

    const productId=req.params.productId;
    const userId=req.params.userId;
      ProductUser.destroy({where:{id:productId ,UserId:userId}})
          .then(() => {
              console.log('product removed')
              res.send(status);
          })
          .catch((error) => {
              console.error(">> Error : ", error);
          });

    }