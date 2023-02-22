const {Router}= require('express')
const routes= Router()
const PrincipalRoutes= require('./principal.routes')
const SessionsRoutes= require('./sessions.routes')

routes.use("/principals",PrincipalRoutes)
routes.use('/sessions',SessionsRoutes)

module.exports= routes