const sequelize = require("../database/connection");

exports.get = (req, res) => {
    sequelize.query('SELECT * FROM `Commandes` WHERE 1').then((tableCommandes) => {
        res.send(tableCommandes);
        console.log(typeof(tableCommandes[0]))
    })
    .catch((err) => {
        console.log('get commandes ERROR',err);
    })
};
exports.post = (req, res) => {
  /*  return Commande.create({
        id:request.body.id,
        orderDate:request.body.orderDate,
        deliveryDate:request.body.deliveryDate,
        cartId:1,createdAt:request.body.cartId,
        updatedAt:request.body.updatedAt
    }).then(function (Commande) {
        if (Commande) {
            response.send(Commande);
        } else {
            response.status(400).send('Error in insert new commande');
        }
    });*/
};
exports.postOne = (req, res) => {};
exports.getOne = (req, res) => {};
