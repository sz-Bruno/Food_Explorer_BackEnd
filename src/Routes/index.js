const {Router}= require('express')
const routes= Router()
const PrincipalRoutes= require('./principal.routes')
const DrinksRoutes= require('./drinks.routes')
const DessertRoutes= require('./dessert.routes')
const SessionsRoutes= require('./sessions.routes')

routes.use("/principals",PrincipalRoutes)
routes.use("/sessions",SessionsRoutes)
routes.use("/drinks",DrinksRoutes)
routes.use("/desserts",DessertRoutes)
module.exports= routes