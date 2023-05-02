const {Router}= require('express')
const UsersRoutes= Router()
const UsersController= require('.././Controllers/UsersController')
const usersController= new UsersController()
const AuthMiddleware= require('../Middlewares/AuthConfirm')
const AdminMiddleware= require('../Middlewares/AuthAdmin')
UsersRoutes.post('/',AdminMiddleware,usersController.create)
UsersRoutes.put('/',AuthMiddleware,usersController.update)







module.exports=UsersRoutes