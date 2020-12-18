const User =require("../../models/User");
const ProductUser =require("../../models/ProductUser");

ProductUser.belongsTo(User , {
    foreignKey: "UserId",

});

exports.get = (req,res) => {
     ProductUser.findAll({where:req.params.id})
        .then((products) => {
            res.send(products);
        })
        .catch((err) => {
            console.log(">> Error : ", err);
        });
};

exports.postOne = (req, product) => {
    return ProductUser.findone({where: {id:req.body.product.id ,UserId:req.body.id} })
        .then(function (foundProduct){if(foundProduct) return ProductUser
            .update(ProductUser.quantity++)})

    return ProductUser.create({
        name: req.body.product.name,
        category: req.body.product.category,
        description: req.body.product.description,
        price: req.body.product.price,
        image: req.body.product.image,
        CartId: req.body.product.id,
    })
        .then((product) => {
            console.log(">> added product: " + JSON.stringify(product, null, 4));
            return product;
        })
        .catch((err) => {
            console.log(">> Error while adding product: ", err);
        });
};


exports.getOne = (req, res) => {};
exports.post = (req, res) => {};

exports.delete = (req, res) => {

    return ProductUser.findOne({
        where: {
            UserId: req.body.UserId
        }
    }).then(products => {
        if (!products) {
            return res.status(400).send({
                message: 'product not found',
            });

        }
        return products
            .destroy()
            .then(() => res.status(204).send())
            .catch((error) => res.status(400).send(error));
    })
        .catch((error) => res.status(400).send(error));
}
exports.deleteOne = (req, res) => {

    return ProductUser.findOne({
        where: {
            id: req.body.id,
            UserId: req.body.UserId
        }
    }).then(products => {
        if (!products) {
            return res.status(400).send({
                message: 'product not found',
            });

        }
        return products
            .destroy()
            .then(() => res.status(204).send())
            .catch((error) => res.status(400).send(error));
    })
        .catch((error) => res.status(400).send(error));


    }