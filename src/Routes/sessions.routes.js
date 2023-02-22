const {Router}= require('express')
const SessionsRoutes= Router()
const SessionsController= require('.././Controllers/SessionsController')
const sessionsController= new SessionsController()


SessionsRoutes.post('/',sessionsController.create)

module.exports= SessionsRoutes