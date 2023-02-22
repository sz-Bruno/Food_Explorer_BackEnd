const {Router}= require('express')

const PrincipalController= require('.././Controllers/PrincipalController')
const PrincipalAvatarController= require('../Controllers/PrincipalAvatarController')
const principalController= new PrincipalController()
const principalAvatarController= new PrincipalAvatarController()
const AuthMiddleware= require('../Middlewares/AuthConfirm')

const multer= require('multer')
const UploadConfig= require('../Configs/upload')
const upload= multer(UploadConfig.MULTER)

const PrincipalRoutes= Router()
PrincipalRoutes.get("/", principalController.show)
PrincipalRoutes.post("/", principalController.create)
PrincipalRoutes.put("/",AuthMiddleware,principalController.update)
PrincipalRoutes.patch("/avatar",AuthMiddleware,upload.single('avatar'),principalAvatarController.update)

module.exports= PrincipalRoutes