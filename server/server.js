//all the logic below : Mohamed Achich

const http = require("http");
const app = require("./express");
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

app.set("port", PORT);
server.listen(PORT);
console.log("server started");
