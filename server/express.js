const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const commandeRoutes = require("./routes/commandeRoutes");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
//to access req body
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
//connetion to database
require("../database/connection"); /*security breach */

app.use("/api/products", productRoutes);
app.use("/api/commandes", commandeRoutes);
app.use("/auth/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/carts", cartRoutes);
module.exports = app;
