
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
 return ProductUser.findOne({where:{ id:req.body.id ,UserId:req.body.UserId}})
.then((productFound) => {  if(productFound){
    return ProductUser.update({ quantity: sequelize.literal('quantity + 1') }, { where: { id:req.body.id, UserId:req.body.UserId } })
        .then((productUpdated) =>{
            console.log("product updated");
            res.send(productUpdated);
        })}
        else {   return ProductUser.create({
    id: req.body.id,
    name: req.body.name,
    description : req.body.description,
    category : req.body.description,
    image : req.body.image,
    UserId:req.body.UserId,
    price :req.body.price,
    quantity:1,})
    .then((productAded) => {
    console.log("product added to cart ");
        res.send(productAded);})

}
    })
        .catch((err) => {
            console.log(">> Error : ", err);
        });



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