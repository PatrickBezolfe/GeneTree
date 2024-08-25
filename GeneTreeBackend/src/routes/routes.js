const express = require('express')
const routes = express.Router()

const PersonController = require('../controllers/PersonController')

routes.get('/persons', PersonController.readPerson)
routes.post('/persons', PersonController.createPerson)
routes.put('/persons/:id', PersonController.updatePerson)
routes.delete('/persons/:id', PersonController.deletePerson)

module.exports = routes