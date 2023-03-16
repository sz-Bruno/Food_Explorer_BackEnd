const {Router}= require('express')
const DessertRoutes= Router()
const DessertController= require('.././Controllers/DessertController')
const DessertAvatarController= require('.././Controllers/DessertAvatarController')
const dessertAvatarController= new DessertAvatarController()
const dessertController= new DessertController()
const UploadConfig= require('.././Configs/upload')
const multer= require('multer')
const upload= multer(UploadConfig.MULTER)

DessertRoutes.post('/',dessertController.create)
DessertRoutes.put('/:id',dessertController.update)
DessertRoutes.delete('/:id',dessertController.delete)
DessertRoutes.get('/',dessertController.show)
DessertRoutes.patch('/:id',upload.single('avatar'),dessertAvatarController.update)

module.exports=DessertRoutes