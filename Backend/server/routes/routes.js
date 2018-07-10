const disksRoute     = require("./disksRoute");
const collectionRoutes   = require("./collectionsRoute");

function getRoutes(server) {
    server.use('/disks', disksRoute);
    server.use('/collections', collectionRoutes);
}

module.exports = { getRoutes } 