const routes = require('express').Router()

const SessionController = require('../src/controllers/SessionController');
const ElectionController = require('../src/controllers/ElectionController');

routes.post("/auth", SessionController.store);

routes.get("/election", ElectionController.create);

module.exports = routes;