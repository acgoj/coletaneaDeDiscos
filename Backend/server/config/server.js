const express = require('express');
const bodyParser = require('body-parser');
const routes = require('../routes/routes')
const server = express();
const allowCors = require('./cors')
const config = require('../config/config.json')

server.use(bodyParser.json());
server.use((err, req, res, next) => {
    res.status(err.status).json(err);
});
server.use(allowCors)

routes.getRoutes(server)

const port = process.env.PORT || config.port;

server.listen(port, function() {
    console.log('DiskCollections started on port ' + port);
});
