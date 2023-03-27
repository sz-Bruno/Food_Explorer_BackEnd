const {Router}= require('express')
const routes= Router()

const SessionsRoutes= require('./sessions.routes')
const UsersRoutes= require('./users.routes')
const DishRoutes= require('./dishes.routes')


routes.use("/users",UsersRoutes)
routes.use("/sessions",SessionsRoutes)
routes.use("/dishes", DishRoutes)

module.exports= routes