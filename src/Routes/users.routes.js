const {Router}= require('express')
const UsersRoutes= Router()
const UsersController= require('.././Controllers/UsersController')
const usersController= new UsersController()
const AuthMiddleware= require('../Middlewares/AuthConfirm')

UsersRoutes.post('/',usersController.create)
UsersRoutes.put('/',AuthMiddleware,usersController.update)







module.exports=UsersRoutes